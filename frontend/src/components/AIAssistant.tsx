import { motion } from "framer-motion";
import { Bot, Send, Sparkles, FileText, Search, TrendingUp, Mic, ArrowRight } from "lucide-react";

export function AIAssistant() {
  const suggestedPrompts = ["Improve my resume", "Find AI internships", "Prepare interview questions"];
  const quickActions = [
    { label: "Analyze Resume",      icon: FileText },
    { label: "Find Jobs",           icon: Search },
    { label: "Improve ATS",         icon: TrendingUp },
    { label: "Interview Questions", icon: Mic },
    { label: "Career Roadmap",      icon: ArrowRight },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mt-8 rounded-[32px] p-[1px] overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
      <div className="glass rounded-[31px] p-8 relative z-10 h-full flex flex-col bg-background/90 backdrop-blur-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-[1px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white">✨ Carevo AI Assistant</h2>
        </div>

        <div className="flex gap-4 max-w-[85%]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-5 text-[15px] leading-relaxed text-white/90">
            Good afternoon Tamanna 👋 Your resume is{" "}
            <span className="text-cyan-400 font-semibold">86% ATS ready</span>. I found 12 jobs matching your profile.
            Learning <span className="text-purple-400 font-semibold">Docker</span> and{" "}
            <span className="text-purple-400 font-semibold">System Design</span> could boost your interview chances by 35%.
            <div className="flex flex-wrap gap-2 mt-4">
              {quickActions.map((action, i) => (
                <button key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs font-medium text-white/80 transition-colors">
                  <action.icon className="w-3.5 h-3.5 text-cyan-400" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedPrompts.map((prompt, i) => (
              <button key={i} className="text-xs font-medium px-4 py-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                {prompt}
              </button>
            ))}
          </div>
          <div className="relative">
            <input type="text" placeholder="Ask Carevo anything..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/10 hover:bg-cyan-500 hover:text-white text-white/70 flex items-center justify-center transition-all">
              <Send className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}