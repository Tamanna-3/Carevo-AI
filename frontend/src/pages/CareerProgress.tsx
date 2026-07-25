import { motion } from "framer-motion";
import { ChevronRight, Target, Award, Calendar, CheckCircle2, Circle, Plus } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from "recharts";
import { PageLayout } from "@/components/PageLayout";
import { useState } from "react";

const growthData = [
  { month: "Feb", ats: 62, skills: 55, apps: 2  },
  { month: "Mar", ats: 68, skills: 60, apps: 5  },
  { month: "Apr", ats: 71, skills: 65, apps: 8  },
  { month: "May", ats: 75, skills: 70, apps: 12 },
  { month: "Jun", ats: 80, skills: 74, apps: 15 },
  { month: "Jul", ats: 86, skills: 80, apps: 19 },
];

const radarData = [
  { skill: "React",         value: 90 },
  { skill: "TypeScript",    value: 82 },
  { skill: "Node.js",       value: 75 },
  { skill: "Python",        value: 70 },
  { skill: "AWS",           value: 50 },
  { skill: "Docker",        value: 45 },
  { skill: "System Design", value: 55 },
  { skill: "SQL",           value: 72 },
];

const milestones = [
  { label: "Created Carevo profile",           done: true,  date: "Feb 2025"          },
  { label: "First resume analysis completed",   done: true,  date: "Feb 2025"          },
  { label: "ATS score above 75",               done: true,  date: "May 2025"          },
  { label: "Applied to 10+ jobs",              done: true,  date: "Jun 2025"          },
  { label: "First interview scheduled",         done: true,  date: "Jul 2025"          },
  { label: "Land a job offer",                 done: false, date: "Target: Aug 2025"  },
  { label: "Complete Docker certification",     done: false, date: "Target: Sep 2025"  },
];

const goals = [
  { label: "Reach ATS score 90+",       progress: 86, target: 90,  color: "from-purple-500 to-cyan-500"  },
  { label: "Apply to 25 companies",     progress: 19, target: 25,  color: "from-cyan-400 to-blue-500"    },
  { label: "Learn AWS fundamentals",    progress: 50, target: 100, color: "from-pink-500 to-purple-500"  },
  { label: "Complete 5 mock interviews",progress: 2,  target: 5,   color: "from-amber-400 to-orange-500" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl p-3 text-xs"
      style={{
        background: "rgba(13,15,26,0.95)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
      }}
    >
      <p className="text-white/50 mb-2 font-medium">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white/70 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">
            {p.value}{p.name !== "apps" ? "%" : ""}
          </span>
        </div>
      ))}
    </div>
  );
};

export function CareerProgress() {
  const [showGoalInput, setShowGoalInput] = useState(false);

  return (
    <PageLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

        {/* ── Page Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/70">Career Progress</span>
          </div>
          <h1 className="text-3xl font-black text-white">Career Progress</h1>
          <p className="text-white/50 mt-1">Track your growth, achievements, and goals over time.</p>
        </div>

        {/* ── Stat Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: "ATS Score",   value: "86",  unit: "/100",      delta: "+8 this month",  color: "text-purple-400" },
            { label: "Jobs Applied",value: "19",  unit: " total",    delta: "+4 this week",   color: "text-cyan-400"   },
            { label: "Interviews",  value: "3",   unit: " scheduled",delta: "1 tomorrow",     color: "text-blue-400"   },
            { label: "Skill Score", value: "80%", unit: "",          delta: "+5% this month", color: "text-pink-400"   },
          ].map(({ label, value, unit, delta, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-[24px] bg-white/[0.03] border border-white/10 p-5"
            >
              <p className="text-white/50 text-sm mb-2">{label}</p>
              <p className="text-3xl font-black text-white">
                {value}
                <span className="text-white/30 text-lg font-medium">{unit}</span>
              </p>
              <p className={`text-xs mt-1.5 ${color}`}>{delta}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Growth Chart + Radar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Area chart */}
          <div className="lg:col-span-2 rounded-[28px] bg-white/[0.02] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-bold">Career Growth</h3>
                <p className="text-white/40 text-xs mt-0.5">6-month trend across all metrics</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />ATS Score
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />Skills
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-400 inline-block" />Applications
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gAts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="gSkills" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="gApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="ats"    stroke="#a855f7" strokeWidth={2} fill="url(#gAts)"    />
                <Area type="monotone" dataKey="skills" stroke="#22d3ee" strokeWidth={2} fill="url(#gSkills)" />
                <Area type="monotone" dataKey="apps"   stroke="#ec4899" strokeWidth={2} fill="url(#gApps)"   />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Radar chart */}
          <div className="rounded-[28px] bg-white/[0.02] border border-white/10 p-6">
            <h3 className="text-white font-bold mb-1">Skill Radar</h3>
            <p className="text-white/40 text-xs mb-4">Competency across key areas</p>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="rgba(255,255,255,0.07)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Goals + Milestones ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Goals */}
          <div className="rounded-[28px] bg-white/[0.02] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white font-bold">Active Goals</h3>
              </div>
              <button
                onClick={() => setShowGoalInput((v) => !v)}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {goals.map(({ label, progress, target, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-white/70 text-sm">{label}</span>
                    <span className="text-white/40 text-xs">{progress}/{target}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(progress / target) * 100}%` }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {showGoalInput && (
              <div className="mt-4 flex gap-2">
                <input
                  placeholder="New goal..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20"
                />
                <button
                  onClick={() => setShowGoalInput(false)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Milestones */}
          <div className="rounded-[28px] bg-white/[0.02] border border-white/10 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Award className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-bold">Milestones</h3>
            </div>

            <div className="relative">
              <div className="absolute left-2.5 top-2 bottom-2 w-px bg-white/[0.06]" />
              <div className="flex flex-col gap-4">
                {milestones.map(({ label, done, date }) => (
                  <div key={label} className="flex items-start gap-4 relative">
                    <div
                      className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        done
                          ? "bg-green-500/20 border border-green-500/40"
                          : "bg-white/5 border border-white/10"
                      }`}
                    >
                      {done
                        ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                        : <Circle className="w-3 h-3 text-white/20" />
                      }
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${done ? "text-white/50 line-through decoration-white/20" : "text-white/90"}`}>
                        {label}
                      </p>
                      <p className="text-xs text-white/30 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </PageLayout>
  );
}