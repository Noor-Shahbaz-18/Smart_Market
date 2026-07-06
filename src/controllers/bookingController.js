const Booking = require('../models/Booking');
const Notification = require('../models/Notification');
const { getIO } = require('../config/socket');

// @POST /api/bookings
const createBooking = async (req, res, next) => {
  try {
    const { service, provider, preferredDate, preferredTime, message, totalAmount } = req.body;

    const booking = await Booking.create({
      service, provider, preferredDate,
      preferredTime, message, totalAmount,
      client: req.user._id,
    });

    // Notify provider
    const notification = await Notification.create({
      recipient: provider,
      type: 'booking_request',
      message: `${req.user.name} sent you a booking request`,
      link: `/bookings/${booking._id}`,
    });

    getIO().to(provider.toString()).emit('notification', notification);

    await booking.populate(['service', 'client', 'provider']);
    res.status(201).json({ success: true, message: 'Booking request sent', booking });
  } catch (error) {
    next(error);
  }
};

// @GET /api/bookings/my
const getMyBookings = async (req, res, next) => {
  try {
    const { role = 'client', status } = req.query;
    const filter = role === 'client' ? { client: req.user._id } : { provider: req.user._id };
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .populate('service', 'title price')
      .populate('client', 'name avatar')
      .populate('provider', 'name avatar')
      .sort('-createdAt');

    res.json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

// @GET /api/bookings/:id
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('service', 'title price description')
      .populate('client', 'name avatar email phone')
      .populate('provider', 'name avatar email phone');

    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    const isParticipant =
      booking.client._id.toString() === req.user._id.toString() ||
      booking.provider._id.toString() === req.user._id.toString();

    if (!isParticipant && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

// @PATCH /api/bookings/:id/status
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    const isProvider = booking.provider.toString() === req.user._id.toString();
    const isClient = booking.client.toString() === req.user._id.toString();

    if (!isProvider && !isClient) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Only provider can accept/reject, only client can cancel
    if (['accepted', 'rejected'].includes(status) && !isProvider) {
      return res.status(403).json({ success: false, message: 'Only provider can accept or reject' });
    }

    if (status === 'cancelled' && !isClient) {
      return res.status(403).json({ success: false, message: 'Only client can cancel' });
    }

    booking.status = status;
    await booking.save();

    // Notify the other party
    const recipientId = isProvider ? booking.client : booking.provider;
    const notification = await Notification.create({
      recipient: recipientId,
      type: 'booking_update',
      message: `Your booking has been ${status}`,
      link: `/bookings/${booking._id}`,
    });

    getIO().to(recipientId.toString()).emit('notification', notification);

    res.json({ success: true, message: `Booking ${status}`, booking });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getMyBookings, getBooking, updateBookingStatus };