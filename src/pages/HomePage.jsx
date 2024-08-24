import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/');
    };



    return (
      <h1>HOME</h1>
    );
}

export default HomePage;
