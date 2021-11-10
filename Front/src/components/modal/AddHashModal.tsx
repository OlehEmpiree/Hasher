import React, {useState} from 'react';
import {Box, Button, ContainerProps, Input, Modal, ModalProps, StyledComponentProps, Typography} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign:'center'
} as SxProps<Theme>;

const inputStyle = {
    width: 600,
} as SxProps<Theme>

const buttonStyle= {
    marginTop: 5
} as SxProps<Theme>

interface Props extends  Pick<ModalProps, "open">{
    onStartNewTask: (fileName: string)=>void
    onClose: ()=>void

}

const AddHashModal = ({onStartNewTask, onClose,  ...rest}: Props) => {

    const [filePath, setFilePath] = useState<string>('')

    return (
        <Modal
            onBackdropClick={onClose}
            {...rest}>
            <Box sx={boxStyle}>
                <Typography variant={"h5"}>
                    Введите путь к файлу
                </Typography>
                <Input
                    sx={inputStyle}
                    value={filePath} onChange={(e) => {
                    setFilePath(e.target.value)
                }}/>
                <Button
                    sx={buttonStyle}
                 variant={"contained"}
                 onClick={() =>{
                     onStartNewTask(filePath)
                     setFilePath('')
                 }}
                >Начать</Button>
            </Box>
        </Modal>
    );
};

export default AddHashModal;