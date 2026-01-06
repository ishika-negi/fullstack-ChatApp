import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// Load env variables
dotenv.config({ path: './.env' });

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: "*", credentials: true })); // adjust origin if needed
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Simple backend test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("./frontend/dist")));

    // SPA fallback
    app.use((req, res) => {
        res.sendFile(path.resolve("./frontend/dist/index.html"));
    });
}

// PORT
const PORT = process.env.PORT || 5001;

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    connectDB();
});
