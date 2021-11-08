import {get} from "./Requests";
import {HashProcessToken} from "../App";

export function startHash(file: string): void{

     get("/start", {file: file}).then(
         token => {
            getResult(token)
         }
     )

}



export function getResult(token: HashProcessToken): void{

    get("/result", {id: token.token}).then(
        result => {
            console.log(result)
        }
    )

}