import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ntd } from '../../../format.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';

const preview = { name: '林可', email: 'lin@example.com' };

export default function BookingForm({ tour, departure }) {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [people, setPeople] = useState('2');
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const subtotal = tour.price * Number(people);
  const phoneInvalid = !phone.trim();
  const error = actionData?.error ?? '';
  const showPhoneError = (touched || Boolean(error)) && phoneInvalid;
  const submitting =
    navigation.state === 'submitting' &&
    new URL(navigation.formAction, 'http://localhost').pathname === '/booking';

  return (
    <Form
      id="booking-form"
      method="post"
      replace
      noValidate
      className="rounded-card bg-white shadow-card grid gap-4 p-6 md:p-8"
    >
      <Typography variant="h2">填寫資料</Typography>
      <Alert severity="success">
        預覽 · {preview.name} · {preview.email}
      </Alert>
      <input type="hidden" name="tourId" value={tour.id} />
      <input type="hidden" name="tourTitle" value={tour.title} />
      <input type="hidden" name="departureId" value={departure.id} />
      <input type="hidden" name="date" value={departure.date} />
      <input type="hidden" name="people" value={people} />
      <input type="hidden" name="name" value={preview.name} />
      <input type="hidden" name="email" value={preview.email} />
      <input type="hidden" name="subtotal" value={subtotal} />
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
        name="phone"
        label="電話"
        type="tel"
        required
        placeholder="0912000111"
        value={phone}
        error={showPhoneError}
        helperText={showPhoneError ? '必填：請留下可聯絡的電話' : ' '}
        onBlur={() => setTouched(true)}
        onChange={(event) => setPhone(event.target.value)}
      />
      {error ? <Alert severity="error">{error}</Alert> : null}
      <p>
        小計{' '}
        <span className="font-serif text-2xl font-bold text-action">
          {ntd(subtotal)}
        </span>
      </p>
      <p className="text-muted">小計會依人數更新。送出後我們用 email 確認。</p>
      <Button type="submit" variant="contained" disabled={submitting}>
        送出報名
      </Button>
    </Form>
  );
}
