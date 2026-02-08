import styles from './todoList.module.css';
import { useState } from 'react';

// 🌟 初始資料
const initData = [
  { id: 1, text: '去健身房', checked: false },
  { id: 2, text: '繳帳單', checked: true },
  { id: 3, text: '見 George', checked: false },
  { id: 4, text: '買雞蛋', checked: false },
  { id: 5, text: '讀一本書', checked: false },
];

export default function TodoExample() {
  // 宣告使用 HOOK 都是在元件內
  const [todoList, setTodoList] = useState(initData);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (!inputValue.trim()) return;

    setTodoList((state) => [
      ...state,
      { id: state.length ? state[state.length - 1].id + 1 : 1, text: inputValue, checked: false },
    ]);
    setInputValue('');
  };

  const handleDelete = (id) => {
    setTodoList((state) => state.filter((item) => item.id !== id));
  };

  return (
    <div className="todo-example">
      <h1>Todo List：useReducer 範例</h1>

      {/* 輸入區域 */}
      <div className={styles.header}>
        <h2>我的待辦清單</h2>
        <input
          type="text"
          placeholder="輸入新的待辦事項..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <span className={styles.addBtn} onClick={() => handleAdd()}>
          新增
        </span>
      </div>

      {/* 待辦列表 */}
      <ul className={styles.todoList}>
        {todoList.map((item) => (
          <li key={item.id} className={item.checked ? styles.checked : ''}>
            {item.text}
            <span className={styles.close} onClick={() => handleDelete(item.id)}>
              ×
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
