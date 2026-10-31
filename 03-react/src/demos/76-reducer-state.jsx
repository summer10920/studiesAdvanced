import { useState } from 'react';

export default function ReducerStateDemo() {
  const [todos, setTodos] = useState([
    { id: 1, title: '台北城市漫遊', done: false },
  ]);

  const onAdd = () => {
    setTodos((items) => [
      ...items,
      { id: Date.now(), title: '新待辦', done: false },
    ]);
  };

  const onToggle = (id) => {
    setTodos((items) =>
      items.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const onRemove = (id) => {
    setTodos((items) => items.filter((todo) => todo.id !== id));
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        新增
      </button>
      <ul className="mt-3 grid gap-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex gap-2">
            <button
              type="button"
              className="rounded bg-stone-100 px-2"
              onClick={() => onToggle(todo.id)}
            >
              {todo.done ? '完成' : '未完成'}
            </button>
            <span>{todo.title}</span>
            <button
              type="button"
              className="rounded bg-stone-200 px-2"
              onClick={() => onRemove(todo.id)}
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
