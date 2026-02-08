import styles from './todoList.module.css';
import { useState } from 'react';

export default function TaskAdd({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    onAdd(inputValue);
    setInputValue('');
  };

  return (
    <div className={styles.header}>
      <h2>我的待辦清單</h2>
      <input
        type="text"
        placeholder="輸入新的待辦事項..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <span className={styles.addBtn} onClick={() => handleSubmit()}>
        新增
      </span>
    </div>
  );
}
