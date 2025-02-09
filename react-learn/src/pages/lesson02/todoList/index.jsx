import style from './todoList.module.css';
import TaskAdd from './component/taskAdd';
import TaskList from './component/taskList';
import {   } from './context/todoContext';

const TodoList = () => {
  return (
    <TodoContext>
      <div className={style.header}>
        <h2>My To Do List</h2>
        <TaskAdd />
      </div>
      <TaskList />
    </TodoContext>
  );
};

export default TodoList;
