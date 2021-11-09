import React, {useState} from 'react';
import HashPanel from "./components/hashPanel/HashPanel";
import './styles/App.css'
import {Alert, Snackbar} from "@mui/material";
import {HashTask} from "./api/models/ApiObjects";
import useInterval from "./hooks/useInterval";
import {fetchAll, removeTask, startHash} from "./api/Api";




function App() {

    const [tasks, setTasks] = useState<HashTask[]>([])

    useInterval(()=>{

        fetchAll().then(fetchedTasks=> setTasks(fetchedTasks))
        console.log(tasks)
    }, 2000, [tasks.length])

    const [openSnackBar, setOpenSnackBar] = useState<boolean>()

    function handleRemoveTask(token: string): void {
        removeTask(token)
        setTasks(tasks.filter(task => task.Token.token !== token));
        setOpenSnackBar(true)
    }


    return (
        <div className="App">
            <HashPanel tasks={tasks} onRemoveTask={handleRemoveTask}/>

        </div>
    );
}


export default App;
