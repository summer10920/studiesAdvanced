import { useReducer } from 'react';
import AddButton from './AddButton.jsx';
import TodoList from './TodoList.jsx';

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

export default function TodoPropsDemo() {
  const [todos, dispatch] = useReducer(reducer, [
    { id: 1, title: '台北城市漫遊', done: false },
  ]);

  return (
    <section>
      <AddButton dispatch={dispatch} />
      <TodoList todos={todos} dispatch={dispatch} />
    </section>
  );
}
