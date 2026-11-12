import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function TourEmpty({ onClear, message }) {
  return (
    <section className="mt-16 rounded-card bg-foam px-6 py-10 shadow-card">
      <Typography variant="h2">沒有符合的行程</Typography>
      <p className="mt-3 max-w-prose">
        {message ?? '換一個地區或天數，或清掉價格條件。'}
      </p>
      <Button className="mt-6" variant="contained" onClick={onClear}>
        清除條件
      </Button>
    </section>
  );
}
