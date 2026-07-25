import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon?: ReactNode;
  accent: "purple" | "cyan" | "blue" | "pink";
  delay?: number;
}

const accentColors = {
  purple: "from-purple-500 to-purple-700",
  cyan:   "from-cyan-400 to-cyan-600",
  blue:   "from-blue-500 to-blue-700",
  pink:   "from-pink-500 to-pink-700",
};

const accentGlows = {
  purple: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] group-hover:border-purple-500/30",
  cyan:   "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] group-hover:border-cyan-500/30",
  blue:   "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover:border-blue-500/30",
  pink:   "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] group-hover:border-pink-500/30",
};

const accentText = {
  purple: "text-purple-400",
  cyan:   "text-cyan-400",
  blue:   "text-blue-400",
  pink:   "text-pink-400",
};

export function StatCard({ title, value, subtitle, accent, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass h-[160px] rounded-[28px] p-6 relative overflow-hidden group transition-all duration-500 ${accentGlows[accent]}`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${accentColors[accent]} opacity-70`} />
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${accentColors[accent]} blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
      <div className="flex flex-col h-full justify-between relative z-10">
        <h3 className="text-white/60 font-medium text-sm">{title}</h3>
        <div>
          <div className="text-4xl font-bold text-white mb-2">{value}</div>
          <div className={`text-sm font-medium ${accentText[accent]} bg-white/5 inline-flex px-3 py-1 rounded-full items-center gap-1`}>
            {subtitle}
          </div>
        </div>
      </div>
    </motion.div>
  );
}