import { useState } from 'react';
import style from '../todoList.module.css';
import { useFacade } from '../context/todoContext';

const TaskAdd = () => {
  // 沒有prop可用取得 fn
  const [text, setText] = useState('');
  const { onAdd } = useFacade(); // 改用 custom hook 來取得 fn

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
