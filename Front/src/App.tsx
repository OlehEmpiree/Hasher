import React, {useState} from 'react';
import HashPanel from "./components/hashPanel/HashPanel";
import './styles/App.css'
import {Alert, Snackbar} from "@mui/material";
import {HashTask} from "./api/models/ApiObjects";
import useInterval from "./hooks/useInterval";
import {fetchAll, getFileExist, removeTask, startHash} from "./api/Api";
import AddHashButton from "./components/hashPanel/AddHashButton";


function App() {

    const [tasks, setTasks] = useState<HashTask[]>([])

    useInterval(() => {
        fetchAll().then(fetchedTasks => setTasks(fetchedTasks))
        console.log(tasks)
    }, 250)

    const [openSnackBar, setOpenSnackBar] = useState<boolean>()
    const [openModal, setOpenModal] = React.useState(false);

    function handleRemoveTask(token: string): void {
        removeTask(token)
    }

    async function startNewTask(filePath: string) {

        let isExist = await getFileExist(filePath)

        if (isExist)
            startHash(filePath)
        else
            setOpenSnackBar(true)

        setOpenModal(false)
    }


    return (
        <div className="App">
            <AddHashButton
                onStartNewTask={startNewTask}
                openModal={openModal}
                setOpen={setOpenModal}
            />
            <HashPanel
                tasks={tasks}
                onRemoveTask={handleRemoveTask}/>

            <Snackbar
                onClose={()=> setOpenSnackBar(false)}
                open={openSnackBar}
                autoHideDuration={5000}>
                <Alert severity="error"> Файл не найден </Alert>
            </Snackbar>

        </div>
    );
}


export default App;
