import { useReducer } from 'react';
import { initState, todoReducer } from './store/reducer';
import { TodoDispatchContext, TodoStateContext } from './store/reducerContext';
import { addTodo, toggleChecked, deleteTodo } from './store/action';

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
