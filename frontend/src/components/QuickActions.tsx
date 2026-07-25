import { motion } from "framer-motion";
import { FileText, Briefcase, Bot, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const actions = [
  { title: "Resume Analyzer", description: "Get AI feedback on your resume",     icon: FileText,   color: "from-purple-500 to-indigo-500", href: "/resume" },
  { title: "Job Analyzer",    description: "Track and analyze opportunities",     icon: Briefcase,  color: "from-cyan-400 to-blue-500",     href: "/jobs" },
  { title: "AI Career Agent", description: "Chat with your AI career copilot",   icon: Bot,        color: "from-pink-500 to-rose-500",     href: "/agent" },
  { title: "Career Progress", description: "View your growth and goals",         icon: TrendingUp, color: "from-amber-400 to-orange-500",  href: "/progress" },
];

export function QuickActions() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="mt-8 mb-12">
      <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <Link key={i} href={action.href}>
            <div className="glass rounded-[24px] p-5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-bold mb-1 flex items-center justify-between">
                {action.title}
                <ArrowRight className="w-4 h-4 text-white/0 -translate-x-2 group-hover:text-white/50 group-hover:translate-x-0 transition-all duration-300" />
              </h4>
              <p className="text-xs text-white/60">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}