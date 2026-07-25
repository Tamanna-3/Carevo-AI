const N8N_URL =
  "https://jaz234.app.n8n.cloud/webhook/carevo/analyze";

export async function analyzeJob(description: string) {

  const response = await fetch(N8N_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company: "Unknown",
      jobTitle: "Job Analysis",
      jobDescription: description,
    }),
  });


  if (!response.ok) {
    throw new Error("AI analysis failed");
  }


  return await response.json();
}

const CAREER_AI_URL =
  "https://jaz234.app.n8n.cloud/webhook/carevo/chat";


export async function askCareerAI(message: string) {

  const response = await fetch(CAREER_AI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });


  if (!response.ok) {
    throw new Error("Career AI failed");
  }


  return await response.json();
}