import { useTodos } from './TodoContext.jsx';

export default function TodoList() {
  const { todos, dispatch } = useTodos();
  return (
    <ul className="mt-3 grid gap-2">
      {todos.map((todo) => (
        <li key={todo.id} className="flex gap-2">
          <button
            type="button"
            className="rounded bg-stone-100 px-2"
            onClick={() => dispatch({ type: 'toggle', id: todo.id })}
          >
            {todo.done ? '完成' : '未完成'}
          </button>
          <span>{todo.title}</span>
          <button
            type="button"
            className="rounded bg-stone-200 px-2"
            onClick={() => dispatch({ type: 'remove', id: todo.id })}
          >
            刪除
          </button>
        </li>
      ))}
    </ul>
  );
}
