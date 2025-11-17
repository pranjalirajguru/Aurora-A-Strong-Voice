import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "File a Complaint",
      description:
        "A safe, confidential space for victims to file complaints. We understand that many can’t take a public stand — Aurora ensures your voice is heard with dignity and privacy.",
      button: "File Complaint",
      color: "from-purple-500 to-pink-500",
      route: "/complaint",
    },
    {
      title: "Law Bot",
      description:
        "An AI-powered legal assistant that explains women’s rights, protection laws, and the justice process — empowering you with accurate and compassionate guidance.",
      button: "Open Law Bot",
      color: "from-indigo-500 to-blue-500",
      route: "/lawbot",
    },
    {
      title: "AI Therapist",
      description:
        "A calm, empathetic AI therapist who listens, guides, and helps victims heal emotionally. Because mental well-being is just as important as justice.",
      button: "Talk to AI Therapist",
      color: "from-pink-400 to-rose-500",
      route: "/therapist",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 aurora-bg text-[#1B003F]"
    >
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-5xl font-bold text-[#4B0082] mb-4"
      >
        Welcome to Aurora Dashboard
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg text-[#1B003F]/80 mb-10 max-w-2xl"
      >
        Empowering women through knowledge, safety, and emotional support.
      </motion.p>

      {/* 3 Feature Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className={`bg-white/40 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8 hover:shadow-purple-300/50 hover:bg-white/60 transition-all duration-300`}
          >
            <h2 className="text-2xl font-semibold text-[#4B0082] mb-3">
              {feature.title}
            </h2>
            <p className="text-[#1B003F]/80 mb-6 leading-relaxed">
              {feature.description}
            </p>
            <button
              onClick={() => navigate(feature.route)}
              className={`px-6 py-2 rounded-full bg-gradient-to-r ${feature.color} text-white font-medium hover:opacity-90 transition`}
            >
              {feature.button}
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Back Button */}
      <motion.button
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="mt-12 text-[#4B0082] font-medium underline text-sm hover:text-[#1B003F]"
      >
        ← Back to Home
      </motion.button>
    </motion.div>
  );
}
