import { Route, Routes } from 'react-router';
import { SessionProvider } from './session.jsx';
import { StoreProvider } from './store.jsx';
import SiteLayout from './layouts/SiteLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ToursPage from './pages/ToursPage.jsx';
import TourDetailPage from './pages/TourDetailPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import BookingDonePage from './pages/BookingDonePage.jsx';
import MyBookingsPage from './pages/MyBookingsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminToursPage from './pages/AdminToursPage.jsx';
import AdminBookingsPage from './pages/AdminBookingsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <SessionProvider>
      <StoreProvider>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="tours" element={<ToursPage />} />
            <Route path="tours/:id" element={<TourDetailPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="booking/done" element={<BookingDonePage />} />
            <Route path="me" element={<MyBookingsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="admin/login" element={<AdminLoginPage />} />
            <Route path="admin" element={<AdminToursPage />} />
            <Route path="admin/bookings" element={<AdminBookingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </StoreProvider>
    </SessionProvider>
  );
}
