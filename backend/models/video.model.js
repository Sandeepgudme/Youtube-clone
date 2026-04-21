import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "All",
    },

    views: {
      type: Number,
      default: 0,
    },

    channel: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);