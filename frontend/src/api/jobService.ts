import API from "./api";

export async function getJobs() {

    const response = await fetch(`${API}/jobs/`);

    if (!response.ok) {
        throw new Error("Failed to fetch jobs");
    }

    return response.json();
}
export async function createJob(data:any){

    const response = await fetch(`${API}/jobs/`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    });

    if (!response.ok) {
        throw new Error("Failed to create job");
    }

    return response.json();
}