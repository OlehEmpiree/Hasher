import classes from "./HashLoader.module.css";
import {LinearProgress} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import {HashTask} from "../../api/models/ApiObjects";
import {makeStyles} from "@material-ui/core";
import styled from "styled-components";
import LinearProgressWithLabel from "../progress/LinearProgressWithLabel";

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

    return (
        <div className={classes.loader}>
            <div>
                <StyledP style={{fontWeight:"bold"}}>Путь к файлу:</StyledP>
                <StyledP>{task.Token.filePath}</StyledP>

                {!isDone &&
                <LinearProgressWithLabel
                    variant="determinate"
                    value={task.Progress}
                    className={classes.progress}/>
                }

                {task.Checksum && <StyledP>{task.HashType} hash: {task.Checksum} </StyledP>}
            </div>

            <Button variant="contained"
                    onClick={e => onRemove(task.Token.token)}
                    color={isDone ?'success': 'error'}
            >Close</Button>



        </div>
    );
};

export default HashLoader;