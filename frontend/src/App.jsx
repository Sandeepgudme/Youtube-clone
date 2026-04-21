import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import CreateChannel from "./pages/CreateChannel";
import Channel from "./pages/Channel";

const App = () => {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* HEADER */}
      <Header />

      <div className="flex">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-60px)]">

          <Routes>

            {/* HOME */}
            <Route path="/" element={<Home />} />

            {/* VIDEO PLAYER */}
            <Route path="/video/:id" element={<VideoPlayer />} />

            {/* AUTH */}
            <Route path="/signup" element={<Signup />} />

            {/* UPLOAD */}
            <Route path="/upload" element={<Upload />} />

            {/* CREATE CHANNEL */}
            <Route path="/create-channel" element={<CreateChannel />} />

            {/* CHANNEL */}
            <Route path="/channel" element={<Channel />} />

            {/* OPTIONAL FUTURE ROUTE */}
            {/* <Route path="/channel/:id" element={<Channel />} /> */}

          </Routes>

        </div>
      </div>
    </div>
  );
};

export default App;