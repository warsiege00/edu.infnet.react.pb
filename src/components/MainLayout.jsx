import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarDefault } from "./SidebarDefault.jsx";

const MainLayout = () => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
            <div className="lg:block hidden">
                <SidebarDefault />
            </div>
            <div className="lg:hidden block">
                <SidebarDefault />
            </div>
            <main className="w-full p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;