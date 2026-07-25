import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Sparkles, X, ChevronRight, MoreHorizontal,
  Building2, MapPin, DollarSign, Calendar, StickyNote,
  ExternalLink, Trash2, Check, Search, LayoutGrid, List,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";

type Status = "Saved" | "Applied" | "Interview" | "Offer" | "Rejected";

interface Job {
  id:       string;
  company:  string;
  role:     string;
  location: string;
  salary:   string;
  status:   Status;
  date:     string;
  notes:    string;
  url:      string;
  tags:     string[];
}

const STATUS_COLORS: Record<Status, string> = {
  Saved:     "bg-white/10       text-white/60    border-white/10",
  Applied:   "bg-blue-500/15    text-blue-300    border-blue-500/25",
  Interview: "bg-purple-500/15  text-purple-300  border-purple-500/25",
  Offer:     "bg-green-500/15   text-green-300   border-green-500/25",
  Rejected:  "bg-red-500/15     text-red-300     border-red-500/25",
};

const STATUSES: Status[] = ["Saved", "Applied", "Interview", "Offer", "Rejected"];

const INITIAL_JOBS: Job[] = [
  {
    id: "1", company: "Google", role: "Frontend Developer",
    location: "Mountain View, CA", salary: "$140k–$180k", status: "Applied",
    date: "2025-07-18", notes: "Applied via LinkedIn. Heard back in 2 days.",
    url: "", tags: ["React", "TypeScript"],
  },
  {
    id: "2", company: "Amazon", role: "AI Engineer Intern",
    location: "Seattle, WA", salary: "$8,000/mo", status: "Interview",
    date: "2025-07-15", notes: "Phone screen done. Loop scheduled for next week.",
    url: "", tags: ["Python", "ML"],
  },
  {
    id: "3", company: "Microsoft", role: "Software Engineer Intern",
    location: "Redmond, WA", salary: "$7,500/mo", status: "Rejected",
    date: "2025-07-10", notes: "OA passed but rejected after HR round.",
    url: "", tags: ["C++", "System Design"],
  },
  {
    id: "4", company: "Stripe", role: "Full Stack Engineer",
    location: "Remote", salary: "$160k–$200k", status: "Saved",
    date: "2025-07-20", notes: "", url: "", tags: ["Node.js", "React"],
  },
];

function parseJobFromText(text: string): Partial<Job> {
  const companyMatch  = text.match(/(?:company|at|@)\s*[:\-]?\s*([A-Z][a-zA-Z\s&.]+)/i);
  const roleMatch     = text.match(/(?:role|position|title|job)\s*[:\-]?\s*([A-Za-z\s]+Engineer|[A-Za-z\s]+Developer|[A-Za-z\s]+Intern|[A-Za-z\s]+Analyst|[A-Za-z\s]+Designer)/i)
                     || text.match(/^([A-Za-z\s]+(?:Engineer|Developer|Intern|Analyst|Designer|Manager))/im);
  const locationMatch = text.match(/(?:location|based in|in)\s*[:\-]?\s*([A-Za-z\s,]+(?:CA|NY|WA|TX|Remote|New York|San Francisco|Seattle|Austin))/i)
                     || text.match(/(Remote|San Francisco|New York|Seattle|Austin|London|Bangalore)/i);
  const salaryMatch   = text.match(/\$[\d,k\-\s]+(?:\/(?:yr|year|mo|month|hour|hr))?/i);
  const urlMatch      = text.match(/https?:\/\/[^\s]+/);

  return {
    company:  companyMatch?.[1]?.trim()  || "",
    role:     roleMatch?.[1]?.trim()     || "",
    location: locationMatch?.[1]?.trim() || "",
    salary:   salaryMatch?.[0]?.trim()   || "",
    url:      urlMatch?.[0]              || "",
  };
}

// ── Inline-editable cell ──────────────────────────────────────────────────
function EditableCell({
  value, onChange, placeholder, className = "",
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(value);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);

  function commit() { setEditing(false); onChange(draft); }

  if (editing) {
    return (
      <input
        ref={ref}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter")  commit();
          if (e.key === "Escape") { setDraft(value); setEditing(false); }
        }}
        className={`bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm text-white outline-none w-full ${className}`}
      />
    );
  }

  return (
    <span
      onClick={() => { setDraft(value); setEditing(true); }}
      className={`cursor-text hover:bg-white/5 rounded px-1 py-0.5 transition-colors ${value ? "text-white/80" : "text-white/25 italic"} ${className}`}
    >
      {value || placeholder || "—"}
    </span>
  );
}

// ── Status badge with dropdown ────────────────────────────────────────────
function StatusBadge({ status, onChange }: { status: Status; onChange: (s: Status) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${STATUS_COLORS[status]}`}
      >
        {status}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            className="absolute top-8 left-0 z-50 rounded-xl overflow-hidden p-1 min-w-[130px]"
            style={{
              background: "rgba(13,15,26,0.97)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            }}
          >
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => { onChange(s); setOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left"
              >
                <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[s]}`}>{s}</span>
                {s === status && <Check className="w-3.5 h-3.5 text-cyan-400 ml-auto" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export function JobAnalyzer() {
  const [jobs,         setJobs]         = useState<Job[]>(INITIAL_JOBS);
  const [showPaste,    setShowPaste]    = useState(false);
  const [pasteText,    setPasteText]    = useState("");
  const [parsing,      setParsing]      = useState(false);
  const [search,       setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");
  const [view,         setView]         = useState<"table" | "board">("table");
  const [expandedId,   setExpandedId]   = useState<string | null>(null);
  const [openMenu,     setOpenMenu]     = useState<string | null>(null);

  function updateJob(id: string, field: keyof Job, value: string) {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, [field]: value } : j)));
  }

  function deleteJob(id: string) {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setOpenMenu(null);
  }

  function addBlankJob() {
    const id = Date.now().toString();
    setJobs((prev) => [
      {
        id, company: "", role: "", location: "", salary: "",
        status: "Saved", date: new Date().toISOString().slice(0, 10),
        notes: "", url: "", tags: [],
      },
      ...prev,
    ]);
    setExpandedId(id);
  }

async function parseAndAdd() {
  if (!pasteText.trim()) return;

  setParsing(true);

  try {
    const response = await fetch(
      "https://jaz234.app.n8n.cloud/webhook/carevo/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription: pasteText,
          company: "",
          jobTitle: "",
        }),
      }
    );

    const result = await response.json();

    const id = Date.now().toString();

    setJobs((prev) => [
      {
        id,
        company: result.company || "Unknown Company",
        role: result.role || "Unknown Role",
        location: "",
        salary: "",
        status: "Saved",
        date: new Date().toISOString().slice(0, 10),
        notes: result.recommendation || "",
        url: "",
        tags: result.skills
          ? result.skills.split(",").map((s: string) => s.trim())
          : [],
      },
      ...prev,
    ]);

    setPasteText("");
    setShowPaste(false);

  } catch (err) {
    console.error(err);
    alert("Failed to analyze job.");
  }

  setParsing(false);
}

  const filtered = jobs.filter((j) => {
    const matchSearch = !search || [j.company, j.role, j.location].some((f) =>
      f.toLowerCase().includes(search.toLowerCase()),
    );
    const matchStatus = filterStatus === "All" || j.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const byStatus = STATUSES.reduce<Record<Status, Job[]>>((acc, s) => {
    acc[s] = filtered.filter((j) => j.status === s);
    return acc;
  }, {} as Record<Status, Job[]>);

  const counts = STATUSES.reduce<Record<Status, number>>((acc, s) => {
    acc[s] = jobs.filter((j) => j.status === s).length;
    return acc;
  }, {} as Record<Status, number>);

  return (
    <PageLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
              <span>Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/70">Job Analyzer</span>
            </div>
            <h1 className="text-3xl font-black text-white">Job Tracker</h1>
            <p className="text-white/50 mt-1">Your personal job application workspace. Paste a listing to auto-add.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPaste(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-white/80 hover:text-white text-sm font-medium transition-all hover:border-purple-500/50"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" /> Paste Job Listing
            </button>
            <button
              onClick={addBlankJob}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" /> Add Job
            </button>
          </div>
        </div>

        {/* ── Status filter pills ── */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {(["All", ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-sm px-3.5 py-1.5 rounded-full border transition-all font-medium ${
                filterStatus === s
                  ? "bg-white/10 text-white border-white/20"
                  : "border-white/10 text-white/40 hover:text-white/70"
              }`}
            >
              {s}{s !== "All" && <span className="ml-1 text-xs text-white/30">{counts[s as Status]}</span>}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setView("table")}
              className={`p-2 rounded-lg transition-colors ${view === "table" ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("board")}
              className={`p-2 rounded-lg transition-colors ${view === "board" ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="relative mb-5">
          <Search className="w-4 h-4 text-white/30 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies, roles, locations..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all"
          />
        </div>

        {/* ── Paste modal ── */}
        <AnimatePresence>
          {showPaste && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
              onClick={(e) => { if (e.target === e.currentTarget) setShowPaste(false); }}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-xl rounded-[28px] p-6 flex flex-col gap-4"
                style={{
                  background: "rgba(13,15,26,0.98)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-white font-bold text-lg">Paste Job Listing</h3>
                  </div>
                  <button
                    onClick={() => setShowPaste(false)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-white/40 text-sm">
                  Paste any job description, LinkedIn post, or email — Carevo will auto-extract the details.
                </p>

                <textarea
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  placeholder="Paste the full job listing text here..."
                  className="min-h-[180px] bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-sm text-white/80 placeholder:text-white/25 resize-none focus:outline-none focus:border-cyan-500/40 transition-all"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPaste(false)}
                    className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={parseAndAdd}
                    disabled={!pasteText.trim() || parsing}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {parsing ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                        />
                        Parsing...
                      </>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Auto-Parse & Add</>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ════════════════════════════════════════
            TABLE VIEW
        ════════════════════════════════════════ */}
        {view === "table" && (
          <div className="rounded-[24px] overflow-hidden border border-white/10">

            {/* Column headers */}
            <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1.2fr_1fr_40px] px-5 py-3 bg-white/[0.02] border-b border-white/[0.06] text-xs font-semibold uppercase tracking-wider text-white/30">
              <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> Company</span>
              <span>Role</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Location</span>
              <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Salary</span>
              <span>Status</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Date</span>
              <span />
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="py-16 flex flex-col items-center gap-3 text-white/30">
                <Building2 className="w-10 h-10 opacity-30" />
                <p className="text-sm">No jobs yet. Add one above.</p>
              </div>
            )}

            {/* Rows */}
            {filtered.map((job, i) => (
              <div key={job.id}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1.2fr_1fr_40px] px-5 py-3.5 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors items-center group"
                >
                  <EditableCell value={job.company}  onChange={(v) => updateJob(job.id, "company",  v)} placeholder="Company name" className="font-semibold" />
                  <EditableCell value={job.role}     onChange={(v) => updateJob(job.id, "role",     v)} placeholder="Job title" />
                  <EditableCell value={job.location} onChange={(v) => updateJob(job.id, "location", v)} placeholder="Location" />
                  <EditableCell value={job.salary}   onChange={(v) => updateJob(job.id, "salary",   v)} placeholder="Salary range" />
                  <StatusBadge status={job.status}   onChange={(v) => updateJob(job.id, "status",   v)} />
                  <EditableCell value={job.date}     onChange={(v) => updateJob(job.id, "date",     v)} />

                  {/* Row menu */}
                  <div className="relative flex items-center justify-end">
                    <button
                      onClick={() => setOpenMenu(openMenu === job.id ? null : job.id)}
                      className="w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {openMenu === job.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-0 top-8 z-50 rounded-xl overflow-hidden p-1 w-40"
                          style={{
                            background: "rgba(13,15,26,0.97)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                          }}
                        >
                          <button
                            onClick={() => { setExpandedId(expandedId === job.id ? null : job.id); setOpenMenu(null); }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-white/70 hover:text-white text-sm transition-colors"
                          >
                            <StickyNote className="w-3.5 h-3.5" /> Notes
                          </button>
                          {job.url && (
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-white/70 hover:text-white text-sm transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> Open link
                            </a>
                          )}
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400 text-sm transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Expanded notes row */}
                <AnimatePresence>
                  {expandedId === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-b border-white/[0.04]"
                    >
                      <div className="px-5 py-3 bg-white/[0.02]">
                        <div className="flex items-center gap-2 mb-2">
                          <StickyNote className="w-3.5 h-3.5 text-purple-400" />
                          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Notes</span>
                        </div>
                        <textarea
                          value={job.notes}
                          onChange={(e) => updateJob(job.id, "notes", e.target.value)}
                          placeholder="Add notes about this application..."
                          className="w-full min-h-[80px] bg-transparent text-sm text-white/70 placeholder:text-white/25 resize-none focus:outline-none leading-relaxed"
                        />
                        <div className="mt-2">
                          <span className="text-xs text-white/30 mb-1.5 block">URL</span>
                          <input
                            value={job.url}
                            onChange={(e) => updateJob(job.id, "url", e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/60 focus:outline-none focus:border-white/20 transition-all"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {/* ════════════════════════════════════════
            BOARD VIEW
        ════════════════════════════════════════ */}
        {view === "board" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2 min-h-[400px]">
            {STATUSES.map((status) => (
              <div key={status} className="flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_COLORS[status]}`}>
                    {status}
                  </span>
                  <span className="text-xs text-white/30 ml-auto">{byStatus[status].length}</span>
                </div>

                {byStatus[status].map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    className="rounded-[16px] bg-white/[0.03] border border-white/10 p-3.5 flex flex-col gap-2 hover:bg-white/[0.05] transition-colors cursor-default group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-white font-semibold text-sm leading-tight">{job.company || "—"}</p>
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-red-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-white/50 text-xs">{job.role || "—"}</p>
                    {job.location && (
                      <div className="flex items-center gap-1 text-white/30 text-xs">
                        <MapPin className="w-3 h-3" />{job.location}
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center gap-1 text-cyan-400/70 text-xs">
                        <DollarSign className="w-3 h-3" />{job.salary}
                      </div>
                    )}
                  </motion.div>
                ))}

                <button
                  onClick={addBlankJob}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-white/10 text-white/25 hover:text-white/50 hover:border-white/20 text-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            ))}
          </div>
        )}

      </motion.div>
    </PageLayout>
  );
}