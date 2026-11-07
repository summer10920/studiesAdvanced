import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthProvider } from './auth.jsx';
import SiteLayout from './layout/SiteLayout.jsx';
import HomePage from './features/home/HomePage.jsx';
import ToursPage from './features/tours/ToursPage.jsx';
import TourDetailPage from './features/tours/TourDetailPage.jsx';
import BookingPage from './features/booking/BookingPage.jsx';
import BookingDonePage from './features/booking/BookingDonePage.jsx';
import MyBookingsPage from './features/booking/MyBookingsPage.jsx';
import AboutPage from './features/about/AboutPage.jsx';
import LoginPage from './features/auth/LoginPage.jsx';
import SeedPage from './features/admin/SeedPage.jsx';
import AdminLoginPage from './features/admin/AdminLoginPage.jsx';
import AdminToursPage from './features/admin/AdminToursPage.jsx';
import AdminBookingsPage from './features/admin/AdminBookingsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'tours', element: <ToursPage /> },
      { path: 'tours/:id', element: <TourDetailPage /> },
      { path: 'booking', element: <BookingPage /> },
      { path: 'booking/done', element: <BookingDonePage /> },
      { path: 'me', element: <MyBookingsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'seed', element: <SeedPage /> },
      { path: 'admin/login', element: <AdminLoginPage /> },
      { path: 'admin', element: <AdminToursPage /> },
      { path: 'admin/bookings', element: <AdminBookingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
