import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createOrder } from '../../../api.js';
import { ntd } from '../../../format.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';

export default function BookingForm({ tour, departure, onDone }) {
  const [people, setPeople] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const subtotal = tour.price * Number(people);
  const invalid = !name.trim() || !email.includes('@') || !phone.trim();

  const submit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (invalid) {
      setError('請填姓名、有效的 email 與電話');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const row = await createOrder({
        tourId: tour.id,
        tourTitle: tour.title,
        departureId: departure.id,
        date: departure.date,
        people: Number(people),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subtotal,
      });
      onDone(row);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <form id="booking-form" noValidate className="rounded-card bg-white shadow-card grid gap-4 p-6 md:p-8" onSubmit={submit}>
      <Typography variant="h2">填寫資料</Typography>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="姓名" required value={name} error={submitted && !name.trim()} onChange={(event) => setName(event.target.value)} />
        <TextField label="Email" type="email" required value={email} error={submitted && !email.includes('@')} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <FieldSelect id="people" label="人數" value={people} onChange={setPeople} options={[1, 2, 3, 4, 5, 6, 7, 8].map((count) => ({ value: String(count), label: String(count) }))} />
      <TextField label="電話" type="tel" required placeholder="0912000111" value={phone} error={submitted && !phone.trim()} helperText=" " onChange={(event) => setPhone(event.target.value)} />
      {error ? <Alert severity="error">{error}</Alert> : null}
      <p>小計 <span className="font-serif text-2xl font-bold text-action">{ntd(subtotal)}</span></p>
      <p className="text-muted">小計會依人數更新。送出後我們用 email 確認。</p>
      <Button type="submit" variant="contained" disabled={busy}>{busy ? '送出中…' : '送出報名'}</Button>
    </form>
  );
}
