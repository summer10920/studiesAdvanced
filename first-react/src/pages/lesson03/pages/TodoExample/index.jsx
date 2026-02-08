import { addTodo, toggleChecked, deleteTodo } from './store/action';
import TaskAdd from './TaskAdd';
import TaskList from './TaskList';
import { useReducer } from 'react';
import { initState, todoReducer } from './store/reducer';

export default function TodoExample() {
  const [todoList, dispatch] = useReducer(todoReducer, initState);

  return (
    <div className="todo-example">
      <h1>Todo List：useReducer 範例</h1>

      {/* 輸入區域 */}
      <TaskAdd onAdd={(text) => dispatch(addTodo(text))} />

      {/* 待辦列表 */}
      <TaskList
        todoList={todoList}
        onDelete={(id) => dispatch(deleteTodo(id))}
        onToggleChecked={(id) => dispatch(toggleChecked(id))}
      />
    </div>
  );
}
