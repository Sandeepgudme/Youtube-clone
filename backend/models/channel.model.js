import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: String,
  handle: String, // ✅ username
  userId: String, // ✅ link to user
});

export default mongoose.model("Channel", channelSchema);