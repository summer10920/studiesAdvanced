import { Route, Routes } from 'react-router';
import Layout from './demos/03-layout.jsx';
import HomePage from './demos/02-home.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}
