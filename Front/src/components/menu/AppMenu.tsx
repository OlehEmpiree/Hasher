import React, {useState} from 'react';
import {AppBar, Drawer, IconButton, List, ListItemIcon, Toolbar, Typography} from "@mui/material";
import {Box} from '@material-ui/core';
import MenuItem from "./menuItem/MenuItem";
import AppNavigation from "../navigation/AppNavigation";

export interface MenuOption {
    name: string
    link: string
}


interface Props {
    menuList: MenuOption[]
    menuOpen: boolean
    onMenuOpen: (state: boolean) => void
}

const AppMenu = ({menuList, menuOpen, onMenuOpen}: Props) => {

    const [currentPage, setCurrentPage] = useState<MenuOption>()

    const menubar = () => (
        <Box
            sx={{width: 250}}
            role="presentation">
            <List>
                {menuList.map((option, index) =>
                    <MenuItem
                        isOpen={currentPage === option}
                        item={option}
                        onClick={() => setCurrentPage(option)}
                    />)}
            </List>
        </Box>
    );

    return (
        <div>
            <AppNavigation>
                <Drawer
                    anchor='left'
                    open={menuOpen}
                    variant={"permanent"}
                    onClose={() => onMenuOpen(false)}>
                    {menubar()}
                </Drawer>
            </AppNavigation>
        </div>
    );
};

export default AppMenu;