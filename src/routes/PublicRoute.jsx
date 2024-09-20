import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const PublicRoute = () => {
    const { currentUser } = useAuth();

    return currentUser ? <Navigate to="/solicitacoes" /> : <Outlet />;
};

export default PublicRoute;
