import { useState } from 'react';
import style from './todoList.module.css';

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

let id = initData.length + 1;

const TodoList = () => {
  const [list, setList] = useState(initData);
  const [text, setText] = useState('');

  const handleAdd = (text) => {
    setList((data) => {
      return [
        ...data,
        {
          id: id++,
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
        <input
          type="text"
          id="myInput"
          placeholder="Title..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span
          className={style.addBtn}
          onClick={() => {
            if (text === '') return;
            handleAdd(text);
            setText('');
          }}
        >
          Add
        </span>
      </div>

      <ul className={style.todoList}>
        {list.map((item) => (
          <li
            key={item.id}
            className={item.checked ? style.checked : null}
            onClick={() =>
              handleChecked({
                ...item,
                checked: !item.checked,
              })
            }
          >
            {item.text}
            <span className={style.close} onClick={() => handleDelete(item.id)}>
              ×
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
