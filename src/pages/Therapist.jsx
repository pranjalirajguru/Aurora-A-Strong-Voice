import { motion } from "framer-motion";

export default function Therapist() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen aurora-bg flex flex-col justify-center items-center text-center px-6"
    >
      <h1 className="text-5xl font-bold text-[#4B0082] mb-4">
        AI Therapist (Coming Soon)
      </h1>
      <p className="text-[#1B003F]/80 max-w-xl">
        A calm, empathetic space for healing. This AI will listen, support, and help victims process emotions safely.
      </p>
    </motion.div>
  );
}
