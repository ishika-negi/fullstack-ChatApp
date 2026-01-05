import express from "express";
import dotenv from "dotenv"
dotenv.config({ path: './.env' });
console.log("NODE_ENV:", process.env.NODE_ENV);
import cookieParser from "cookie-parser"
import cors from "cors"

import path from "path";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import { app, server } from "./lib/socket.js";


dotenv.config()

app.use(cors(
    {origin: "http://localhost:5173",
        credentials: true
    }
    
))

app.use(express.json({ limit: "10mb" }));// extract json data out of body
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

if(process.env.NODE_ENV==="produciton"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"))
    })
}

const PORT = process.env.PORT
const __dirname = path.resolve();

server.listen(PORT, ()=> {
    console.log("server is running on PORT:"+ PORT);
    connectDB()

})