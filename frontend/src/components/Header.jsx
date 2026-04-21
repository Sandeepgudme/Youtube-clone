import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/?search=${search}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);

    window.dispatchEvent(
      new CustomEvent("toggleSidebar", { detail: newState })
    );
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-black text-white border-b border-gray-800">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <span
          onClick={toggleSidebar}
          className="text-xl cursor-pointer hover:scale-110"
        >
          ☰
        </span>

        {/* YouTube Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-1 cursor-pointer"
        >
          <div className="bg-red-600 px-2 py-1 rounded-sm text-white font-bold">
            ▶
          </div>
          <span className="font-semibold text-lg tracking-wide">
            YouTube <span className="text-xs text-gray-400">IN</span>
          </span>
        </div>
      </div>

      {/* CENTER */}
      <div className="hidden sm:flex items-center w-[50%] max-w-[600px]">

        {/* SEARCH BOX */}
        <div className="flex flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className="w-full bg-black border border-gray-700 px-4 py-2 rounded-l-full outline-none focus:border-blue-500"
          />

          <button
            onClick={handleSearch}
            className="bg-gray-800 px-5 rounded-r-full border border-gray-700 hover:bg-gray-700"
          >
            🔍
          </button>
        </div>

        {/* MIC BUTTON */}
        <button className="ml-3 bg-gray-800 p-2 rounded-full hover:bg-gray-700">
          🎙️
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* CREATE */}
        {user && (
          <button
            onClick={() => navigate("/create-channel")}
            className="hidden sm:flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full hover:bg-gray-700"
          >
            <span className="text-lg">+</span>
            Create
          </button>
        )}

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer">
          <span className="text-xl">🔔</span>

          {/* RED BADGE */}
          <span className="absolute -top-1 -right-1 bg-red-600 text-xs px-1.5 rounded-full">
            9+
          </span>
        </div>

        {/* USER */}
        {user ? (
          <div className="flex items-center gap-2">

            {/* AVATAR */}
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-semibold">
              {user.username?.charAt(0).toUpperCase()}
            </div>

            {/* LOGOUT (hidden on mobile) */}
            <button
              onClick={handleLogout}
              className="hidden sm:block bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 px-4 py-1 rounded-full hover:bg-blue-500"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;