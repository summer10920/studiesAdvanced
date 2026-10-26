import { createContext, useContext, useReducer } from 'react';

const TodoContext = createContext(null);

const reducer = (todos, action) => {
  switch (action.type) {
    case 'add':
      return [...todos, { id: action.id, title: action.title, done: false }];
    default:
      return todos;
  }
};

function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, []);
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos() {
  const value = useContext(TodoContext);
  if (!value) throw new Error('缺少 TodoProvider');
  return value;
}

function AddButton() {
  const { dispatch } = useTodos();
  return (
    <button
      type="button"
      className="rounded bg-teal-800 px-3 py-1 text-white"
      onClick={() => dispatch({ type: 'add', id: Date.now(), title: '新待辦' })}
    >
      新增
    </button>
  );
}

function TodoList() {
  const { todos } = useTodos();
  return (
    <ul className="mt-3 grid gap-2">
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default function ProviderDemo() {
  return (
    <TodoProvider>
      <section>
        <AddButton />
        <TodoList />
      </section>
    </TodoProvider>
  );
}
