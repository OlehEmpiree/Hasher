import React from 'react';
import {BrowserRouter, BrowserRouterProps, Route, Routes} from "react-router-dom";
import About from "../../pages/About";
import Entropy from "../../pages/Entropy";
import Hash from "../../pages/Hash";

// TODO Передавать массив route
const AppNavigation = (props: BrowserRouterProps) => {
    return (
        <BrowserRouter {...props}>
            <Routes>
                <Route path="/about" element={<About/>}/>
                <Route path="/entropy" element={<Entropy/>}/>
                <Route path="/hash" element={<Hash/>}/>
            </Routes>

            {props.children}
        </BrowserRouter>
    );
};

export default AppNavigation;