import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import './animations.css'
import HashLoader from "../loader/HashLoader";
import {HashTask} from "../../api/models/ApiObjects";
import {Typography} from "@mui/material";


export interface Props {
    tasks: HashTask[];
    onRemoveTask(token: string): void;
}

const HashPanel = ({tasks, onRemoveTask}: Props) => {

    return (
        <div>

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
                        <HashLoader task={task} onRemove={onRemoveTask}/>
                 </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default HashPanel;