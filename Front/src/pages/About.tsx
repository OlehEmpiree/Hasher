import React from 'react';
import {Typography} from "@mui/material";
import styled from "styled-components";


const StyledDiv = styled.div`
  margin-top: 10px;
`;

const About = () => {
    return (
        <StyledDiv>
            <Typography variant={"h4"}>
                About React
            </Typography>
            <div>

                <img src="https://habrastorage.org/webt/z1/bu/fm/z1bufmx1tce1wxwjm92w7wz_7lq.png" alt="Тут должна была подтянуться картинка"/>

                <StyledDiv>
                    <Typography variant={"h6"}>
                        Declarative
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        React makes it painless to create interactive UIs. Design simple views for each state in your
                        application, and React will efficiently update and render just the right components when your
                        data
                        changes.
                    </Typography>
                </StyledDiv>

                <StyledDiv>
                    <Typography variant={"h6"}>
                        Component-Based
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        Build encapsulated components that manage their own state, then compose them to make complex
                        UIs.
                    </Typography>
                </StyledDiv>
                <StyledDiv>
                    <Typography variant={"h6"}>
                        Learn Once, Write Anywhere
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        We don’t make assumptions about the rest of your technology stack, so you can develop new
                        features
                        in React without rewriting existing code.
                    </Typography>
                </StyledDiv>
            </div>
        </StyledDiv>
    );
};

export default About;