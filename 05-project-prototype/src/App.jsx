import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import SiteLayout from './layout/SiteLayout.jsx';
import HomePage, { loader as homeLoader } from './features/home/HomePage.jsx';
import ToursPage, {
  loader as toursLoader,
} from './features/tours/ToursPage.jsx';
import TourDetailPage, {
  loader as tourLoader,
} from './features/tours/TourDetailPage.jsx';
import BookingPage, {
  action as bookingAction,
  loader as bookingLoader,
} from './features/booking/BookingPage.jsx';
import BookingResultPage, {
  loader as bookingResultLoader,
} from './features/booking/BookingResultPage.jsx';
import MyBookingsPage from './features/booking/MyBookingsPage.jsx';
import AboutPage from './features/about/AboutPage.jsx';
import LoginPage from './features/auth/LoginPage.jsx';
import AdminLoginPage from './features/admin/AdminLoginPage.jsx';
import AdminToursPage, {
  action as adminToursAction,
  loader as adminToursLoader,
} from './features/admin/AdminToursPage.jsx';
import AdminBookingsPage, {
  action as adminBookingsAction,
  loader as adminBookingsLoader,
} from './features/admin/AdminBookingsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RouteErrorPage from './pages/RouteErrorPage.jsx';

const router = createBrowserRouter([
  {
    Component: SiteLayout,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, loader: homeLoader, Component: HomePage },
          { path: 'tours', loader: toursLoader, Component: ToursPage },
          { path: 'tours/:id', loader: tourLoader, Component: TourDetailPage },
          {
            path: 'booking',
            loader: bookingLoader,
            action: bookingAction,
            Component: BookingPage,
          },
          {
            path: 'booking/:id',
            loader: bookingResultLoader,
            Component: BookingResultPage,
          },
          { path: 'me', Component: MyBookingsPage },
          { path: 'about', Component: AboutPage },
          { path: 'login', Component: LoginPage },
          { path: 'admin/login', Component: AdminLoginPage },
          {
            path: 'admin',
            loader: adminToursLoader,
            action: adminToursAction,
            Component: AdminToursPage,
          },
          {
            path: 'admin/bookings',
            loader: adminBookingsLoader,
            action: adminBookingsAction,
            Component: AdminBookingsPage,
          },
          { path: '*', Component: NotFoundPage },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
