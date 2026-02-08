import { addTodo, toggleChecked, deleteTodo } from './store/action';
import TaskAdd from './TaskAdd';
import TaskList from './TaskList';
import { useReducer } from 'react';
import { initState, todoReducer } from './store/reducer';
import { TodoDispatchContext, TodoStateContext } from './store/reducerContext';

export default function TodoExample() {
  const [todoList, dispatch] = useReducer(todoReducer, initState);

  const handles = {
    dispatchAdd: (text) => dispatch(addTodo(text)),
    dispatchDelete: (id) => dispatch(deleteTodo(id)),
    dispatchToggleChecked: (id) => dispatch(toggleChecked(id)),
  };

  return (
    <TodoDispatchContext.Provider value={handles}>
      <TodoStateContext.Provider value={todoList}>
        <div className="todo-example">
          <h1>Todo List：useReducer 範例</h1>
          {/* 輸入區域 */}
          <TaskAdd />
          {/* 待辦列表 */}
          <TaskList />
        </div>
      </TodoStateContext.Provider>
    </TodoDispatchContext.Provider>
  );
}
