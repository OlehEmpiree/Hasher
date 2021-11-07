import React, {useEffect, useState} from 'react';
import {get} from "./api/Requests";
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import HashPanel from "./components/hashPanel/HashPanel";
import HashLoader from "./components/loader/HashLoader";
import './styles/App.css'
import {HashType} from "./common/enums";

function App() {
  // useEffect(()=> {
  //   get("/getString").then(item => console.log(item))
  //   get("/setString", {string: "ui" }).then(item => console.log(item))
  // },[])

  const [tasks, setTasks] = useState([
      {id: 0, filePath: '1.png', progress:50, hashType:HashType.MD5 },
      {id: 1, filePath: '2.png', progress:25, hashType:HashType.MD5 },
      {id: 2, filePath: '3.png', progress:0, hashType:HashType.MD5 },
  ])

  function removeTask(filePath: String):void {
      setTasks(tasks.filter(item => item.filePath !== filePath));
  }

  return (
    <div className="App">
        <HashPanel hashTasks={tasks} removeTask={removeTask} />
    </div>
  );
}


export default App;
