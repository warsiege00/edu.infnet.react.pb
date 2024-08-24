import React, {useState} from 'react';
import {useTodos} from "../context/TodoContext.jsx";
import {useNavigate} from 'react-router-dom';


function Dashboard() {
    const { todos, deleteTodo } = useTodos();
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/new');
    };

    return (
        <h1>Dashboard</h1>
    );
}

export default Dashboard;
