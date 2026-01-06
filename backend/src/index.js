import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// Load env variables
dotenv.config();

// PORT
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend dev URL
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// ================= PRODUCTION FRONTEND =================
if (process.env.NODE_ENV === "production") {
  // VERY IMPORTANT PART 👇
  // backend/src -> backend -> root
  const ROOT_DIR = path.resolve(process.cwd(), "..");
  const FRONTEND_DIST = path.join(ROOT_DIR, "frontend", "dist");

  app.use(express.static(FRONTEND_DIST));

  // SPA fallback
  app.use((req, res) => {
    res.sendFile(path.join(FRONTEND_DIST, "index.html"));
  });
}

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});
