// src/components/SidebarDefault.jsx
import React, { useState, useEffect } from 'react';
import { IconButton, Drawer, Card, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // Importa o hook useAuth

export function SidebarDefault() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { currentUser, userRole, userName, logout } = useAuth(); // Importa a função logout

    const toggleDrawer = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isAdmin = userRole === 'admin';
    console.log(currentUser);
    const sidebarContent = (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <List>
                <ListItem>
                    <Link to={"/"} className="flex">
                        <ListItemPrefix>
                            {/*<PresentationChartBarIcon className="h-5 w-5" />*/}
                            1
                        </ListItemPrefix>
                        Dashboard
                    </Link>
                </ListItem>
                {isAdmin && (
                    <ListItem>
                        <Link to={"/fornecedores"} className="flex">
                            <ListItemPrefix>
                                {/*<UserCircleIcon className="h-5 w-5" />*/}
                                2
                            </ListItemPrefix>
                            Fornecedores
                        </Link>
                    </ListItem>
                )}
                {isAdmin && (
                    <ListItem>
                        <Link to={"/config"} className="flex">
                            <ListItemPrefix>
                                {/*<Cog6ToothIcon className="h-5 w-5" />*/}
                                3
                            </ListItemPrefix>
                            Configurações
                        </Link>
                    </ListItem>
                )}
                <ListItem onClick={logout}>
                    <ListItemPrefix>
                        {/*<PowerIcon className="h-5 w-5" />*/}
                        4
                    </ListItemPrefix>
                    Sair
                </ListItem>
            </List>
        </Card>
    );

    return (
        <div>
            {isMobile && (
                <div>
                    <IconButton
                        className="m-4"
                        onClick={toggleDrawer}
                    >
                        {/*<Bars3Icon className="w-6 h-6" />*/}
                        Menu
                    </IconButton>
                    <span>
                        {userName ? userName : 'Nome de usuário desconhecido!'}
                    </span>
                </div>
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
