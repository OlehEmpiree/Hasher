import {get} from "./Requests";

export function sendFilePath(): void{


}



export function updateProgressById(id: number): void{

    get("api/getResult").then(item => console.log(item))

}