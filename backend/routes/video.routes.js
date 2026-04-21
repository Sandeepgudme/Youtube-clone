import express from "express";
import Video from "../models/video.model.js";
import { getVideos } from "../controllers/video.controller.js";

const router = express.Router();

// ✅ GET ALL VIDEOS
router.get("/", getVideos);

// ✅ CREATE VIDEO
router.post("/", async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ DELETE VIDEO (ONLY OWNER)
router.delete("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json("Video not found");
    }

    // ✅ OWNER CHECK
    if (video.channel !== req.query.channel) {
      return res.status(403).json("You can delete only your videos");
    }

    await Video.findByIdAndDelete(req.params.id);

    res.json("Video deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// ✅ UPDATE VIDEO (ONLY OWNER) 🔥 FIXED
router.put("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json("Video not found");
    }

    // ✅ OWNER CHECK (IMPORTANT FIX)
    if (video.channel !== req.query.channel) {
      return res.status(403).json("You can edit only your videos");
    }

    const updated = await Video.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

export default router;