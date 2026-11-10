import Typography from '@mui/material/Typography';

export default function TourHighlights({ intro, highlights }) {
  return (
    <>
      <p className="mt-8 text-lg leading-relaxed">{intro}</p>
      <Typography variant="h2" className="mt-14">
        亮點
      </Typography>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {highlights.map((item) => (
          <li key={item} className="rounded-card bg-mist px-5 py-4 text-base">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
