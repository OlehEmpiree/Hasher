import React, {useMemo, useState} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import './animations.css'
import HashLoader from "../loader/HashLoader";
import {HashTask} from "../../api/models/ApiObjects";
import {Typography} from "@mui/material";
import AddHashButton from "./AddHashButton";
import useInterval from "../../hooks/useInterval";
import {fetchAll, getFileExist, removeTask, startHash} from "../../api/Api";


export interface Props {
    onOpenSnackBar(state: boolean): void
}

const RemoteHashPanel = ({onOpenSnackBar}: Props) => {

    useInterval(async () => {
        try {
            setTasks(await fetchAll())
        } catch (e) {
            setTasks([])
        }
    }, 1000)



    const [tasks, setTasks] = useState<HashTask[]>([])
    const [openModal, setOpenModal] = useState(false);

    async function startNewTask(filePath: string) {

        console.log("FilePath: " + filePath)

        let isExist = await getFileExist(filePath)

        if (isExist)
            startHash(filePath)
        else
            onOpenSnackBar(true)

        setOpenModal(false)
    }

    if (tasks === undefined)
        return (
            <div>
                <img src="https://media.minecraftforum.net/attachments/295/648/636883027239533729.PNG" alt="not found"/>
            </div>)

    return (
        <div>

            {tasks.length > 0 && <h1 style={{textAlign: 'center'}}>
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
                        <HashLoader task={task} onRemove={removeTask}/>
                    </CSSTransition>
                )}
            </TransitionGroup>

            <AddHashButton
                onStartNewTask={startNewTask}
                openModal={openModal}
                setOpen={setOpenModal}
            />
        </div>
    );
};

export default RemoteHashPanel;