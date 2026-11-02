import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ntd, statusLabel } from '../format.js';
import { useStore } from '../store.jsx';
import { tokens } from '../theme.js';

const statuses = ['pending', 'confirmed', 'cancelled'];

const statusTone = {
  pending: { border: tokens.accent, color: tokens.ink },
  confirmed: { border: tokens.action, color: tokens.action },
  cancelled: { border: '#C5C2B8', color: '#6E756E' },
};

function StatusSelect({ booking }) {
  const { setBookingStatus } = useStore();
  const tone = statusTone[booking.status] || statusTone.pending;
  return (
    <Select
      size="small"
      aria-label={`${booking.name}這筆的狀態`}
      value={booking.status}
      onChange={(event) => setBookingStatus(booking.id, event.target.value)}
      sx={{
        width: 148,
        color: tone.color,
        backgroundColor: tokens.white,
        '& .MuiOutlinedInput-notchedOutline': { borderColor: tone.border, borderWidth: 2 },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: tone.border },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: tone.border },
        '& .MuiSelect-icon': { color: tone.color },
      }}
    >
      {statuses.map((status) => <MenuItem key={status} value={status}>{statusLabel[status]}</MenuItem>)}
    </Select>
  );
}

export default function BookingTable({ bookings }) {
  return (
    <>
      <TableContainer elevation={0} className="panel mt-8 hidden overflow-x-auto md:block">
        <Table>
          <TableHead>
            <TableRow>
              {[['行程', 'left'], ['出發日', 'left'], ['人數', 'right'], ['姓名', 'left'], ['電話', 'left'], ['小計', 'right'], ['狀態', 'left']].map(([label, align]) => <TableCell key={label} align={align} className="whitespace-nowrap px-4 py-3">{label}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="px-4 py-4">{booking.tourTitle}</TableCell>
                <TableCell className="whitespace-nowrap px-4 py-4">{booking.date}</TableCell>
                <TableCell align="right" className="px-4 py-4">{booking.people}</TableCell>
                <TableCell className="px-4 py-4">{booking.name}<br />{booking.email}</TableCell>
                <TableCell className="whitespace-nowrap px-4 py-4">{booking.phone}</TableCell>
                <TableCell align="right" className="whitespace-nowrap px-4 py-4">{ntd(booking.subtotal)}</TableCell>
                <TableCell className="px-4 py-4"><StatusSelect booking={booking} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-8 grid gap-4 md:hidden">
        {bookings.map((booking) => (
          <Card key={booking.id} className="p-6">
            <h3 className="font-serif text-2xl font-semibold">{booking.tourTitle}</h3>
            <dl className="mt-3 grid gap-2 text-base">
              <div className="flex justify-between gap-4"><dt className="text-muted">出發日</dt><dd>{booking.date}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">人數</dt><dd className="text-right">{booking.people}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">姓名</dt><dd className="text-right">{booking.name}<br />{booking.email}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">電話</dt><dd>{booking.phone}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">小計</dt><dd className="text-right">{ntd(booking.subtotal)}</dd></div>
            </dl>
            <div className="mt-3"><StatusSelect booking={booking} /></div>
          </Card>
        ))}
      </div>
    </>
  );
}
