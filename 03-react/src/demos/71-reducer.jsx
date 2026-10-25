// TODO: 講義「待辦清單」。換你試試：完成檔改成 `useReducer`，做出新增、切換完成與刪除。不明的 type 要回傳原狀態。
import { useState } from 'react';

export default function ReducerDemo() {
  const [todos, setTodos] = useState([{ id: 1, title: '台北城市漫遊', done: false }]);

  const onAdd = () => {
    setTodos((items) => [
      ...items,
      { id: items.length + 1, title: '待辦' + (items.length + 1), done: false },
    ]);
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
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </section>
  );
}
