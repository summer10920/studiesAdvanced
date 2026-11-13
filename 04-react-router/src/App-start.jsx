import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

// 路由器寫在元件外面，只建立一次，不要放進 state。
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

const router = createBrowserRouter(
  [{ path: '/', element: <p>路由已經接上</p> }],
  { basename },
);

export default function App() {
  return <RouterProvider router={router} />;
}
