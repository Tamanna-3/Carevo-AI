import API from "./api";


export async function analyzeJob(description:string){

    const response = await fetch(
        `${API}/jobs/analyze`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                description
            })
        }
    );


    return response.json();
}