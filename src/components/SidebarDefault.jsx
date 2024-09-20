import React, { useState, useEffect } from 'react';
import { IconButton, Drawer, Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {PresentationChartBarIcon, UserCircleIcon} from "@heroicons/react/solid";

export function SidebarDefault() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { currentUser, userRole, userName, logout } = useAuth(); 

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
    const sidebarContent = (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <List>
                {isAdmin && (
                    <ListItem>
                        <Link to={"/cotacoes"} className="flex">
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Cotações
                        </Link>
                    </ListItem>
                )}
                <ListItem>
                    <Link to={"/solicitacoes"} className="flex">
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Solicitações de compras
                    </Link>
                </ListItem>
                
                {isAdmin && (
                    <ListItem>
                        <Link to={"/fornecedores"} className="flex">
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Fornecedores
                        </Link>
                    </ListItem>
                )}
                {isAdmin && (
                    <ListItem>
                        <Link to={"/contatos"} className="flex">
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Contatos
                        </Link>
                    </ListItem>
                )}
                {isAdmin && (
                    <ListItem>
                        <Link to={"/produtos"} className="flex">
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Produtos
                        </Link>
                    </ListItem>
                )}
                {isAdmin && (
                    <ListItem>
                        <Link to={"/config"} className="flex">
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
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
                   
                    {sidebarContent}
                </div>
            )}

            <Drawer open={isOpen} onClose={toggleDrawer} className="p-4">
                <div className="flex justify-between items-center mb-4">
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
