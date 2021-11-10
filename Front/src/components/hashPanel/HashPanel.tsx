import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import './animations.css'
import HashLoader from "../loader/HashLoader";
import {HashTask} from "../../api/models/ApiObjects";
import {Typography} from "@mui/material";
import AddHashButton from "./AddHashButton";
import useInterval from "../../hooks/useInterval";
import {fetchAll, getFileExist, removeTask, startHash} from "../../api/Api";


export interface Props {
    tasks: HashTask[];
    setTasks: (tasks: HashTask[]) => void
    setOpenSnackBar: (state: boolean) => void
}

const HashPanel = ({tasks, setTasks, setOpenSnackBar}: Props) => {


    useInterval(() => {
        try{
            fetchAll().then(fetchedTasks => setTasks(fetchedTasks))
        }
        catch (e) {
            setTasks([])
        }
    }, 250)


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

    if(tasks === undefined)
        return (<div/>)

    return (
        <div>

            <AddHashButton
                onStartNewTask={startNewTask}
                openModal={openModal}
                setOpen={setOpenModal}
            />

            {tasks.length>0 && <h1 style={{textAlign: 'center'}}>
                <Typography variant={"h4"}>
                    Хэш-лист
                </Typography>
            </h1>}

            <TransitionGroup>
                {tasks.map((task, index) =>
                <CSSTransition
                    key={task.Token.token}
                    timeout={500}
                    classNames="item">
                        <HashLoader task={task} onRemove={handleRemoveTask}/>
                 </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default HashPanel;