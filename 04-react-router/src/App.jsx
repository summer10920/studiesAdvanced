import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import MainLayout from './layouts/MainLayout.jsx';
import DemoPage from './pages/DemoPage.jsx';
import Home from './pages/Home.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoaderDemo, { loader as loader86 } from './demos/86-loader.jsx';
import ActionDemo, { action as action87 } from './demos/87-action.jsx';
import RedirectList, {
  loader as loader88List,
} from './demos/88-redirect-list.jsx';
import RedirectEdit, {
  action as action88,
  loader as loader88Edit,
} from './demos/88-redirect-edit.jsx';
import ErrorElementDemo, {
  loader as loader89,
  NoteDetail,
  NoteMissing,
} from './demos/89-error-element.jsx';
import FetcherDemo, {
  action as action90,
  loader as loader90,
} from './demos/90-fetcher.jsx';
import NavigationDemo, {
  action as action91,
  loader as loader91,
} from './demos/91-navigation.jsx';
import FetcherKeyDemo, {
  action as action92,
} from './demos/92-fetcher-key.jsx';
import WherePage from './pages/WherePage.jsx';

/**
 * 路由表。外層路由畫版型，index 路由在同一個網址畫首頁。
 * 子路由寫在 children 裡，才會畫進版型的 Outlet。
 * basename 取自 Vite 的 BASE_URL。開發時是 /，去掉結尾斜線後等於空字串。
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
          path: 'demos/88-redirect-list',
          loader: loader88List,
          Component: RedirectList,
        },
        {
          path: 'demos/88-redirect-edit/:itemId',
          loader: loader88Edit,
          action: action88,
          Component: RedirectEdit,
        },
        {
          path: 'demos/89-error-element',
          loader: loader89,
          Component: ErrorElementDemo,
        },
        {
          path: 'demos/89-error-element/notes/:noteId',
          loader: loader89,
          Component: NoteDetail,
          errorElement: <NoteMissing />,
        },
        {
          path: 'demos/90-fetcher',
          loader: loader90,
          action: action90,
          Component: FetcherDemo,
        },
        {
          path: 'demos/91-navigation',
          loader: loader91,
          action: action91,
          Component: NavigationDemo,
        },
        {
          path: 'demos/92-fetcher-key',
          action: action92,
          Component: FetcherKeyDemo,
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
