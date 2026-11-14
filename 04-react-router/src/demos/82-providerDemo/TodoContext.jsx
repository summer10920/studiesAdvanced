import { useReducer } from 'react';
import { TodoContext } from './todo-context.js';

const reducer = (todos, action) => {
  switch (action.type) {
    case 'add':
      return [...todos, { id: action.id, title: action.title, done: false }];
    case 'toggle':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    case 'remove':
      return todos.filter((todo) => todo.id !== action.id);
    default:
      return todos;
  }
};

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, [
    { id: 1, title: '台北城市漫遊', done: false },
  ]);
  return (
    <TodoContext value={{ todos, dispatch }}>
      {children}
    </TodoContext>
  );
}
