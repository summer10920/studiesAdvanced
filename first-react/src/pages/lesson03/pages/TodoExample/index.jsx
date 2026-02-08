import styles from './todoList.module.css';
import { useState } from 'react';
import TaskAdd from './TaskAdd';

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

  const handleAdd = (text) => {
    setTodoList((state) => [...state, { id: state.length ? state[state.length - 1].id + 1 : 1, text, checked: false }]);
  };

  const handleDelete = (id) => {
    setTodoList((state) => state.filter((item) => item.id !== id));
  };

  const handleToggleChecked = (id) => {
    setTodoList((state) => state.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  return (
    <div className="todo-example">
      <h1>Todo List：useReducer 範例</h1>

      {/* 輸入區域 */}
      <TaskAdd onAdd={handleAdd} />

      {/* 待辦列表 */}
      <ul className={styles.todoList}>
        {todoList.map((item) => (
          <li key={item.id} className={item.checked ? styles.checked : ''} onClick={() => handleToggleChecked(item.id)}>
            {item.text}
            <span
              className={styles.close}
              onClick={(e) => {
                e.stopPropagation(); // 阻止事件冒泡，避免觸發切換完成狀態
                handleDelete(item.id);
              }}
            >
              ×
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
