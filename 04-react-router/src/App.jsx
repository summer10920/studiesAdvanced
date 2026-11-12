import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import DemoPage from './pages/DemoPage.jsx';
import Home from './pages/Home.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import WherePage from './pages/WherePage.jsx';
import LoaderDemo, { loader as loader86 } from './examples/86-loader.jsx';
import ActionDemo, {
  action as action87,
} from './examples/87-action.jsx';
import RedirectDemo, {
  action as action88,
  loader as loader88,
  NoteDetail,
  NoteMissing,
} from './examples/88-redirect-error.jsx';
import FetcherDemo, {
  action as action89,
  loader as loader89,
} from './examples/89-fetcher.jsx';
import NavigationDemo, {
  action as action90,
  loader as loader90,
} from './examples/90-navigation.jsx';

/**
 * 筆記網站的路由表。版型包住首頁、單則筆記、位置頁與找不到的頁面。
 * 子路由寫在父路由的 children 裡，才會畫進版型的 Outlet。星號放在最後，更具體的路徑先對上。
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'demos/86-loader', loader: loader86, Component: LoaderDemo },
        {
          path: 'demos/87-action',
          action: action87,
          Component: ActionDemo,
        },
        {
          path: 'demos/88-redirect-error',
          loader: loader88,
          action: action88,
          Component: RedirectDemo,
        },
        {
          path: 'demos/88-redirect-error/notes/:noteId',
          loader: loader88,
          Component: NoteDetail,
          errorElement: <NoteMissing />,
        },
        {
          path: 'demos/89-fetcher',
          loader: loader89,
          action: action89,
          Component: FetcherDemo,
        },
        {
          path: 'demos/90-navigation',
          loader: loader90,
          action: action90,
          Component: NavigationDemo,
        },
        { path: 'demos/:slug', element: <DemoPage /> },
        { path: 'where', element: <WherePage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename },
);

export default function App() {
  return <RouterProvider router={router} />;
}
