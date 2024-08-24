// list.js
import { useState } from 'react';

export const useTodoList = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (text) => {
        if (text.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text }]);
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return {
        todos,
        addTodo,
        deleteTodo,
    };
};
