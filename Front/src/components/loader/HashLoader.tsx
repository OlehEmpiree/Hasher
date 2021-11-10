import classes from "./HashLoader.module.css";
import Button from "@mui/material/Button";
import React from "react";
import {HashTask} from "../../api/models/ApiObjects";
import styled from "styled-components";
import LinearProgressWithLabel from "../progress/LinearProgressWithLabel";
import {Typography} from "@material-ui/core";
import '@fontsource/roboto/500.css';

interface Props {
    task: HashTask;

    onRemove(token: string): void;
}

const StyledP = styled.p`
  margin-top: 5px;
`;


// const useStyles = makeStyles(t => ({
//     margined:{
//         marginTop: 5
//     }
//
// }));


const HashLoader = ({task, onRemove}: Props) => {

    //   const styles = useStyles()
    const isDone = task.Progress === 100
    const rootClasses = [classes.loader]
    if(isDone)
        rootClasses.push(classes.loader_done)
    else
        rootClasses.push(classes.loader_inProgress)


    return (
        <div className={rootClasses.join(' ')}>

            <div>
                <StyledP style={{fontWeight: "bold"}}>
                    Путь к файлу:
                </StyledP>
                <StyledP>
                    <Typography variant="subtitle1">{task.Token.filePath}</Typography>
                </StyledP>

                {!isDone &&
                <LinearProgressWithLabel
                    variant="determinate"
                    value={task.Progress}
                    className={classes.progress}/>
                }

                {task.Checksum &&
                <StyledP>
                    <Typography variant={"subtitle1"}>
                        {task.HashType} hash: {task.Checksum}
                    </Typography>
                </StyledP>}
            </div>

            <Button variant="contained"
                    onClick={e => onRemove(task.Token.token)}
                    color={isDone ? 'success' : 'primary'}
            >{isDone ? 'Закрыть' : 'Завершить'}</Button>


        </div>
    );
};

export default HashLoader;