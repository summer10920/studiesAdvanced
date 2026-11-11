import { useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ntd } from '../../../format.js';
import { useStore } from '../../../store-context.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';

const preview = { name: '林可', email: 'lin@example.com' };

export default function BookingForm({ tour, departure }) {
  const navigate = useNavigate();
  const { createBooking } = useStore();
  const [people, setPeople] = useState('2');
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const subtotal = tour.price * Number(people);
  const phoneInvalid = !phone.trim();
  const showPhoneError = (touched || submitted) && phoneInvalid;

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (phoneInvalid) {
      setError('請填電話，此欄必填');
      return;
    }
    const row = createBooking({
      tourId: tour.id,
      tourTitle: tour.title,
      departureId: departure.id,
      date: departure.date,
      people: Number(people),
      name: preview.name,
      email: preview.email,
      phone: phone.trim(),
      subtotal,
    });
    navigate(`/booking/${row.id}`, { replace: true });
  };

  return (
    <form
      id="booking-form"
      noValidate
      className="rounded-card bg-white shadow-card grid gap-4 p-6 md:p-8"
      onSubmit={submit}
    >
      <Typography variant="h2">填寫資料</Typography>
      <Alert severity="success">
        預覽 · {preview.name} · {preview.email}
      </Alert>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="姓名"
          value={preview.name}
          slotProps={{ input: { readOnly: true } }}
        />
        <TextField
          label="Email"
          type="email"
          value={preview.email}
          slotProps={{ input: { readOnly: true } }}
        />
      </div>
      <FieldSelect
        id="people"
        label="人數"
        value={people}
        onChange={setPeople}
        options={[1, 2, 3, 4, 5, 6, 7, 8].map((count) => ({
          value: String(count),
          label: String(count),
        }))}
      />
      <TextField
        label="電話"
        type="tel"
        required
        placeholder="0912000111"
        value={phone}
        error={showPhoneError}
        helperText={showPhoneError ? '必填：請留下可聯絡的電話' : ' '}
        onBlur={() => setTouched(true)}
        onChange={(event) => {
          setPhone(event.target.value);
          if (event.target.value.trim()) setError('');
        }}
      />
      {error ? <Alert severity="error">{error}</Alert> : null}
      <p>
        小計{' '}
        <span className="font-serif text-2xl font-bold text-action">
          {ntd(subtotal)}
        </span>
      </p>
      <p className="text-muted">小計會依人數更新。送出後我們用 email 確認。</p>
      <Button type="submit" variant="contained">
        送出報名
      </Button>
    </form>
  );
}
