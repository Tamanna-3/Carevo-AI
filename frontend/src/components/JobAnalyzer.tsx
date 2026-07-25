import { useState } from "react";
import { analyzeJob } from "@/services/carevoAI.ts";


export function JobAnalyzer() {

    const [description,setDescription] = useState("");

    const [result,setResult] = useState<any>(null);

    const [loading,setLoading] = useState(false);



    async function handleAnalyze(){

        try{

            setLoading(true);

            const data = await analyzeJob(description);

            setResult(data);

        }
        catch(error){

            console.error(error);

        }
        finally{

            setLoading(false);

        }

    }



    return (

        <div className="glass rounded-[24px] p-6 mt-8">


            <h2 className="text-xl font-bold text-white mb-4">
                AI Job Analyzer
            </h2>


            <textarea

                value={description}

                onChange={(e)=>setDescription(e.target.value)}

                placeholder="Paste job description here..."

                className="w-full h-32 p-4 rounded-xl bg-black/30 text-white border border-white/10"

            />



            <button

                onClick={handleAnalyze}

                className="mt-4 px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold"

            >

                {loading ? "Analyzing..." : "Analyze Job"}

            </button>



            {
                result && (

                    <div className="mt-6 text-white">


                        <h3 className="font-bold">
                            Skills
                        </h3>

                        <p>
                            {result.skills.join(", ")}
                        </p>



                        <h3 className="font-bold mt-3">
                            Tasks
                        </h3>

                        <p>
                            {result.tasks.join(", ")}
                        </p>



                        <h3 className="font-bold mt-3">
                            Match Score
                        </h3>

                        <p>
                            {result.match_score}
                        </p>



                        <h3 className="font-bold mt-3">
                            Recommendations
                        </h3>

                        <p>
                            {result.recommendations.join(", ")}
                        </p>


                    </div>

                )
            }


        </div>

    );
}