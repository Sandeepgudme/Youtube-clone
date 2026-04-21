import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";
import channelRoutes from "./routes/channel.routes.js";
import commentRoutes from "./routes/comment.routes.js";

dotenv.config(); // ✅ MUST BE BEFORE connectDB()

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/comments", commentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});