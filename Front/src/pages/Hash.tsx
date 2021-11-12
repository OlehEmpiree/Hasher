import React, {useState} from 'react';
import RemoteHashPanel from "../components/hashPanel/RemoteHashPanel";
import {Alert, Snackbar} from "@mui/material";

const Hash = () => {
    const [openSnackBar, setOpenSnackBar] = useState<boolean>()

    return (
        <div>
            <RemoteHashPanel onOpenSnackBar={setOpenSnackBar} />
            <Snackbar
                onClose={() => setOpenSnackBar(false)}
                open={openSnackBar}
                autoHideDuration={5000}>
                <Alert severity="error"> Файл не найден </Alert>
            </Snackbar>
        </div>
    );
};

export default Hash;