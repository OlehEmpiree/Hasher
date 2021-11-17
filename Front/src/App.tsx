import React, {useState} from 'react';
import './styles/App.css'
import AppMenu, {MenuOption} from "./components/menu/AppMenu";

function App() {


    const menu: MenuOption[] = [
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Hash",
            link: "/hash"
        }
    ]

    const [menuOpen, setMenuOpen] = useState(true)


    return (
        <div className="App">

            <AppMenu menuList={menu} menuOpen={menuOpen} onMenuOpen={setMenuOpen}/>

        </div>
    );

}


export default App;
