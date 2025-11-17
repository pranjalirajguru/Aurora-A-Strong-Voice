import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import Landing from "./pages/Landing.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LawBot from "./pages/LawBot.jsx";
import ComplaintForm from "./pages/ComplaintForm.jsx";
import Therapist from "./pages/Therapist.jsx";

function EntryFlow() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!showAuth ? (
        <motion.div key="landing" className="w-full">
          <Landing onGetStarted={() => setShowAuth(true)} />
        </motion.div>
      ) : (
        <motion.div key="auth" className="w-full">
          <AuthPage onBack={() => setShowAuth(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="aurora-bg min-h-screen text-[#1B003F]">
        <Routes>
          {/* Entry flow (landing + auth) */}
          <Route path="/" element={<EntryFlow />} />

          {/* Dashboard and pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lawbot" element={<LawBot />} />
          <Route path="/complaint" element={<ComplaintForm />} />
          <Route path="/therapist" element={<Therapist />} />
        </Routes>
      </div>
    </Router>
  );
}
