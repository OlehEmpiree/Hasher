import {Alert, Snackbar} from "@mui/material";
import React from "react";
import {SnackbarProps} from "@mui/material/Snackbar/Snackbar";


interface Props extends SnackbarProps {

}

export default function HashSnackbar(props: SnackbarProps) {



    return(<Snackbar
        {...props}
        autoHideDuration={5000}>

        <Alert severity="success"> Hash is done! </Alert>
    </Snackbar>)
}

