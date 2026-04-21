





# 📺 YouTube Clone (MERN Stack)

## 🚀 Overview

This project is a **YouTube-like video platform** built using the **MERN stack (MongoDB, Express, React, Node.js)**.
It replicates core YouTube features such as channel creation, video uploads, viewing, and interaction, with a clean UI and full CRUD functionality.

---

## 🎯 Purpose

The goal of this project is to:

* Practice full-stack development using MERN
* Understand REST APIs and CRUD operations
* Implement user-based ownership (channel → videos)
* Build a real-world scalable project for portfolio

---

## 🧱 Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB (MongoDB Atlas)

---

## 📂 Project Structure

```
youtube-clone/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── video.model.js
│   │   ├── channel.model.js
│   │   └── comment.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── video.routes.js
│   │   ├── channel.routes.js
│   │   └── comment.routes.js
│   ├── controllers/
│   └── server.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/youtube-clone.git
cd youtube-clone
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## 🔑 Features

### 👤 Authentication

* User signup/login
* User stored in localStorage

---

### 📺 Channel System

* Create a channel (name + handle)
* Channel linked to user
* Channel page displays:

  * Banner
  * Profile
  * Videos

---

### 🎬 Video System

* Upload videos using:

  * Title
  * Video URL (YouTube link)
  * Thumbnail URL
  * Description
* Videos stored in MongoDB
* Each video linked to a channel

---

### ✏️ Edit & Delete (Owner Only)

* Edit:

  * Title
  * Description
* Delete:

  * Removes video permanently from database

---

### 💬 Comments

* Add comments on videos
* Fetch comments per video
* Display username + text

---

### 🎨 UI Features

* Dark theme (YouTube-style)
* Sidebar navigation
* Channel layout similar to YouTube
* Video cards with thumbnails

---

## 🔌 API Endpoints

### Auth

```
POST /api/auth/signup
POST /api/auth/login
```

### Channels

```
POST /api/channels
```

### Videos

```
GET    /api/videos
POST   /api/videos
PUT    /api/videos/:id
DELETE /api/videos/:id?channel=channelName
```

### Comments

```
GET  /api/comments/:videoId
POST /api/comments
```

---

## 🗄️ Database Schemas

### Channel

```js
{
  name: String,
  handle: String,
  userId: String
}
```

### Video

```js
{
  title: String,
  videoUrl: String,
  thumbnailUrl: String,
  description: String,
  views: Number,
  channel: String
}
```

### Comment

```js
{
  text: String,
  user: String,
  videoId: String
}
```

---

## ▶️ Usage Flow

1. Signup/Login
2. Create Channel
3. Upload Video
4. View Channel
5. Edit/Delete your videos
6. Watch videos
7. Add comments

---

## ❗ Known Limitations

* No real video file upload (only URL-based)
* No authentication middleware (basic user handling)
* No likes/subscriptions backend logic yet

---

## 🔮 Future Improvements

* Real video upload (Multer + Cloudinary)
* Like/Dislike system
* Subscribe system
* Search functionality
* Video recommendations
* JWT authentication
* Profile picture upload

---

## 📌 Conclusion

This project demonstrates a complete **full-stack application** with:

* Frontend UI
* Backend API
* Database integration
* CRUD operations
* User-based permissions

It is a strong portfolio project for showcasing MERN stack skills.

---
