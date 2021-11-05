import React, {useEffect} from 'react';
import {get} from "./api/Api";
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";

function App() {
  // useEffect(()=> {
  //   get("/getString").then(item => console.log(item))
  //   get("/setString", {string: "ui" }).then(item => console.log(item))
  // },[])


  return (
    <div className="App">
        <Button variant="contained">Hello</Button>
    </div>
  );
}


export default App;
