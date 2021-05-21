import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from './types'

export const addTodo = (todoItem) => ({
    type: ADD_TODO,
    todoItem,
});

export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    id,
});

export const updateTodo = ({ id, title, desc, date, time }) => ({
    type: UPDATE_TODO,
    id,
    title,
    desc,
    date,
    time,
});