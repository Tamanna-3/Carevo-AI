import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0b0f] flex text-foreground selection:bg-cyan-500/30 selection:text-white overflow-hidden relative">
      <div className="fixed top-0 left-[260px] w-full h-[500px] bg-gradient-to-b from-purple-900/10 via-background to-background pointer-events-none z-0" />
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <Sidebar />
      <main className="flex-1 ml-[260px] h-screen overflow-y-auto overflow-x-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-10">{children}</div>
      </main>
    </div>
  );
}