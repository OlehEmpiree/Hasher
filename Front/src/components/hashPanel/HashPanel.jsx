import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import HashLoader from "../loader/HashLoader";
import './animations.css'

const HashPanel = ({hashTasks, removeTask}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Задачи</h1>
            <TransitionGroup>
                {hashTasks.map((task, index) =>
                <CSSTransition
                    key={task.id}
                    timeout={500}
                    classNames="item">
                        <HashLoader task={task} index={index} remove={removeTask}/>
                 </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default HashPanel;