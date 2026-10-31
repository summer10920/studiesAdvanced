import { createContext, useContext, useReducer } from 'react';

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

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, [
    { id: 1, title: '台北城市漫遊', done: false },
  ]);
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const value = useContext(TodoContext);
  if (!value) throw new Error('缺少 TodoProvider');
  return value;
}
