import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCreate = async () => {
    if (!name.trim() || !handle.trim()) {
      return alert("Please fill all fields");
    }

    try {
      // 🔥 CLEAN DATA (IMPORTANT FIX)
      const cleanHandle = handle.replace("@", "").trim();
      const cleanName = name.trim();

      const res = await API.post("/channels", {
        name: cleanName,
        handle: cleanHandle,
        userId: user._id,
      });

      // ✅ attach channel to user
      const updatedUser = {
        ...user,
        channel: res.data,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/channel");
    } catch (err) {
      console.error(err);
      alert("Channel creation failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-white text-black p-6 rounded-lg w-[420px]">

        <h2 className="text-lg font-semibold mb-4">
          How you'll appear
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-2xl">
            {name ? name[0].toUpperCase() : "U"}
          </div>
        </div>

        {/* Name */}
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        {/* Handle */}
        <input
          placeholder="@username"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="text-blue-600 font-semibold"
          >
            Create channel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;