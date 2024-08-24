import React, { createContext, useState, useContext } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos((prevTodos) => [...prevTodos, todo]);
    };

    const deleteTodo = (index) => {
        setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => {
    return useContext(TodoContext);
};
