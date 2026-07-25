import {apiRequest} from "./api";


export function createJob(job:any){

    return apiRequest(
        "/jobs/",
        {
            method:"POST",
            body:JSON.stringify(job)
        }
    );

}



export function getJobs(){

    return apiRequest(
        "/jobs/"
    );

}



export function deleteJob(id:number){

    return apiRequest(
        `/jobs/${id}`,
        {
            method:"DELETE"
        }
    );

}