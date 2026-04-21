import Channel from "../models/channel.model.js";

export const createChannel = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body); 

    const { name, handle, userId } = req.body;

    if (!name || !handle || !userId) {
      return res.status(400).json("All fields required");
    }

    const newChannel = new Channel({
      name: name.trim(),
      handle: handle.trim(), 
      userId,
    });

    await newChannel.save();

    res.status(201).json(newChannel);
  } catch (err) {
    console.error("CHANNEL ERROR:", err);
    res.status(500).json(err);
  }
};