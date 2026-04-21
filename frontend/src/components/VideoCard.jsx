import React from "react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/video/${video._id}`)}
      className="cursor-pointer"
    >
      {/* THUMBNAIL */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-44 object-cover rounded-lg"
      />

      {/* DETAILS */}
      <div className="mt-2">
        {/* TITLE */}
        <h3 className="text-sm font-semibold line-clamp-2">
          {video.title}
        </h3>

        {/* CHANNEL NAME */}
        <p className="text-gray-400 text-sm mt-1">
          {video.channel || video.username}
        </p>

        {/* VIEWS */}
        <p className="text-gray-500 text-xs">
          {video.views} views
        </p>
      </div>
    </div>
  );
};

export default VideoCard;