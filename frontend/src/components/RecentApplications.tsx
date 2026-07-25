import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


const statusColors: Record<string, string> = {
  Applied:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",

  Interview:
    "bg-green-500/10 text-green-400 border-green-500/20",

  Rejected:
    "bg-red-500/10 text-red-400 border-red-500/20",

  Analyzed:
    "bg-purple-500/10 text-purple-400 border-purple-500/20",

  Shortlisted:
    "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",

  Saved:
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

export function RecentApplications() {

  const [applications, setApplications] = useState<any[]>([]);


  useEffect(() => {

    async function fetchApplications() {

      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);


      if (error) {
        console.error("Supabase Error:", error);
        return;
      }


      setApplications(data || []);

    }


    fetchApplications();

  }, []);



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-8"
    >

      <div className="flex items-center justify-between mb-6">

        <h3 className="text-xl font-bold text-white">
          Recent Applications
        </h3>


        <Link href="/jobs">

          <span className="text-sm font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors">

            View All 
            <ArrowRight className="w-4 h-4" />

          </span>

        </Link>

      </div>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        {applications.map((app, i) => (

          <motion.div
            key={app.id || i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.4 + i * 0.1
            }}

            className="glass rounded-[24px] p-5 hover:bg-white/10 transition-colors group cursor-pointer"
          >


            <div className="flex items-start justify-between mb-4">


              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl bg-purple-600 shadow-lg">

                {app.company?.charAt(0) || "?"}

              </div>



              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  statusColors[app.status] ||
                  "bg-white/10 text-white border-white/20"
                }`}
              >

                {app.status || "Applied"}

              </div>


            </div>



            <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">

              {app.company || "Unknown Company"}

            </h4>



            <p className="text-sm text-white/60 mb-4">

              {app.role || "Job Role"}

            </p>



            <div className="flex items-center gap-1.5 text-xs text-white/40 font-medium">

              <Clock className="w-3.5 h-3.5" />

              {
                app.created_at
                  ? new Date(app.created_at).toLocaleDateString()
                  : "Recently added"
              }

            </div>


          </motion.div>

        ))}


      </div>


    </motion.div>
  );
}
