import React from 'react';
import {Link} from "react-router-dom";
import {ListItem, ListItemText, Typography} from "@mui/material";
import {MenuOption} from "../AppMenu";


export interface Props {
    item: MenuOption
}

const MenuItem = ({item}: Props) => {
    return (
        <Link to={item.link}>
            <ListItem button key={item.name}>
                <ListItemText>
                    <Typography variant={"button"}>
                        {item.name}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Link>
    );
};

export default MenuItem;