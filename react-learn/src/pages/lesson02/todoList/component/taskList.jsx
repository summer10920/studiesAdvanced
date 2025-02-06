import style from '../todoList.module.css';

const TaskList = ({ items, onDelete, onChecked }) => {
  return (
    <ul className={style.todoList}>
      {items.map((item) => (
        <li
          key={item.id}
          className={item.checked ? style.checked : null}
          onClick={() =>
            onChecked({
              ...item,
              checked: !item.checked,
            })
          }
        >
          {item.text}
          <span className={style.close} onClick={() => onDelete(item.id)}>
            ×
          </span>
        </li>
      ))}
    </ul>
  );
};
export default TaskList;
