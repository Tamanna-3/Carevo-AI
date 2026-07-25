import {apiRequest} from "./api";


export function registerUser(data:any){

    return apiRequest(
        "/users/register",
        {
            method:"POST",
            body:JSON.stringify(data)
        }
    );
}



export function loginUser(data:any){

    return apiRequest(
        "/users/login",
        {
            method:"POST",
            body:JSON.stringify(data)
        }
    );
}