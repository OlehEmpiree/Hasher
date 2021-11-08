import React, {useEffect, useState} from 'react';
import {get} from "./api/Requests";
import HashPanel from "./components/hashPanel/HashPanel";
import './styles/App.css'
import {HashType} from "./common/enums";
import {Alert, Snackbar} from "@mui/material";
import {getResult, startHash} from "./api/Api";


export interface HashTask {
    HashProcess: HashProcessToken
    HashType: HashType,
    Hash: string,
    Progress: number
}

export interface HashProcessToken {
    filePath: string,
    token: string,
}


function App() {
    useEffect(()=> {
        startHash("C:\\Users\\Atolanin\\Desktop\\git hub pass.txt")
    },[])

    const [tasks, setTasks] = useState<HashTask[]>([])

    const [openSnackBar, setOpenSnackBar] = useState<boolean>()

    function removeTask(token: string): void {
        setTasks(tasks.filter(task => task.HashProcess.token !== token));
        setOpenSnackBar(true)
    }



    return (
        <div className="App">
            <HashPanel hashTasks={tasks} removeTask={removeTask}/>

            <Snackbar
                open={openSnackBar}
                onClose={() => setOpenSnackBar(false)}
                autoHideDuration={5000}>

                <Alert severity="success"> Hash is done! </Alert>
            </Snackbar>

        </div>
    );
}


export default App;
