import { useReducer, createContext } from 'react';
import { initState, todoReducer } from './store/reducer';
import { addTodo, toggleChecked, deleteTodo } from './store/action';

export const TodoStateContext = createContext(null);
export const TodoDispatchContext = createContext(null);

export default function TodoProviders({ children }) {
  const [todoList, dispatch] = useReducer(todoReducer, initState);

  const handles = {
    dispatchAdd: (text) => dispatch(addTodo(text)),
    dispatchDelete: (id) => dispatch(deleteTodo(id)),
    dispatchToggleChecked: (id) => dispatch(toggleChecked(id)),
  };

  return (
    <TodoDispatchContext.Provider value={handles}>
      <TodoStateContext.Provider value={todoList}>{children}</TodoStateContext.Provider>
    </TodoDispatchContext.Provider>
  );
}
