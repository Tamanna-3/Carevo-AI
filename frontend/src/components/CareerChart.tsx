import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", ats: 45, skills: 30 },
  { name: "Feb", ats: 55, skills: 45 },
  { name: "Mar", ats: 68, skills: 52 },
  { name: "Apr", ats: 72, skills: 65 },
  { name: "May", ats: 78, skills: 74 },
  { name: "Jun", ats: 86, skills: 82 },
];

export function CareerChart() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="glass rounded-[28px] p-6 h-[400px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Career Growth</h3>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <div className="w-2 h-2 rounded-full bg-cyan-400" /> ATS Score
          </div>
          <div className="flex items-center gap-1.5 text-purple-400">
            <div className="w-2 h-2 rounded-full bg-purple-400" /> Skills
          </div>
        </div>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSkills" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
            <Area type="monotone" dataKey="ats"    stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorAts)" />
            <Area type="monotone" dataKey="skills" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorSkills)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}