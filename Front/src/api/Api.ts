import {get} from "./Requests";
import {HashProcessToken, HashTask} from "./models/ApiObjects";

export function startHash(file: string): Promise<HashProcessToken>{
    return get("/start", {file: file})
}

export function fetchAll(): Promise<HashTask[]>{
    return get("/getAll");
}

export function removeTask(token: string){
    return get("/remove", {token: token})
}