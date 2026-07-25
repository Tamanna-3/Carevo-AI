import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, FileText, Sparkles, CheckCircle2, AlertCircle,
  XCircle, ChevronRight, BarChart2, Zap, Target, RefreshCw
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";

const keywords = {
  found: ["React", "TypeScript", "Node.js", "REST APIs", "Git", "Agile", "PostgreSQL"],
  missing: ["Docker", "Kubernetes", "System Design", "AWS", "CI/CD"],
};

const suggestions = [
  { type: "high",   text: "Add measurable achievements — e.g. 'Reduced load time by 40%' instead of 'improved performance'." },
  { type: "high",   text: "Include a strong summary section at the top tailored to the role you're targeting." },
  { type: "medium", text: "Quantify your internship impact with numbers, percentages, or scale." },
  { type: "medium", text: "Add Docker and AWS to your skills — they appear in 70% of matched job postings." },
  { type: "low",    text: "Use stronger action verbs: 'Architected', 'Spearheaded', 'Optimized'." },
];

const sections = [
  { name: "Contact Info",    score: 100, status: "good" },
  { name: "Summary",         score: 55,  status: "warn" },
  { name: "Work Experience", score: 80,  status: "good" },
  { name: "Skills",          score: 72,  status: "good" },
  { name: "Education",       score: 90,  status: "good" },
  { name: "Projects",        score: 40,  status: "bad"  },
];

export function ResumeAnalyzer() {
  const [step, setStep]           = useState<"upload" | "analyzing" | "results">("upload");
  const [dragging, setDragging]   = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [tab, setTab]             = useState<"overview" | "keywords" | "suggestions">("overview");

  function startAnalysis() {
    setStep("analyzing");
    setTimeout(() => setStep("results"), 2200);
  }

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* ── Page Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/70">Resume Analyzer</span>
          </div>
          <h1 className="text-3xl font-black text-white">Resume Analyzer</h1>
          <p className="text-white/50 mt-1">
            Get an instant ATS score and actionable feedback on your resume.
          </p>
        </div>

        <AnimatePresence mode="wait">

          {/* ════════════════════════════════════════
              STEP 1 — UPLOAD
          ════════════════════════════════════════ */}
          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Drag-and-drop zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); startAnalysis(); }}
                  onClick={startAnalysis}
                  className={`
                    rounded-[28px] border-2 border-dashed flex flex-col items-center justify-center
                    gap-4 p-12 cursor-pointer transition-all duration-300
                    ${dragging
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }
                  `}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
                    <Upload className="w-7 h-7 text-cyan-400" />
                  </div>

                  <div className="text-center">
                    <p className="text-white font-semibold">Drop your resume here</p>
                    <p className="text-white/40 text-sm mt-1">PDF, DOCX, or TXT — or click to browse</p>
                  </div>

                  <div className="flex gap-2 mt-2">
                    {["PDF", "DOCX", "TXT"].map((f) => (
                      <span
                        key={f}
                        className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Paste-text panel */}
                <div className="rounded-[28px] bg-white/[0.02] border border-white/10 p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <span className="font-semibold text-white">Paste resume text</span>
                  </div>

                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume content here..."
                    className="
                      flex-1 min-h-[200px] bg-white/5 border border-white/10 rounded-2xl p-4
                      text-sm text-white/80 placeholder:text-white/30 resize-none
                      focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07]
                      transition-all
                    "
                  />

                  <button
                    onClick={startAnalysis}
                    disabled={!resumeText.trim()}
                    className="
                      w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500
                      text-white font-semibold text-sm hover:opacity-90 transition-opacity
                      disabled:opacity-30 disabled:cursor-not-allowed
                      flex items-center justify-center gap-2
                    "
                  >
                    <Sparkles className="w-4 h-4" />
                    Analyze Resume
                  </button>
                </div>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {[
                  {
                    icon:  Target,
                    label: "ATS Score",
                    desc:  "See exactly how recruiters' systems rate your resume",
                    color: "text-purple-400",
                  },
                  {
                    icon:  Zap,
                    label: "Keyword Gap",
                    desc:  "Discover missing keywords from real job postings",
                    color: "text-cyan-400",
                  },
                  {
                    icon:  BarChart2,
                    label: "Section Analysis",
                    desc:  "Section-by-section breakdown with fixes",
                    color: "text-pink-400",
                  },
                ].map(({ icon: Icon, label, desc, color }) => (
                  <div
                    key={label}
                    className="rounded-[20px] bg-white/[0.02] border border-white/10 p-5"
                  >
                    <Icon className={`w-5 h-5 ${color} mb-3`} />
                    <p className="text-white font-semibold text-sm">{label}</p>
                    <p className="text-white/40 text-xs mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ════════════════════════════════════════
              STEP 2 — ANALYZING
          ════════════════════════════════════════ */}
          {step === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-6"
            >
              {/* Spinning ring */}
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-purple-500 border-b-transparent border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-cyan-400" />
                </div>
              </div>

              {/* Status text */}
              <div className="text-center">
                <p className="text-white font-bold text-xl">Analyzing your resume...</p>
                <p className="text-white/40 text-sm mt-2">
                  Scanning for ATS compatibility, keywords, and improvements
                </p>
              </div>

              {/* Animated status lines */}
              <div className="flex flex-col gap-2 w-64">
                {[
                  "Parsing document structure...",
                  "Checking ATS compatibility...",
                  "Analyzing keywords...",
                ].map((text, i) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.6 }}
                    className="flex items-center gap-2 text-sm text-white/50"
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.4 }}
                    />
                    {text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ════════════════════════════════════════
              STEP 3 — RESULTS
          ════════════════════════════════════════ */}
          {step === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* ── Score Hero Row ── */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-6">

                {/* ATS ring */}
                <div className="lg:col-span-1 rounded-[28px] bg-white/[0.03] border border-white/10 p-6 flex flex-col items-center justify-center gap-3">
                  <div className="relative w-28 h-28">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50" cy="50" r="42"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="50" cy="50" r="42"
                        fill="none"
                        stroke="url(#atsGrad)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="263.9"
                        initial={{ strokeDashoffset: 263.9 }}
                        animate={{ strokeDashoffset: 263.9 * (1 - 0.86) }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                      <defs>
                        <linearGradient id="atsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%"   stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-white">86</span>
                      <span className="text-xs text-white/40">/100</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold">ATS Score</p>
                    <p className="text-cyan-400 text-xs font-medium mt-0.5">Excellent</p>
                  </div>
                </div>

                {/* Stat cards */}
                {[
                  { label: "Keywords Found", value: "7/12", sub: "58% coverage",  color: "text-purple-400" },
                  { label: "Readability",    value: "A+",   sub: "Very clear",    color: "text-green-400"  },
                  { label: "Improvements",   value: "5",    sub: "Suggestions",   color: "text-amber-400"  },
                ].map(({ label, value, sub, color }) => (
                  <div
                    key={label}
                    className="rounded-[28px] bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between"
                  >
                    <p className="text-white/50 text-sm font-medium">{label}</p>
                    <div>
                      <p className={`text-4xl font-black ${color}`}>{value}</p>
                      <p className="text-white/40 text-xs mt-1">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Tab Switcher ── */}
              <div className="flex gap-1 p-1 bg-white/[0.03] rounded-2xl border border-white/10 w-fit mb-6">
                {(["overview", "keywords", "suggestions"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`
                      px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all
                      ${tab === t ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* ── Tab: Overview ── */}
              {tab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sections.map(({ name, score, status }) => (
                    <div
                      key={name}
                      className="rounded-[20px] bg-white/[0.02] border border-white/10 p-5 flex items-center gap-4"
                    >
                      {status === "good" && <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />}
                      {status === "warn" && <AlertCircle  className="w-5 h-5 text-amber-400 flex-shrink-0" />}
                      {status === "bad"  && <XCircle      className="w-5 h-5 text-red-400   flex-shrink-0" />}

                      <div className="flex-1">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-white text-sm font-medium">{name}</span>
                          <span className="text-white/50 text-sm">{score}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${
                              score >= 80 ? "bg-green-400" : score >= 60 ? "bg-amber-400" : "bg-red-400"
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Tab: Keywords ── */}
              {tab === "keywords" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Found */}
                  <div className="rounded-[24px] bg-white/[0.02] border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-white font-semibold">Keywords Found</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {keywords.found.map((k) => (
                        <span
                          key={k}
                          className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing */}
                  <div className="rounded-[24px] bg-white/[0.02] border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      <span className="text-white font-semibold">Missing Keywords</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {keywords.missing.map((k) => (
                        <span
                          key={k}
                          className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                    <p className="text-white/30 text-xs mt-4">
                      Add these to increase your ATS match rate by up to 22%
                    </p>
                  </div>
                </div>
              )}

              {/* ── Tab: Suggestions ── */}
              {tab === "suggestions" && (
                <div className="flex flex-col gap-3">
                  {suggestions.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="rounded-[20px] bg-white/[0.02] border border-white/10 p-5 flex gap-4 items-start"
                    >
                      <span
                        className={`
                          mt-0.5 flex-shrink-0 text-xs font-bold uppercase px-2 py-0.5 rounded-full
                          ${s.type === "high"   ? "bg-red-500/10  text-red-400"  :
                            s.type === "medium" ? "bg-amber-500/10 text-amber-400" :
                                                  "bg-blue-500/10  text-blue-400"}
                        `}
                      >
                        {s.type}
                      </span>
                      <p className="text-white/70 text-sm leading-relaxed">{s.text}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* ── Reset button ── */}
              <button
                onClick={() => { setStep("upload"); setResumeText(""); }}
                className="mt-6 flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Analyze another resume
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </PageLayout>
  );
}