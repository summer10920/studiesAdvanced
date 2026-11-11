import { useReducer } from 'react';

function reducer(count, action) {
  switch (action.type) {
    case 'add':
      return count + 1;
    case 'sub':
      return count - 1;
    case 'reset':
      return 0;
    default:
      return count;
  }
}

export default function ReducerCountDemo() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <section className="grid max-w-sm gap-3">
      <p className="text-2xl font-semibold">{count}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => dispatch({ type: 'add' })}
        >
          加一
        </button>
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => dispatch({ type: 'sub' })}
        >
          減一
        </button>
        <button
          type="button"
          className="rounded bg-stone-200 px-3 py-1"
          onClick={() => dispatch({ type: 'reset' })}
        >
          歸零
        </button>
      </div>
    </section>
  );
}
