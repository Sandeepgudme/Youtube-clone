import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import CommentSection from "../components/CommentSection";

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 LIKE STATE
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get("/videos");
        setVideos(res.data);

        const current = res.data.find((v) => v._id === id);
        setVideo(current);
      } catch (err) {
        console.error("Error loading video:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id]);

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (!video) return <p className="text-white p-4">Video not found</p>;

  // 🔥 Detect YouTube link
  const isYouTube =
    video.videoUrl?.includes("youtube.com") ||
    video.videoUrl?.includes("youtu.be");

  let videoId = "";
  if (isYouTube) {
    if (video.videoUrl.includes("v=")) {
      videoId = video.videoUrl.split("v=")[1]?.split("&")[0];
    } else if (video.videoUrl.includes("youtu.be")) {
      videoId = video.videoUrl.split("youtu.be/")[1];
    }
  }

  // 🔥 LIKE / DISLIKE HANDLERS
  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 text-white gap-6">

      {/* LEFT SIDE */}
      <div className="flex-1">

        {/* VIDEO */}
        {isYouTube ? (
          <iframe
            className="w-full h-[500px] rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            key={video.videoUrl}
            controls
            autoPlay
            className="w-full rounded-lg bg-black"
          >
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* TITLE */}
        <h2 className="mt-3 text-xl font-semibold">
          {video.title}
        </h2>

        {/* CHANNEL + ACTIONS */}
        <div className="flex justify-between items-center mt-3">

          {/* CHANNEL */}
          <div
            onClick={() => navigate("/channel")}
            className="cursor-pointer"
          >
            <p className="text-gray-300 font-medium">
              {video.channel || video.username}
            </p>
            <p className="text-gray-500 text-sm">
              {video.views} views
            </p>
          </div>

          {/* LIKE / DISLIKE */}
          <div className="flex gap-4 text-lg">

            <button
              onClick={handleLike}
              className={`px-3 py-1 rounded ${
                liked ? "bg-white text-black" : "bg-gray-800"
              }`}
            >
              👍
            </button>

            <button
              onClick={handleDislike}
              className={`px-3 py-1 rounded ${
                disliked ? "bg-white text-black" : "bg-gray-800"
              }`}
            >
              👎
            </button>

          </div>
        </div>

        {/* COMMENTS */}
        <div className="mt-6">
          <CommentSection videoId={video._id} />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[350px] space-y-4">
        {videos
          .filter((v) => v._id !== id)
          .slice(0, 10)
          .map((v) => (
            <div
              key={v._id}
              onClick={() => navigate(`/video/${v._id}`)}
              className="flex gap-2 cursor-pointer hover:bg-gray-900 p-2 rounded"
            >
              <img
                src={v.thumbnailUrl}
                className="w-40 h-24 object-cover rounded"
              />
              <div className="text-sm">
                <p className="line-clamp-2">{v.title}</p>
                <p className="text-gray-400 text-xs">{v.channel}</p>
                <p className="text-gray-500 text-xs">
                  {v.views} views
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoPlayer;