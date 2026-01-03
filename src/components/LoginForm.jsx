import React, { useState } from "react";
import API from "../services/api";

const LoginForm = ({ onLoginSuccess, onSwitch }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", credentials, {
        headers: { "Content-Type": "application/json" },
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.access_token);

      // ✅ Show success briefly then switch to Dashboard
      setMessage("✅ Login successful!");
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
      }, 1000);
    } catch (error) {
      setMessage("❌ " + (error.response?.data?.detail || "Login failed"));
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-[#4B0082] mb-6">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border border-purple-300 bg-white/70 text-[#1B003F] placeholder-[#4B0082]/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border border-purple-300 bg-white/70 text-[#1B003F] placeholder-[#4B0082]/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
        />

        <button
          type="submit"
          className="mt-4 w-full py-2 bg-[#4B0082] text-white font-medium rounded-xl shadow-md hover:bg-[#360061] transition"
        >
          Login
        </button>
      </form>

      {/* Message */}
      {message && (
        <p
          className={`mt-4 text-sm ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <p className="mt-4 text-sm text-[#4B0082]/70">
        Don’t have an account?{" "}
        <button
  type="button"
  onClick={onSwitch}
  className="underline hover:text-[#1B003F]"
>
  Create one
</button>

      </p>
    </div>
  );
};

export default LoginForm;
