import { createContext, useContext, useReducer } from 'react';
import * as action from '../store/actions.js';
import * as reducer from '../store/reducer.js';

// 在模块作用域创建 Context，确保全局唯一
const StateContext = createContext([]);
const DispatchContext = createContext(null);

export function TodoContext({ children }) {
  const [state, dispatch] = useReducer(reducer.reducerFn, reducer.initState);

  function onAdd(text) {
    dispatch(
      action.addTodo({
        id: state[state.length - 1].id + 1,
        text,
        checked: false,
      })
    );
  }

  function onDelete(id) {
    dispatch(action.deleteTodo(id));
  }

  function onChecked(item) {
    dispatch(action.checkedTodo(item));
  }

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={{ onAdd, onDelete, onChecked }}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// 自定義 Hooks
export function useSelector() {
  return useContext(StateContext);
}

export function useFacade() {
  return useContext(DispatchContext);
}
