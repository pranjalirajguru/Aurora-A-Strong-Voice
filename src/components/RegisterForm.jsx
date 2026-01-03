import React, { useState } from "react";
import API from "../services/api";

const RegisterForm = ({ onSwitch }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      setMessage("✅ Account created! You can now login.");
    } catch (error) {
      setMessage("❌ " + (error.response?.data?.detail || "Registration failed"));
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-[#4B0082] mb-6">
        Register
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border border-purple-300 bg-white/70 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border border-purple-300 bg-white/70 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border border-purple-300 bg-white/70 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <button
          type="submit"
          className="mt-4 w-full py-2 bg-[#4B0082] text-white rounded-xl hover:bg-[#360061] transition"
        >
          Register
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-[#4B0082]">{message}</p>
      )}

      <p className="mt-4 text-sm text-[#4B0082]/70">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="underline hover:text-[#1B003F]"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
