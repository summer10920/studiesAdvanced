import { useState } from 'react';
import { useFetcher } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FieldSelect from '../../../_shared/FieldSelect.jsx';
import { ntd, statusLabel } from '../../../format.js';

const statuses = ['pending', 'confirmed', 'cancelled'];

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <dt className="text-muted">{label}</dt>
    <dd className="text-right">{value}</dd>
  </div>
);

/**
 * 報名明細 Dialog。open 控制開關，booking 是這一筆報名，onClose 只給取消鈕。
 * useFetcher({ key: 'booking-form' }) 與 AdminBookingsPage 共用同一個 fetcher；只負責送出新狀態，結果由頁面讀取。
 * @param {{ open: boolean, booking: object | null, onClose: () => void }} props
 * @returns {JSX.Element}
 */
export default function BookingForm({ open, booking, onClose }) {
  const fetcher = useFetcher({ key: 'booking-form' });
  const error =
    fetcher.state === 'idle' && fetcher.data?.error ? fetcher.data.error : '';
  const [status, setStatus] = useState(booking?.status ?? 'pending');
  const [confirmCancel, setConfirmCancel] = useState(false);

  const commit = () => {
    fetcher.submit({ id: booking.id, status }, { method: 'post' });
  };

  const submit = (event) => {
    event.preventDefault();
    if (status === 'cancelled' && booking.status !== 'cancelled') {
      setConfirmCancel(true);
      return;
    }
    commit();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        scroll="paper"
      >
        <form onSubmit={submit}>
          <DialogTitle>報名明細</DialogTitle>
          <DialogContent className="grid gap-4 pt-2">
            {booking ? (
              <dl className="grid gap-2 text-base">
                <Row label="行程" value={booking.tourTitle} />
                <Row label="出發日" value={booking.date} />
                <Row label="聯絡人" value={booking.name} />
                <Row label="Email" value={booking.email} />
                <Row label="電話" value={booking.phone} />
                <Row label="人數" value={booking.people} />
                <Row label="金額" value={ntd(booking.subtotal)} />
              </dl>
            ) : null}
            {error ? <Alert severity="error">{error}</Alert> : null}
            <FieldSelect
              id="booking-status"
              label="狀態"
              value={status}
              onChange={setStatus}
              options={statuses.map((item) => ({
                value: item,
                label: statusLabel[item],
              }))}
            />
          </DialogContent>
          <DialogActions className="flex-wrap gap-2 p-4">
            <Button
              type="submit"
              variant="contained"
              disabled={fetcher.state !== 'idle'}
            >
              儲存
            </Button>
            <Button type="button" onClick={onClose}>
              取消
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={confirmCancel} onClose={() => setConfirmCancel(false)}>
        <DialogTitle>改為已取消？</DialogTitle>
        <DialogContent>
          紀錄會留下，以便對帳與計算名額。這就是這筆訂單的刪除。
        </DialogContent>
        <DialogActions className="gap-2 p-4">
          <Button onClick={() => setConfirmCancel(false)}>返回</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setConfirmCancel(false);
              commit();
            }}
          >
            確認取消
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
