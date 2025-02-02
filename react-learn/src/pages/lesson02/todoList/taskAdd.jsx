import { useState } from 'react';
import style from './todoList.module.css';

const TaskAdd = ({ onAdd }) => {
  const [text, setText] = useState('');

  return (
    <>
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
          onAdd(text);
          setText('');
        }}
      >
        Add
      </span>
    </>
  );
};
export default TaskAdd;
