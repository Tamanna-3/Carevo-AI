import { LayoutDashboard, FileText, Briefcase, Bot, TrendingUp, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";
import carevoLogo from "@assets/carevo-logo.png";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard",      href: "/",        icon: LayoutDashboard },
  { name: "Resume Analyzer",href: "/resume",   icon: FileText },
  { name: "Job Analyzer",   href: "/jobs",     icon: Briefcase },
  { name: "AI Career Agent",href: "/agent",    icon: Bot },
  { name: "Career Progress",href: "/progress", icon: TrendingUp },
  { name: "Settings",       href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-[260px] h-screen bg-black border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="relative w-15 h-15 flex-shrink-0">
          <img
            src={carevoLogo}
            alt="Carevo AI Logo"
            className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full blur-2xl opacity-40" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Carevo AI</h1>
          <p className="text-[10px] uppercase tracking-wider text-cyan-400 font-medium">AI Career Copilot</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer group ${
                isActive ? "bg-white/5 text-white" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}>
                {isActive && (
                  <motion.div
                    layoutId="active-sidebar-pill"
                    className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-r-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-cyan-400" : "group-hover:text-cyan-400/70"}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="glass rounded-2xl p-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 z-0 opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">AI Tip</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Adding measurable achievements to your resume can increase your interview chances by{" "}
              <span className="text-cyan-400 font-bold">40%</span>.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}