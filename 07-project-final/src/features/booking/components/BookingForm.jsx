import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ntd } from '../../../format.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';

export default function BookingForm({ tour, departure, user }) {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [people, setPeople] = useState('2');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const name = user?.displayName || '';
  const email = user?.email || '';
  const subtotal = tour.price * Number(people);
  const error = actionData?.error ?? '';
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
      onSubmit={() => setSubmitted(true)}
    >
      <Typography variant="h2">填寫資料</Typography>
      <input type="hidden" name="tourId" value={tour.id} />
      <input type="hidden" name="tourTitle" value={tour.title} />
      <input type="hidden" name="departureId" value={departure.id} />
      <input type="hidden" name="date" value={departure.date} />
      <input type="hidden" name="people" value={people} />
      <input type="hidden" name="subtotal" value={subtotal} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="姓名"
          value={name}
          slotProps={{ input: { readOnly: true } }}
          error={submitted && !name.trim()}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          slotProps={{ input: { readOnly: true } }}
          error={submitted && !email.includes('@')}
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
        error={submitted && !phone.trim()}
        helperText=" "
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
        {submitting ? '送出中…' : '送出報名'}
      </Button>
    </Form>
  );
}
