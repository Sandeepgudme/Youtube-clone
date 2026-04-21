import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleToggle = (e) => {
      setOpen(e.detail);
    };

    window.addEventListener("toggleSidebar", handleToggle);

    return () => {
      window.removeEventListener("toggleSidebar", handleToggle);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="w-56 bg-black text-white h-screen p-4 border-r border-gray-800">

      {/* BUTTONS */}
      <div className="flex flex-col gap-2">

        {/* HOME */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-800"
        >
          🏠 Home
        </button>

        {/* TRENDING */}
        <button
          onClick={() => navigate("/?category=trending")}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-800"
        >
          🔥 Trending
        </button>

        {/* MUSIC */}
        <button
          onClick={() => navigate("/?category=music")}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-800"
        >
          🎵 Music
        </button>

        {/* GAMING */}
        <button
          onClick={() => navigate("/?category=gaming")}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-800"
        >
          🎮 Gaming
        </button>

      </div>
    </div>
  );
};

export default Sidebar;