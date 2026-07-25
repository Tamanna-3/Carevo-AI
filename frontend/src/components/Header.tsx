import { Search, Bell, User, Settings, LogOut, ChevronDown, Shield } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-start justify-between mb-8 w-full">
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-medium text-white/90 mb-1">
          Good Afternoon, Tamanna <span className="inline-block animate-wave origin-bottom-right">👋</span>
        </h2>
        <h1 className="text-4xl md:text-5xl font-black text-gradient tracking-tight leading-tight mb-3">
          Your Career Growth,<br/>Powered by AI
        </h1>
        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
          Track your progress, improve your skills and discover opportunities with your personal AI career assistant.
        </p>
      </div>

      <div className="flex items-center gap-4 hidden md:flex">
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
          />
        </div>

        <button className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen((v) => !v)} className="flex items-center gap-2 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 p-[2px] cursor-pointer">
              <img
                src="https://ui-avatars.com/api/?name=Tamanna+S&background=0D0F1A&color=fff"
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-[#0D0F1A]"
              />
            </div>
            <ChevronDown className={`w-4 h-4 text-white/50 group-hover:text-white/80 transition-all duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-56 z-50 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(13,15,26,0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.15)"
                }}
              >
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-sm font-semibold text-white">Tamanna S</p>
                  <p className="text-xs text-white/40 mt-0.5">tamanna@example.com</p>
                </div>
                <div className="p-1.5">
                  {[
                    { icon: User,     label: "My Profile", sub: "View & edit profile" },
                    { icon: Settings, label: "Settings",   sub: "Preferences & account" },
                    { icon: Shield,   label: "Privacy",    sub: "Manage your data" },
                  ].map(({ icon: Icon, label, sub }) => (
                    <button key={label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group text-left">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors flex-shrink-0">
                        <Icon className="w-4 h-4 text-white/50 group-hover:text-purple-400 transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">{label}</p>
                        <p className="text-[11px] text-white/30">{sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-1.5 border-t border-white/[0.06]">
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 transition-colors group text-left"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 transition-colors flex-shrink-0">
                      <LogOut className="w-4 h-4 text-white/50 group-hover:text-red-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80 group-hover:text-red-400 transition-colors font-medium">Log out</p>
                      <p className="text-[11px] text-white/30">Sign out of your account</p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}