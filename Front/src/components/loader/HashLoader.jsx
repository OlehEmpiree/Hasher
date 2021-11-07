import React from 'react';
import {TransitionGroup} from "react-transition-group";
import {LinearProgress} from "@mui/material";
import classes from './HashLoader.module.css'
import Button from "@mui/material/Button";

const HashLoader = ({task, id, remove}) => {
    return (
        <div className={classes.loader}>
            <div>
                <p>Путь к файлу: {task.filePath}</p>
                <LinearProgress
                    variant="determinate"
                    value={task.progress}
                    className={classes.progress}  />
            </div>

            <Button variant="contained"
                    onClick={e => remove(task.filePath)}
                    color='error'
            >&times;</Button>

        </div>
    );
};

export default HashLoader;