import styles from './todoList.module.css';
import { useTodoDispatch, useTodoState } from './TodoProviders';

export default function TaskList() {
  const { dispatchDelete, dispatchToggleChecked } = useTodoDispatch();
  const todoList = useTodoState();

  return (
    <ul className={styles.todoList}>
      {todoList.map((item) => (
        <li key={item.id} className={item.checked ? styles.checked : ''} onClick={() => dispatchToggleChecked(item.id)}>
          {item.text}
          <span
            className={styles.close}
            onClick={(e) => {
              e.stopPropagation(); // 阻止事件冒泡，避免觸發切換完成狀態
              dispatchDelete(item.id);
            }}
          >
            ×
          </span>
        </li>
      ))}
    </ul>
  );
}
