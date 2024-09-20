import React from 'react';
import { Typography, Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";

const BlockedPage = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();

    const handleReturnToLogin = async () => {
        await logout();
        navigate('/login');  
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
                <Typography variant="h4" color="blue-gray" className="mb-4">
                    Conta Bloqueada
                </Typography>
                <Typography variant="paragraph" color="gray" className="mb-6">
                    Sua conta foi bloqueada. Se você acredita que isso foi um engano, entre em contato com o suporte.
                </Typography>
                <Button color="blue" onClick={handleReturnToLogin}>
                    Voltar para Login
                </Button>
            </div>
        </div>
    );
};

export default BlockedPage;
