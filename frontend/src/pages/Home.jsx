import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/api";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const search = query.get("search") || "";
  const categoryQuery = query.get("category") || "All";

  // ✅ FETCH VIDEOS
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get("/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // ✅ SYNC CATEGORY WITH URL
  useEffect(() => {
    setCategory(
      categoryQuery.charAt(0).toUpperCase() +
        categoryQuery.slice(1).toLowerCase()
    );
  }, [categoryQuery]);

  // ✅ FILTER LOGIC
  const filtered = videos.filter((v) => {
    const matchSearch = v.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      v.category?.toLowerCase() === category.toLowerCase();

    return matchSearch && matchCategory;
  });

  const categories = [
    "All",
    "Music",
    "Tech",
    "Gaming",
    "Sports",
    "Trailers",
  ];

  return (
    <div className="text-white">

      {/* 🔥 CATEGORY BAR */}
      <div className="sticky top-0 z-10 bg-black px-4 py-2 border-b border-gray-800">
        <div className="flex gap-3 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${
                category === c
                  ? "bg-white text-black"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">

        {/* LOADING */}
        {loading && (
          <p className="text-gray-400">Loading videos...</p>
        )}

        {/* NO DATA */}
        {!loading && filtered.length === 0 && (
          <p className="text-gray-400 text-lg">
            No videos available currently
          </p>
        )}

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;