import TaskAdd from './TaskAdd';
import TaskList from './TaskList';
import TodoProviders from './TodoProviders';

export default function TodoExample() {
  return (
    <TodoProviders>
      <div className="todo-example">
        <h1>Todo List：useReducer 範例</h1>
        {/* 輸入區域 */}
        <TaskAdd />
        {/* 待辦列表 */}
        <TaskList />
      </div>
    </TodoProviders>
  );
}
