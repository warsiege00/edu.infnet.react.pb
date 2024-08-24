import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarDefault } from "./SidebarDefault.jsx";

const MainLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <SidebarDefault />
            <main className=" p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
