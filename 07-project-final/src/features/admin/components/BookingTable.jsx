import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { statusLabel } from '../../../format.js';

export default function BookingTable({ bookings, onView }) {
  return (
    <>
      <TableContainer
        elevation={0}
        className="rounded-card bg-white shadow-card mt-8 hidden overflow-x-auto md:block"
      >
        <Table>
          <TableHead>
            <TableRow>
              {['行程', '出發日', '姓名', '狀態', '操作'].map((label) => (
                <TableCell key={label} className="whitespace-nowrap px-4 py-3">
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="px-4 py-4">{booking.tourTitle}</TableCell>
                <TableCell className="whitespace-nowrap px-4 py-4">
                  {booking.date}
                </TableCell>
                <TableCell className="px-4 py-4">{booking.name}</TableCell>
                <TableCell className="whitespace-nowrap px-4 py-4">
                  {statusLabel[booking.status] || booking.status}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <Button
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={() => onView(booking)}
                  >
                    查看
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-8 grid gap-4 md:hidden">
        {bookings.map((booking) => (
          <Card key={booking.id} className="p-6">
            <h3 className="font-serif text-2xl font-semibold">
              {booking.tourTitle}
            </h3>
            <p className="mt-2 text-muted">
              {booking.date} · {booking.name} ·{' '}
              {statusLabel[booking.status] || booking.status}
            </p>
            <Button
              className="mt-3"
              variant="contained"
              disableElevation
              color="primary"
              onClick={() => onView(booking)}
            >
              查看
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
