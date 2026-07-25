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