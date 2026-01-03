import { motion } from "framer-motion";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Dashboard from "./Dashboard";

export default function AuthPage({ onBack }) {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  if (showDashboard) return <Dashboard />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col justify-center items-center aurora-bg px-6"
    >
      <h1 className="text-5xl font-bold text-[#4B0082] mb-4">
        Welcome to Aurora
      </h1>

      <p className="text-[#1B003F]/80 mb-10 max-w-xl text-center">
        Login or create an account to begin your journey toward empowerment and safety.
      </p>

      <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {isRegister ? (
          <RegisterForm onSwitch={() => setIsRegister(false)} />
        ) : (
          <LoginForm
            onLoginSuccess={() => setShowDashboard(true)}
            onSwitch={() => setIsRegister(true)}
          />
        )}
      </div>

      <button
        onClick={onBack}
        className="mt-8 underline text-[#4B0082]"
      >
        ← Back to Home
      </button>
    </motion.div>
  );
}
