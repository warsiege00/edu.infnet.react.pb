import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import PublicLayout from '../components/PublicLayout.jsx';

const PublicRoute = () => {
    const { currentUser } = useAuth();

    return currentUser ? <Navigate to="/solicitacoes" /> : <PublicLayout />;
};

export default PublicRoute;
