import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const upload = async () => {
    if (!title || !videoUrl || !thumbnailUrl) {
      return alert("Please fill all required fields");
    }

    try {
      await API.post("/videos", {
        title,
        videoUrl,
        thumbnailUrl,
        description,
        channel: user.channel.name, // ✅ important
      });

      alert("Uploaded successfully!");

      navigate("/channel"); // ✅ go back to channel
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-6 text-white">

      <h2 className="text-xl mb-4">Upload Video</h2>

      {/* TITLE */}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block mb-3 p-2 bg-gray-800 w-full rounded"
      />

      {/* VIDEO URL */}
      <input
        placeholder="Video URL (link)"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="block mb-3 p-2 bg-gray-800 w-full rounded"
      />

      {/* THUMBNAIL URL */}
      <input
        placeholder="Thumbnail URL"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
        className="block mb-3 p-2 bg-gray-800 w-full rounded"
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block mb-3 p-2 bg-gray-800 w-full rounded"
      />

      {/* BUTTON */}
      <button
        onClick={upload}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
};

export default Upload;