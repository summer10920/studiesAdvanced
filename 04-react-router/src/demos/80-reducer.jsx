import { useReducer } from 'react';

const reducer = (todos, action) => {
  switch (action.type) {
    case 'add':
      return [...todos, { id: action.id, title: action.title, done: false }];
    case 'toggle':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    case 'remove':
      return todos.filter((todo) => todo.id !== action.id);
    default:
      return todos;
  }
};

export default function ReducerDemo() {
  const [todos, dispatch] = useReducer(reducer, [
    { id: 1, title: '台北城市漫遊', done: false },
  ]);

  const onAdd = () => {
    dispatch({ id: Date.now(), title: '新待辦', type: 'add' });
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
    </section>
  );
}
