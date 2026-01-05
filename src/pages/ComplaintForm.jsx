import { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


export default function ComplaintForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    victim_name: "",
    complaint_title: "",
    culprit_name: "",
    incident_description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 🔹 1. Save complaint to your backend (UNCHANGED)
    const res = await API.post("/api/complaints/create", form);

    // 🔹 2. Send same data to Web3Forms (ADDED)
    const formData = new FormData();
    formData.append("access_key", "64ef29de-4a17-4e19-9573-bcd74262a91a");

    formData.append("Victim Name", form.victim_name);
    formData.append("Complaint Title", form.complaint_title);
    formData.append("Culprit Name", form.culprit_name);
    formData.append("Incident Description", form.incident_description);

    // 🔹 redirect URL (can change later)
    formData.append("redirect", "http://localhost:5173/ComplaintSuccess");

    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    // 🔹 UI success
    setMessage("✅ Complaint submitted successfully!");

    setForm({
      victim_name: "",
      complaint_title: "",
      culprit_name: "",
      incident_description: "",
    });

  } catch (error) {
    setMessage("❌ " + (error.response?.data?.detail || "Submission failed"));
  }
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 aurora-bg text-[#1B003F]"
    >
      <motion.h1
        className="text-4xl font-bold text-[#4B0082] mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        File a Complaint
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8 w-full max-w-lg text-left"
      >
        <label className="block mb-2 text-[#4B0082] font-medium">
          Victim Name:
        </label>
        <input
          type="text"
          name="victim_name"
          value={form.victim_name}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded-xl border border-purple-300 bg-white/70 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <label className="block mb-2 text-[#4B0082] font-medium">
          Complaint Title:
        </label>
        <input
          type="text"
          name="complaint_title"
          value={form.complaint_title}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded-xl border border-purple-300 bg-white/70 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <label className="block mb-2 text-[#4B0082] font-medium">
          Culprit Name (if known):
        </label>
        <input
          type="text"
          name="culprit_name"
          value={form.culprit_name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-xl border border-purple-300 bg-white/70 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <label className="block mb-2 text-[#4B0082] font-medium">
          Incident Description:
        </label>
        <textarea
          name="incident_description"
          value={form.incident_description}
          onChange={handleChange}
          rows="5"
          required
          className="w-full mb-4 px-4 py-2 rounded-xl border border-purple-300 bg-white/70 focus:ring-2 focus:ring-purple-400 outline-none"
        ></textarea>

        <button
          type="submit"
          className="w-full py-2 mt-2 bg-[#4B0082] text-white font-medium rounded-xl hover:bg-[#360061] transition"
        >
          Submit Complaint
        </button>

        {message && (
          <p
            className={`mt-4 text-sm ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      {/* ⭐ FIXED BACK BUTTON */}
      <motion.button
        onClick={() => navigate("/dashboard")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="mt-8 text-[#4B0082] font-medium underline text-sm hover:text-[#1B003F]"
      >
        ← Back to Dashboard
      </motion.button>
    </motion.div>
  );
}
