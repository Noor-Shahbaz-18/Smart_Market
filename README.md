# 🛒 Smart Community Service & Local Marketplace Platform

A production-ready full-stack web application built with the MERN stack that enables users to offer services, list products, manage bookings, and interact through real-time communication.

---

## 👩‍💻 Developer

**Noor Fatima**  
BS Software Engineering — UET Lahore (2024–2028)  
GitHub: [github.com/Noor-Shahbaz-18](https://github.com/Noor-Shahbaz-18)  
Internship: TEYZIX CORE — FSWD-3 Task

---

## 🚀 Live Demo

- **Frontend:** [your-app.vercel.app](#)
- **Backend:** [your-api.render.com](#)

---

## 📌 Project Overview

SmartMarket is a community-driven marketplace platform where users can:
- Buy and sell products
- Offer and hire professional services
- Book services with preferred date and time
- Chat in real-time with buyers and sellers
- Leave reviews and ratings
- Get instant notifications

---

## ✨ Features

### 🔐 Authentication & Security
- User Registration & Login
- JWT-based Authentication
- Password Hashing with Bcryptjs
- Forgot Password via Email
- Protected Routes
- Role-Based Access Control (User / Admin)

### 👤 User Profile
- Profile Picture Upload
- Bio, Skills, Location, Contact Info
- Ratings & Reviews
- Active Listings Display

### 📦 Product Marketplace
- Create, Edit, Delete Product Listings
- Multiple Image Upload via Cloudinary
- Search by Keyword
- Filter by Category, Price, Condition
- Save to Favorites

### 🛠️ Service Marketplace
- Offer Professional Services
- Portfolio Image Gallery
- Categories: Web Dev, Design, Photography, Tutoring, etc.
- Availability Toggle
- Tags & Delivery Time

### 📅 Booking System
- Request a Service
- Select Preferred Date & Time
- Accept / Reject / Cancel Bookings
- Track Booking Status
- Booking History

### 💬 Real-Time Chat
- Instant Messaging via Socket.io
- Typing Indicator
- Read Receipts
- Image Sharing in Chat
- Conversation List

### ⭐ Reviews & Ratings
- Star Rating System
- Written Reviews
- Rating Summary with Bar Chart
- Report Fake Reviews

### 🔍 Smart Search & Filtering
- Keyword Search
- Category Filter
- Price Range Filter
- Rating Filter
- Availability Filter
- Sort by Latest / Price / Rating

### 🔔 Notification System
- Booking Request Notifications
- Booking Status Updates
- New Message Alerts
- Review Notifications
- Listing Approval Alerts
- Real-time via Socket.io

### 📊 User Dashboard
- Active Listings Overview
- Booking History
- Favorite Items
- Quick Actions
- Stats Cards

### ⚙️ Admin Panel
- Manage Users (Suspend / Unsuspend)
- Approve or Reject Listings
- Platform Statistics
- Reported Content Management
- Activity Monitor

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router v6 |
| Styling | CSS Modules, Custom CSS Variables |
| State Management | React Context API |
| Real-Time | Socket.io Client |
| HTTP Client | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, Bcryptjs |
| File Storage | Cloudinary |
| Real-Time Server | Socket.io |
| Email | Nodemailer |
| Notifications | Toast (react-hot-toast) |

---

## 📁 Project Structure

```
smart-marketplace/
│
├── client/                     # React Frontend
│   ├── src/
│   │   ├── api/                # Axios API calls
│   │   ├── components/         # Reusable components
│   │   │   ├── common/         # Navbar, Footer, Button, Input...
│   │   │   ├── products/       # Product components
│   │   │   ├── services/       # Service components
│   │   │   ├── bookings/       # Booking components
│   │   │   ├── chat/           # Chat components
│   │   │   ├── reviews/        # Review components
│   │   │   ├── notifications/  # Notification components
│   │   │   ├── dashboard/      # Dashboard components
│   │   │   ├── profile/        # Profile components
│   │   │   └── admin/          # Admin components
│   │   ├── context/            # Auth, Socket, Notification, Theme
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── routes/             # App, Protected, Admin routes
│   │   ├── styles/             # Global CSS, Variables
│   │   └── utils/              # Helpers, formatters, validators
│   └── .env
│
├── server/                     # Node.js Backend
│   ├── src/
│   │   ├── config/             # DB, Cloudinary, Socket, CORS
│   │   ├── controllers/        # Business logic
│   │   ├── middleware/         # Auth, Upload, Error handler
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API routes
│   │   ├── socket/             # Socket.io handlers
│   │   ├── utils/              # Token, Email, Pagination
│   │   └── validations/        # Input validation schemas
│   └── .env
│
├── docs/                       # Documentation
├── screenshots/                # App screenshots
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (Local or Atlas)
- Cloudinary Account
- Gmail Account (for email)

### 1. Clone Repository

```bash
git clone https://github.com/Noor-Shahbaz-18/smart-marketplace.git
cd smart-marketplace
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart-marketplace
JWT_SECRET=your_jwt_secret_key
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

### 3. Frontend Setup

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

### 4. Open Browser

```
Frontend → http://localhost:5173
Backend  → http://localhost:5000
```

---

## 🔑 API Endpoints

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/forgot-password
POST   /api/auth/reset-password/:token
```

### Products
```
GET    /api/products
GET    /api/products/:id
POST   /api/products          (Protected)
PUT    /api/products/:id      (Protected + Owner)
DELETE /api/products/:id      (Protected + Owner)
```

### Services
```
GET    /api/services
GET    /api/services/:id
POST   /api/services          (Protected)
PUT    /api/services/:id      (Protected + Owner)
DELETE /api/services/:id      (Protected + Owner)
```

### Bookings
```
POST   /api/bookings              (Protected)
GET    /api/bookings/my           (Protected)
GET    /api/bookings/:id          (Protected)
PATCH  /api/bookings/:id/status   (Protected)
```

### Chat
```
GET    /api/chat/conversations                     (Protected)
POST   /api/chat/conversations                     (Protected)
GET    /api/chat/conversations/:id/messages        (Protected)
POST   /api/chat/conversations/:id/messages        (Protected)
```

### Reviews
```
POST   /api/reviews                          (Protected)
GET    /api/reviews/:targetType/:targetId
DELETE /api/reviews/:id                      (Protected)
PATCH  /api/reviews/:id/report               (Protected)
```

### Notifications
```
GET    /api/notifications             (Protected)
PATCH  /api/notifications/read-all    (Protected)
PATCH  /api/notifications/:id/read    (Protected)
DELETE /api/notifications/:id         (Protected)
```

### Search
```
GET    /api/search?q=keyword&type=product|service|all
```

### Favorites
```
GET    /api/favorites              (Protected)
POST   /api/favorites              (Protected)
DELETE /api/favorites/:targetId    (Protected)
```

### Admin
```
GET    /api/admin/stats                           (Admin)
GET    /api/admin/users                           (Admin)
PATCH  /api/admin/users/:id/suspend               (Admin)
GET    /api/admin/listings/pending                (Admin)
PATCH  /api/admin/listings/:type/:id/approve      (Admin)
GET    /api/admin/reports                         (Admin)
PATCH  /api/admin/reports/:id                     (Admin)
```

---

## 🌐 Socket.io Events

### Client → Server
```
join                  Join personal room
join_conversation     Join chat room
leave_conversation    Leave chat room
send_message          Send message
typing_start          Start typing indicator
typing_stop           Stop typing indicator
mark_read             Mark messages as read
```

### Server → Client
```
receive_message           New message received
user_typing               Someone is typing
user_stopped_typing       Stopped typing
messages_read             Messages marked as read
notification              New notification received
```

---

## 🗄️ Database Models

| Model | Description |
|-------|-------------|
| User | Auth, profile, ratings |
| Product | Listings with images |
| Service | Service offerings |
| Category | Product/Service categories |
| Booking | Service bookings |
| Conversation | Chat threads |
| Message | Chat messages |
| Review | Ratings & reviews |
| Notification | In-app notifications |
| Favorite | Saved listings |
| Report | Reported content |

---

## 🚀 Deployment

### Frontend → Vercel
```bash
cd client
npm run build
```

### Backend → Render
```
1. Push to GitHub
2. New Web Service on Render
3. Connect repo
4. Add environment variables
5. Deploy
```

### Database → MongoDB Atlas
```
1. Create free cluster
2. Add IP whitelist (0.0.0.0/0)
3. Get connection string
4. Update MONGO_URI in .env
```

---

---

## 📄 License

MIT License — Free to use and modify.

---

## 🙏 Acknowledgements

- **TEYZIX CORE** — Internship opportunity
- **MongoDB Atlas** — Cloud database
- **Cloudinary** — Image management
- **Socket.io** — Real-time communication
- **React** — Frontend framework

---

> Built with ❤️ by Noor Fatima — TEYZIX CORE Internship June Batch 2026
