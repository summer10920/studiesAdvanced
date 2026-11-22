import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import '../index.css';
import Booking, {
  action as bookingAction,
  loader as bookingLoader,
} from './Booking.jsx';
import Bookings, { loader as bookingsLoader } from './Bookings.jsx';
import Home from './Home.jsx';
import Layout from './Layout.jsx';
import TourDetail, {
  loader as tourLoader,
  TourMissing,
} from './TourDetail.jsx';
import Tours, { loader as toursLoader } from './Tours.jsx';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'tours', loader: toursLoader, Component: Tours },
      {
        path: 'tours/:tourId',
        loader: tourLoader,
        Component: TourDetail,
        errorElement: <TourMissing />,
      },
      {
        path: 'booking',
        loader: bookingLoader,
        action: bookingAction,
        Component: Booking,
      },
      { path: 'bookings', loader: bookingsLoader, Component: Bookings },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
