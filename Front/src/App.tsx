import React, {useState} from 'react';
import HashPanel from "./components/hashPanel/HashPanel";
import './styles/App.css'
import {Alert, Snackbar} from "@mui/material";
import {HashTask} from "./api/models/ApiObjects";


function App() {

    const [tasks, setTasks] = useState<HashTask[]>([])
    const [openSnackBar, setOpenSnackBar] = useState<boolean>()

    return (
        <div className="App">

            <HashPanel
                tasks={tasks}
                setTasks={setTasks}
                setOpenSnackBar={setOpenSnackBar}
                />

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
