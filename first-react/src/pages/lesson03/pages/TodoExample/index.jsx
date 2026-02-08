import styles from './todoList.module.css';

export default function TodoExample() {
  return (
    <div className="todo-example">
      <h1>Todo List：useReducer 範例</h1>
      
      {/* 輸入區域 */}
      <div className={styles.header}>
        <h2>我的待辦清單</h2>
        <input
          type="text"
          placeholder="輸入新的待辦事項。.."
        />
        <span className={styles.addBtn}>新增</span>
      </div>

      {/* 待辦列表 */}
      <ul className={styles.todoList}>
        <li>去健身房</li>
        <li className={styles.checked}>繳帳單</li>
        <li>見 George</li>
        <li>買雞蛋</li>
        <li>讀一本書</li>
      </ul>
    </div>
  );
}
