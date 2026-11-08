import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { dayOptions, regions } from '../../tours/mock.data.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';

export default function HeroSearch() {
  const navigate = useNavigate();
  const [region, setRegion] = useState('');
  const [days, setDays] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (region) params.set('region', region);
    if (days) params.set('days', days);
    navigate(`/tours?${params.toString()}`);
  };

  return (
    <form
      className="rounded-card bg-white shadow-card p-6 md:p-8"
      onSubmit={submit}
    >
      <Typography variant="h2">找一趟慢一點的行程</Typography>
      <p className="mt-2 text-muted">選地區與天數，或直接看全部。</p>
      <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
        <FieldSelect
          id="hero-region"
          label="地區"
          value={region}
          onChange={setRegion}
          options={[
            { value: '', label: '不限' },
            ...regions.map((item) => ({ value: item, label: item })),
          ]}
        />
        <FieldSelect
          id="hero-days"
          label="天數"
          value={days}
          onChange={setDays}
          options={[
            { value: '', label: '不限' },
            ...dayOptions.map((item) => ({
              value: String(item),
              label: `${item} 天`,
            })),
          ]}
        />
        <Button
          type="submit"
          variant="contained"
          className="min-h-14 md:min-w-40"
        >
          搜尋行程
        </Button>
      </div>
      <p className="mt-5">
        <Link
          className="font-bold text-action underline decoration-action/45 underline-offset-4 hover:text-action-hover"
          to="/tours"
        >
          看全部行程
        </Link>
      </p>
    </form>
  );
}
