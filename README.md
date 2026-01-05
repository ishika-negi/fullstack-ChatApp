# Chat App

A **full-stack chat application** with **real-time messaging**, **image sharing**, and **online user tracking**, built with **React, Node.js, and MongoDB**.

---

## 📝 Features

- **User Authentication**  
  - Signup and Login with **JWT authentication**  
  - Passwords securely hashed  

- **Real-Time Messaging**  
  - Instant chat between users using **Socket.IO**  
  - Supports **text messages** and **image attachments**  

- **Online User Tracking**  
  - See which users are online in real-time  
  - Uses `userId → socketId` mapping  

- **Frontend Features**  
  - Built with **React** and **Zustand** for global state management  
  - **Skeleton UI** while messages are loading  
  - Clean **error handling** with pop-up alerts/toasts  

- **Backend Features**  
  - **Node.js + Express** API  
  - MongoDB database for storing users and messages  
  - **Cloudinary** integration for image uploads  
  - Secure routes protected with **ProtectRoute middleware**  

- **Planned Enhancements**  
  - Delete messages (for self / everyone)  
  - Chat header shows user info  
  - Typing indicators and read receipts  

---

## 🛠 Tech Stack

| Layer       | Technology                |
|------------|---------------------------|
| Frontend   | React, Zustand, Tailwind CSS |
| Backend    | Node.js, Express           |
| Database   | MongoDB                   |
| Realtime   | Socket.IO                 |
| Storage    | Cloudinary                |
| Authentication | JWT (JSON Web Tokens)  |

---

## 💻 Installation

1. **Clone the repository**

```bash
git clone https://github.com/YourUsername/chat-app.git
cd chat-app
