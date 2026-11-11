import { TodoProvider } from './TodoContext.jsx';
import AddButton from './AddButton.jsx';
import TodoList from './TodoList.jsx';

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
