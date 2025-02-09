export const ADD_TODO = 'add todo';
export const DELETE_TODO = 'delete todo';
export const CHECKED_TODO = 'checked todo';

// actions
// ---------------------------------------------------------------
export const addTodo = (item) => ({ type: ADD_TODO, item });
export const deleteTodo = (id) => ({ type: DELETE_TODO, id });
export const checkedTodo = (item) => ({ type: CHECKED_TODO, item });
