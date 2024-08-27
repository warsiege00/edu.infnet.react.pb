import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import MainLayout from "../components/MainLayout.jsx";

const PrivateRoute = () => {
    const { currentUser, userRole, userStatus } = useAuth();
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const adminRoutes = ['/config', '/fornecedores'];

    useEffect(() => {
        if (currentUser !== null) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    if (loading) {
        return <span>Loading...</span>;
    }

    const isAdmin = userRole === 'admin';
    const isAdminRoute = adminRoutes.includes(location.pathname);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (userStatus === 'blocked') {
        return <Navigate to="/blocked" />;
    }

    if (isAdminRoute && !isAdmin) {
        return <Navigate to="/unauthorized" />;
    }

    return <MainLayout />;
};

export default PrivateRoute;
