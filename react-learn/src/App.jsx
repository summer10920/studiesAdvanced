import { Routes, Route } from 'react-router';
import Layout from './template/layout';
import Base from './pages/lesson01/base';
import MyContext from './pages/lesson02/myContext';
import MyListMenu from './pages/lesson02/myListMenu';
import TodoList from './pages/lesson02/todoList';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Base />} />
        <Route path="base" element={<Base />} />
        <Route path="lesson02">
          <Route index element={<MyContext />} />
          <Route path="my-context" element={<MyContext />} />
          <Route path="my-list-menu" element={<MyListMenu />} />
          <Route path="todo-list" element={<TodoList />} />
        </Route>
      </Route>
    </Routes>
  );   
}
