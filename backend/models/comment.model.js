import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: String,
  user: String,
  videoId: String,
});

export default mongoose.model("Comment", commentSchema);