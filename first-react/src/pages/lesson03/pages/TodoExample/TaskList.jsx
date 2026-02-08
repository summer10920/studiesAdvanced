import styles from './todoList.module.css';

export default function TaskList({ todoList, onDelete, onToggleChecked }) {
  return (
    <ul className={styles.todoList}>
      {todoList.map((item) => (
        <li key={item.id} className={item.checked ? styles.checked : ''} onClick={() => onToggleChecked(item.id)}>
          {item.text}
          <span
            className={styles.close}
            onClick={(e) => {
              e.stopPropagation(); // 阻止事件冒泡，避免觸發切換完成狀態
              onDelete(item.id);
            }}
          >
            ×
          </span>
        </li>
      ))}
    </ul>
  );
}
