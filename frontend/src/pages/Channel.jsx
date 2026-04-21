import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Channel = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  if (!user) {
    return <p className="text-white p-4">Please login first</p>;
  }

  if (!user.channel) {
    return (
      <div className="text-white p-4">
        <h2>No channel found</h2>
        <p className="text-gray-400">Create a channel first</p>
      </div>
    );
  }

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get("/videos");

        const myVideos = res.data.filter(
          (v) => v.channel === user.channel.name
        );

        setVideos(myVideos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user.channel.name]);

  // EDIT CLICK
  const handleEditClick = (video) => {
    setEditingId(video._id);
    setEditTitle(video.title);
    setEditDesc(video.description || "");
  };

  // SAVE EDIT (DB)
  const handleSave = async (id) => {
    try {
      const res = await API.put(`/videos/${id}`, {
        title: editTitle,
        description: editDesc,
      });

      setVideos(
        videos.map((v) => (v._id === id ? res.data : v))
      );

      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // DELETE (DB)
  const handleDelete = async (id) => {
    try {
      await API.delete(
        `/videos/${id}?channel=${user.channel.name}`
      );

      setVideos(videos.filter((v) => v._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="text-white">

      {/* Banner */}
      <div className="h-40 bg-blue-500 flex items-center justify-center text-xl font-bold">
        {user.channel.name}
      </div>

      {/* Profile */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-2xl">
            {user.channel.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {user.channel.name}
            </h2>

            <p className="text-gray-400">
              @{user.channel.handle}
            </p>

            <button className="bg-white text-black px-4 py-1 rounded mt-2">
              Subscribe
            </button>
          </div>
        </div>

        {/* ✅ UPLOAD BUTTON */}
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
        >
          Upload Video
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="p-4 text-gray-400">Loading...</p>
      )}

      {/* No Videos */}
      {!loading && videos.length === 0 && (
        <p className="p-4 text-gray-400">
          No videos uploaded
        </p>
      )}

      {/* Videos */}
      {!loading && videos.length > 0 && (
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {videos.map((v) => (
            <div key={v._id} className="bg-gray-900 p-2 rounded">

              <img
                src={v.thumbnailUrl}
                className="w-full h-40 object-cover rounded"
              />

              {editingId === v._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full mt-2 p-1 bg-black border"
                  />

                  <input
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full mt-1 p-1 bg-black border"
                  />

                  <button
                    onClick={() => handleSave(v._id)}
                    className="bg-green-600 px-2 py-1 mt-2 rounded"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3 className="mt-2">{v.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {v.description}
                  </p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditClick(v)}
                      className="bg-gray-700 px-2 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(v._id)}
                      className="bg-red-600 px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Channel;