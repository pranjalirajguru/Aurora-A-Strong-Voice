import { useState, useRef } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Therapist() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();


  // 🔊 Speak AI response
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  // 🎙️ Start voice input
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  // 📤 Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await API.post("/api/therapist/chat", {
        message: userMsg.text,
      });

      const aiMsg = { role: "ai", text: res.data.reply };
      setMessages((prev) => [...prev, aiMsg]);
      speak(aiMsg.text);

    } catch {
      alert("Therapist is unavailable right now");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen aurora-bg flex flex-col items-center p-6"
    >
      <h1 className="text-4xl font-bold text-[#4B0082] mb-4">
        AI Therapist
      </h1>
      <p className="text-[#1B003F]/70 mb-6">
  A safe space to talk, breathe, and feel heard.
</p>


      {/* 💬 Chat Box */}
      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-xl rounded-2xl p-4 mb-4 overflow-y-auto h-[60vh]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-3 ${
              m.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-xl ${
                m.role === "user"
                  ? "bg-[#4B0082] text-white"
                  : "bg-white text-[#1B003F]"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      {/* 📝 Input + Mic */}
      <div className="flex gap-2 w-full max-w-2xl">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk or type how you feel..."
          className="flex-1 px-4 py-2 rounded-xl outline-none"
        />

        <button
          onClick={startListening}
          className="px-3 py-2 bg-purple-200 rounded-xl"
        >
          🎙️
        </button>

        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-[#4B0082] text-white rounded-xl"
        >
          Send
        </button>
      </div>
       <div className="text-center mt-8">
      <button
        onClick={() => navigate("/dashboard")}
        className="text-[#4B0082] hover:text-[#1B003F] underline text-sm font-medium transition"
      >
        ← Back to Dashboard
      </button>
    </div>
    </motion.div>
  );
}
