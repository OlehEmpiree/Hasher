import React from 'react';
import {Link} from "react-router-dom";
import {ListItem, ListItemText, Typography} from "@mui/material";
import {MenuOption} from "../AppMenu";
import classes from "./MenuItem.module.css"


export interface Props {
    item: MenuOption
    isOpen: boolean
    onClick: () => void
}

const MenuItem = ({item, onClick, isOpen}: Props) => {

    let openedClass: string = '';

    if(isOpen)
        openedClass = classes.menuItem_open

    return (
        <div className={openedClass} onClick={onClick}>
            <Link to={item.link}>
                <ListItem button key={item.name}>
                    <ListItemText>
                        <Typography variant={"button"}>
                            {item.name}
                        </Typography>
                    </ListItemText>
                </ListItem>
            </Link>
        </div>
    );
};

export default MenuItem;