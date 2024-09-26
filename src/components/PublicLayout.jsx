import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/solid';

const PublicLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="flex items-center justify-center p-4 text-blue-gray-800 gap-5">
                <ShoppingCartIcon className="mr-2 h-9 w-9" />
                <h1 className="text-2xl">Sistema de Cotação de Produtos</h1>
            </header>
            <main className="flex-grow p-8">
                <Outlet />
            </main>
            <footer className="p-4 text-center bg-gray-800 text-white">
                <p>
                    Criado por <a href="https://github.com/warsiege00" target="_blank" rel="noopener noreferrer" className="underline">Matheus Almeida</a>
                </p>
            </footer>
        </div>
    );
};

export default PublicLayout;