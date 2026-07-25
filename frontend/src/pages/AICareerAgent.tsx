import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Send, Sparkles, User, ChevronRight,
  Zap, FileText, Search, Map, BarChart2, RefreshCw,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { askCareerAI } from "@/services/careerAI";

interface Message {
  id:        string;
  role:      "ai" | "user";
  text:      string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "ai",
    timestamp: "Just now",
    text: "Hi Tamanna 👋 I'm your Carevo AI Career Agent. I can help you improve your resume, find matching jobs, prepare for interviews, and build a career roadmap tailored to your goals. What would you like to work on today?",
  },
];

const QUICK_PROMPTS = [
  { label: "Improve my resume",          icon: FileText  },
  { label: "Find AI internships for me", icon: Search    },
  { label: "Build my career roadmap",    icon: Map       },
  { label: "Analyze my skill gaps",      icon: BarChart2 },
  { label: "Write a cover letter",       icon: Zap       },
];


function renderMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    const bold     = line.replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>");
    const isItem   = line.startsWith("•") || line.startsWith("*");
    const isHeader = /^\*\*.*\*\*$/.test(line.trim()) || Boolean(line.match(/^(Month|Week|Day)\s/));
    return (
      <span
        key={i}
        className={`block ${isItem ? "pl-2" : ""} ${isHeader ? "mt-2" : ""}`}
        dangerouslySetInnerHTML={{ __html: bold }}
      />
    );
  });
}

export function AICareerAgent() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input,    setInput]    = useState("");
  const [typing,   setTyping]   = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

async function send(text?: string) {

  const msg = (text ?? input).trim();

  if (!msg) return;


  const userMsg: Message = {
    id: Date.now().toString(),
    role: "user",
    text: msg,
    timestamp: "Just now",
  };


  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setTyping(true);


  try {

    const response = await askCareerAI(msg);


    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      text: response.output,
      timestamp: "Just now",
    };


    setMessages((prev) => [...prev, aiMsg]);


  } catch(error) {

    console.error(error);


    const errorMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      text: "Sorry, I couldn't connect to Carevo AI right now.",
      timestamp: "Just now",
    };


    setMessages((prev)=>[
      ...prev,
      errorMsg
    ]);


  } finally {

    setTyping(false);

  }
}
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-[calc(100vh-80px)]"
      >

        {/* ── Page Header ── */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/70">AI Career Agent</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                AI Career Agent
              </h1>
              <p className="text-white/50 mt-1 ml-12">
                Your personal AI that knows your career goals, resume, and job market.
              </p>
            </div>

            <button
              onClick={() => setMessages(INITIAL_MESSAGES)}
              className="flex items-center gap-2 text-white/30 hover:text-white/60 text-sm transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> New conversation
            </button>
          </div>
        </div>

        {/* ── Scrollable chat area ── */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-5 pb-4 pr-2">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[82%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                    msg.role === "ai"
                      ? "bg-gradient-to-br from-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                      : "bg-gradient-to-br from-cyan-500 to-blue-500"
                  }`}
                >
                  {msg.role === "ai"
                    ? <Sparkles className="w-4 h-4 text-white" />
                    : <User     className="w-4 h-4 text-white" />
                  }
                </div>

                {/* Message bubble */}
                <div
                  className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                    msg.role === "ai"
                      ? "bg-white/[0.04] border border-white/[0.08] text-white/80 rounded-tl-sm"
                      : "bg-gradient-to-br from-purple-500/30 to-cyan-500/20 border border-purple-500/20 text-white rounded-tr-sm"
                  }`}
                >
                  {msg.role === "ai" ? renderMarkdown(msg.text) : msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 max-w-[82%]"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mt-0.5">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>

        {/* ── Input area ── */}
        <div className="flex-shrink-0 pt-3 border-t border-white/[0.06]">

          {/* Quick prompt chips */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_PROMPTS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => send(label)}
                className="flex-shrink-0 flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Text input + send button */}
          <div className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask Carevo anything about your career..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/40 transition-all text-sm"
            />
            <button
              onClick={() => send()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 hover:opacity-90 text-white flex items-center justify-center transition-all"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>

        </div>
      </motion.div>
    </PageLayout>
  );
}