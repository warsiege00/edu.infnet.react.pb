import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import MainLayout from "../components/MainLayout.jsx";

const PrivateRoute = () => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (currentUser !== null) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    }, [currentUser]);

    if (loading) {
        return <span>Loading...</span>;
    }

    return isAuthenticated ? <MainLayout /> : <Navigate to="/login" />;
};

export default PrivateRoute;
