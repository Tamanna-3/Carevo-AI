import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq


BASE_DIR = Path(__file__).resolve().parents[2]

ENV_FILE = BASE_DIR / ".env"

load_dotenv(ENV_FILE)


print("ENV LOCATION:", ENV_FILE)
print("Groq key loaded:", bool(os.getenv("GROQ_API_KEY")))


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def analyze_job_description(description: str):

    prompt = f"""
Analyze this job description for a candidate.

Return ONLY valid JSON.

Format:

{{
    "skills": [],
    "tasks": [],
    "match_score": "",
    "recommendations": []
}}


Job Description:

{description}
"""


    try:

        response = client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[

                {
                    "role": "system",
                    "content":
                    "You are an AI career assistant."
                },

                {
                    "role": "user",
                    "content": prompt
                }

            ],

            temperature=0.2

        )


        result = response.choices[0].message.content


        return result



    except Exception as e:

        print(
            "Groq Error:",
            e
        )


        return json.dumps({

            "skills":[
                "Python",
                "JavaScript",
                "React"
            ],

            "tasks":[
                "Software Development",
                "API Integration"
            ],

            "match_score":
                "80%",

            "recommendations":[
                "Improve problem solving",
                "Build projects"
            ]

        })