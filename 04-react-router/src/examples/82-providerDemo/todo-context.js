import { createContext, useContext } from 'react';

export const TodoContext = createContext(null);

export const useTodos = () => {
  const value = useContext(TodoContext);
  if (!value) throw new Error('缺少 TodoProvider');
  return value;
};
