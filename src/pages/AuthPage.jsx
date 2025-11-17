import { motion } from "framer-motion";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import LoginForm from "../components/LoginForm";
import Dashboard from "./Dashboard";

export default function AuthPage({ onBack }) {
  const [showDashboard, setShowDashboard] = useState(false);

  // Once logged in, show the Dashboard instead of the login form
  if (showDashboard) {
    return <Dashboard />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 aurora-bg text-[#1B003F]"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-5xl font-bold text-[#4B0082] mb-4"
      >
        Welcome to Aurora
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg text-[#1B003F]/80 mb-10 max-w-xl"
      >
        Login or create an account to begin your journey toward empowerment and safety.
      </motion.p>

      {/* Main Auth Box */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative bg-white/40 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* You can replace AuthForm with LoginForm if you only want login here */}
        <LoginForm onLoginSuccess={() => setShowDashboard(true)} />
      </motion.div>

      {/* Back to Home */}
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="mt-8 text-[#4B0082] font-medium underline text-sm hover:text-[#1B003F]"
      >
        ← Back to Home
      </motion.button>
    </motion.div>
  );
}
