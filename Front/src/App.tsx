import React, {useState} from 'react';
import './styles/App.css'

function App() {


    const menu: MenuOption[] = [
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Entropy",
            link: "/entropy"
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
