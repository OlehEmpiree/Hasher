import React from 'react';
import {Button} from "@mui/material";
import AddHashModal from "../modal/AddHashModal";

interface Props {
    onStartNewTask: (fileName: string) => void
    openModal: boolean
    setOpen: (open: boolean) => void;
}


const AddHashButton = ({onStartNewTask, openModal, setOpen}: Props) => {
    return (
        <div>
            <Button
                style={{marginTop: 15}}
                variant={"contained"}
                onClick={() => setOpen(true)}>Start Hash</Button>
            <AddHashModal open={openModal}
                          onStartNewTask={onStartNewTask}
                          onClose={() => setOpen(false)}
            />
        </div>
    );
};

export default AddHashButton;