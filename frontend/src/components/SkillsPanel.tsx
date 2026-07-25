import { motion } from "framer-motion";

const skills = [
  { name: "React",      level: 90 },
  { name: "Python",     level: 75 },
  { name: "JavaScript", level: 70 },
  { name: "AWS",        level: 50 },
  { name: "Docker",     level: 45 },
];

export function SkillsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="glass rounded-[28px] p-6 h-[400px] flex flex-col"
    >
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Top Skills</h3>
        <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-md">Based on Profile</span>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        {skills.map((skill, i) => (
          <div key={i} className="group">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{skill.name}</span>
              <span className="text-xs font-bold text-cyan-400">{skill.level}%</span>
            </div>
            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 relative"
              >
                <div className="absolute inset-0 bg-white/20 w-full h-full mix-blend-overlay" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}