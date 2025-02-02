import { useState } from 'react';
import style from './todoList.module.css';
import TaskAdd from './taskAdd';
import TaskList from './taskList';

const initData = [
  {
    id: 1,
    text: 'Hit the gym',
    checked: false,
  },
  {
    id: 2,
    text: 'Pay bills',
    checked: true,
  },
  {
    id: 3,
    text: 'Meet George',
    checked: false,
  },
  {
    id: 4,
    text: 'Buy eggs',
    checked: false,
  },
  {
    id: 5,
    text: 'Read a book',
    checked: false,
  },
  {
    id: 6,
    text: 'Organize office',
    checked: false,
  },
];

const TodoList = () => {
  const [list, setList] = useState(initData);

  const handleAdd = (text) => {
    setList((data) => {
      return [
        ...data,
        {
          id: list[list.length - 1].id + 1,
          text: text,
          checked: false,
        },
      ];
    });
  };

  const handleDelete = (id) => {
    setList((data) => data.filter((item) => item.id !== id));
  };

  const handleChecked = (newItem) => {
    setList((data) =>
      data.map((item) => {
        return item.id === newItem.id ? newItem : item;
      })
    );
  };

  return (
    <>
      <div className={style.header}>
        <h2>My To Do List</h2>
        <TaskAdd onAdd={handleAdd} />
      </div>
      <TaskList items={list} onDelete={handleDelete} onChecked={handleChecked} />
    </>
  );
};

export default TodoList;
