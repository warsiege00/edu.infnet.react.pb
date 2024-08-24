import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const RedirectPageNotFound = () => {
    const { currentUser } = useAuth();

    return <Navigate to={currentUser ? "/" : "/login"} replace />;
};

export default RedirectPageNotFound;
