// action type
export const ADD_TODO = 'ADD';
export const DELETE_TODO = 'DELETE';
export const TOGGLE_CHECKED = 'TOGGLE_CHECKED';

// action creator
export const addTodo = (text) => ({ type: ADD_TODO, text });
export const deleteTodo = (id) => ({ type: DELETE_TODO, id });
export const toggleChecked = (id) => ({ type: TOGGLE_CHECKED, id });
