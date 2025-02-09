import style from '../todoList.module.css';
import { useFacade, useSelector } from '../context/todoContext';

const TaskList = () => {
  // 沒有 props 可用
  const state = useSelector(); // 透過 hook，並注意名字也改了注意items改名為state
  const { onChecked, onDelete } = useFacade(); //透過hook

  return (
    <ul className={style.todoList}>
      {state.map((item) => (
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
