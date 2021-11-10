import React from 'react';
import {Box, LinearProgress, Typography} from "@material-ui/core";
import styled from "styled-components";


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 35,
    borderRadius: 5,
}));


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <BorderLinearProgress color="primary" variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default LinearProgressWithLabel;