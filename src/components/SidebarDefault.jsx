import React, { useState } from 'react';
import { IconButton, Drawer, Card, List, ListItem, ListItemPrefix, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
    AnnotationIcon, 
    ArchiveIcon, 
    CogIcon, 
    MenuIcon, 
    SearchIcon, 
    ShoppingCartIcon, 
    UserCircleIcon
} from "@heroicons/react/solid";

export function SidebarDefault() {
    const [isOpen, setIsOpen] = useState(false);
    const { userRole, userName, logout } = useAuth(); 

    const toggleDrawer = () => setIsOpen(!isOpen);
    const isAdmin = userRole === 'admin';

    const sidebarContent = (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <Typography className='mb-4'>
                Olá, {userName ? userName : 'Nome de usuário desconhecido!'}
            </Typography>
            <List>
                {isAdmin && (
                    <Link to={"/cotacoes"} className="flex">
                        <ListItem>
                            <ListItemPrefix>
                                <SearchIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Cotações
                        </ListItem>
                    </Link>
                )}
                <Link to={"/solicitacoes"} className="flex">
                    <ListItem>
                        <ListItemPrefix>
                            <AnnotationIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Solicitações de compras
                    </ListItem>
                </Link>
                
                {isAdmin && (
                    <Link to={"/fornecedores"} className="flex">
                        <ListItem>
                            <ListItemPrefix>
                                <ShoppingCartIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Fornecedores
                        </ListItem>
                    </Link>
                )}
                {isAdmin && (
                    <Link to={"/contatos"} className="flex">
                        <ListItem>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Contatos
                        </ListItem>
                    </Link>
                )}
                {isAdmin && (
                    <Link to={"/produtos"} className="flex">
                        <ListItem>
                            <ListItemPrefix>
                                <ArchiveIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Produtos
                        </ListItem>
                    </Link>
                )}
                {isAdmin && (
                    <Link to={"/config"} className="flex">
                        <ListItem>
                            <ListItemPrefix>
                                <CogIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Configurações
                        </ListItem>
                    </Link>
                )}
            </List>
            <Button variant="gradient" onClick={logout} className="w-full mt-4">
                Sair
            </Button>
        </Card>
    );

    return (
        <div>
            {/* MObile */}
            <div className="lg:hidden">
                <IconButton className="m-4" onClick={toggleDrawer}>
                    <MenuIcon className="h-5 w-5" />
                </IconButton>
                <Drawer open={isOpen} onClose={toggleDrawer} className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <IconButton onClick={toggleDrawer}>
                            X
                        </IconButton>
                    </div>
                    {sidebarContent}
                </Drawer>
            </div>
            {/* Desktop */}
            <div className="hidden lg:block pl-3">
                {sidebarContent}
            </div>
        </div>
    );
}