import React from 'react';
import { useState } from 'react';
import { useTodos } from "../context/TodoContext.jsx";
import { useNavigate } from "react-router-dom";


function NewItem() {
    const [newTodo, setNewTodo] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const { addTodo } = useTodos();
    const navigate = useNavigate();

    const handleAddTodo = () => {
        if (newTodo.length < 2) {
            setInvalid(true);
            return;
        }

        addTodo(newTodo);
        setNewTodo('');
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate('/list');
        }, 1000);
    };

    return (
        <h1>New Item</h1>
    );
}

export default NewItem;
