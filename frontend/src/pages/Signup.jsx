import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    // ✅ VALIDATION
    if (!user.username || !user.email || !user.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/signup", user);

      // ✅ SAVE USER
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Registered Successfully");

      // ✅ refresh UI (header updates)
      window.location.href = "/";

    } catch (err) {
      console.error(err?.response?.data || err.message);
      alert("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg w-80 shadow-lg">

        <h2 className="mb-5 text-2xl font-semibold text-center">
          Sign Up
        </h2>

        <input
          name="username"
          onChange={handleChange}
          className="w-full mb-3 p-2 bg-black border border-gray-700 rounded"
          placeholder="Username"
        />

        <input
          name="email"
          onChange={handleChange}
          className="w-full mb-3 p-2 bg-black border border-gray-700 rounded"
          placeholder="Email"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          className="w-full mb-3 p-2 bg-black border border-gray-700 rounded"
          placeholder="Password"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-red-600 p-2 mt-2 rounded hover:bg-red-500"
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </div>
    </div>
  );
};

export default Signup;