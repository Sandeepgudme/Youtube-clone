import Video from "../models/video.model.js";

export const getVideos = async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
};