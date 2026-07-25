import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { AIAssistant } from "@/components/AIAssistant";
import { RecentApplications } from "@/components/RecentApplications";
import { CareerChart } from "@/components/CareerChart";
import { SkillsPanel } from "@/components/SkillsPanel";
import { QuickActions } from "@/components/QuickActions";
import { useEffect, useState } from "react";
import { getJobs } from "@/api/jobService";
import { JobAnalyzer } from "@/components/JobAnalyzer";


console.log("Dashboard loaded");
export function Dashboard() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {

    async function loadJobs() {

      try {

        const data = await getJobs();

        setJobs(data);

        console.log("Jobs loaded:", data);

      } catch (error) {

        console.error("Failed to load jobs:", error);

      }

    }

    loadJobs();

  }, []);
  return (
    <div className="min-h-screen bg-[#0a0b0f] flex text-foreground selection:bg-cyan-500/30 selection:text-white overflow-hidden relative">
      <div className="fixed top-0 left-[260px] w-full h-[500px] bg-gradient-to-b from-purple-900/10 via-background to-background pointer-events-none z-0" />
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <Sidebar />
      <main className="flex-1 ml-[260px] h-screen overflow-y-auto overflow-x-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <Header />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
            <StatCard title="Career Score"       value="78%"      subtitle="+8% this week" accent="purple" delay={0.1} />
            <StatCard title="Resume ATS Score"   value="86/100"   subtitle="Excellent"     accent="cyan"   delay={0.2} />
            <StatCard title="AI Readiness Score" value="82%"      subtitle="Improving"     accent="blue"   delay={0.3} />
            <StatCard title="Job Matches"        value="12 Found" subtitle="3 new today"   accent="pink"   delay={0.4} />
          </div>
          <AIAssistant />
          <JobAnalyzer />
          <RecentApplications />


<div className="mt-8">

  <h2 className="text-xl font-bold text-white mb-4">
    Latest Jobs
  </h2>


  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


    {jobs.map((job) => (

      <div
        key={job.id}
        className="glass rounded-[24px] p-5 hover:bg-white/10 transition"
      >


        <div className="flex justify-between items-start mb-3">


          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold">

            {job.company?.charAt(0) || "?"}

          </div>


          <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">

            {job.status || "Saved"}

          </span>


        </div>


        <h3 className="text-lg font-bold text-white">

          {job.company}

        </h3>


        <p className="text-white/60 mt-1">

          {job.role}

        </p>


        <p className="text-sm text-white/40 mt-3 line-clamp-2">

          {job.description}

        </p>


        {job.deadline && (

          <p className="text-xs text-yellow-400 mt-3">

            Deadline: {job.deadline}

          </p>

        )}


      </div>

    ))}


  </div>


</div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2"><CareerChart /></div>
            <div className="lg:col-span-1"><SkillsPanel /></div>
          </div>
          <QuickActions />
        </div>
      </main>
    </div>
  );
}