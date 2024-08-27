import React, {useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarDefault } from "./SidebarDefault.jsx";

const MainLayout = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isMobile && <SidebarDefault/> }
            <div className="flex min-h-screen bg-gray-50 justify-center">
                {!isMobile && <SidebarDefault/> }
                <main className="w-full p-8">
                    <Outlet/>
                </main>
            </div>
        </>
    );
};

export default MainLayout;
