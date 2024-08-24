import React, { useState, useEffect } from 'react';
import { IconButton, Drawer, Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip } from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";

export function SidebarDefault() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const toggleDrawer = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = (path) => {
        navigate(path);
    }

    const sidebarContent = (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <List>
                <ListItem>
                    <Link to={"/config"} className="flex">
                        <ListItemPrefix>
                            {/*<PresentationChartBarIcon className="h-5 w-5" />*/}
                            1
                        </ListItemPrefix>
                    Dashboard
                    </Link>
                </ListItem>
                {/*<ListItem>*/}
                {/*    <ListItemPrefix>*/}
                {/*        <InboxIcon className="h-5 w-5" />*/}
                {/*    </ListItemPrefix>*/}
                {/*    Cotações*/}
                {/*    <ListItemSuffix>*/}
                {/*        <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />*/}
                {/*    </ListItemSuffix>*/}
                {/*</ListItem>*/}
                {/*<ListItem>*/}
                {/*    <ListItemPrefix>*/}
                {/*        <ShoppingBagIcon className="h-5 w-5" />*/}
                {/*    </ListItemPrefix>*/}
                {/*    Produtos*/}
                {/*</ListItem>*/}
                {/*<ListItem>*/}
                {/*    <ListItemPrefix>*/}
                {/*        <UserCircleIcon className="h-5 w-5" />*/}
                {/*    </ListItemPrefix>*/}
                {/*    Fornecedores*/}
                {/*</ListItem>*/}
                {/*<ListItem>*/}
                {/*    <ListItemPrefix>*/}
                {/*        <UserCircleIcon className="h-5 w-5" />*/}
                {/*    </ListItemPrefix>*/}
                {/*    Contatos*/}
                {/*</ListItem>*/}
                <ListItem>
                    <Link to={"/config"} className="flex">
                        <ListItemPrefix>
                            {/*<Cog6ToothIcon className="h-5 w-5" />*/}
                            2
                        </ListItemPrefix>
                        Configurações
                    </Link>
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        {/*<PowerIcon className="h-5 w-5" />*/}
                        3
                    </ListItemPrefix>
                    Sair
                </ListItem>
            </List>
        </Card>
    );

    return (
        <div>
            {isMobile && (
                <IconButton
                    className="m-4"
                    onClick={toggleDrawer}
                >
                    {/*<Bars3Icon className="w-6 h-6" />*/}
                    Menu
                </IconButton>
            )}

            {!isMobile && (
                <div>
                    <Typography variant="h5" color="blue-gray">
                        APP
                    </Typography>
                    {sidebarContent}
                </div>
            )}

            <Drawer open={isOpen} onClose={toggleDrawer} className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <Typography variant="h5" color="blue-gray">
                        APP
                    </Typography>
                    <IconButton onClick={toggleDrawer}>
                        {/*<XMarkIcon className="w-6 h-6" />*/}
                        X
                    </IconButton>
                </div>
                {sidebarContent}
            </Drawer>
        </div>
    );
}
