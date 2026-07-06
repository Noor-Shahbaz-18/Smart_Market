# Smart Community Service & Local Marketplace Platform

A production-ready full-stack MERN application for community-based service and product marketplace.

## 🚀 Features

- ✅ Secure Authentication (JWT)
- ✅ Role-Based Access Control (User / Admin)
- ✅ Product Marketplace with image upload
- ✅ Service Marketplace with portfolio
- ✅ Booking System with status management
- ✅ Real-Time Chat (Socket.io)
- ✅ Reviews & Ratings
- ✅ Smart Search & Filters
- ✅ Notification System
- ✅ User Dashboard
- ✅ Admin Panel
- ✅ Responsive Design

## 🛠️ Tech Stack

**Frontend:** React.js, React Router, Axios, Socket.io-client, React Hot Toast

**Backend:** Node.js, Express.js, Socket.io, Nodemailer

**Database:** MongoDB, Mongoose

**Storage:** Cloudinary

**Auth:** JWT, Bcryptjs

## 📁 Project Structure
## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smart-marketplace.git
cd smart-marketplace
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

```bash
npm run dev
```

### 4. Open in Browser

## 🗄️ Database Schema

### User