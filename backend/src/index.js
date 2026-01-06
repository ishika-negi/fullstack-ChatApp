import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // change later if needed
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Health check
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

/* ============================
   SERVE FRONTEND (PRODUCTION)
   ============================ */
if (process.env.NODE_ENV === "production") {
  // IMPORTANT: backend -> ../frontend/dist
  const FRONTEND_DIST = path.resolve(process.cwd(), "..", "frontend", "dist");

  console.log("Serving frontend from:", FRONTEND_DIST);

  app.use(express.static(FRONTEND_DIST));

  // SPA fallback (Express 5 safe)
  app.use((req, res) => {
    res.sendFile(path.join(FRONTEND_DIST, "index.html"));
  });
}

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});
