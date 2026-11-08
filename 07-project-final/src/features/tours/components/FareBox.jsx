import Typography from '@mui/material/Typography';

const Column = ({ title, items }) => (
  <section>
    <Typography variant="h3">{title}</Typography>
    <ul className="mt-4 list-disc pl-5 leading-relaxed">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </section>
);

export default function FareBox({ includes, excludes }) {
  return (
    <div className="rounded-card bg-white shadow-card mt-14 grid gap-8 p-6 sm:grid-cols-2 md:gap-12 md:p-8">
      <Column title="費用包含" items={includes} />
      <Column title="費用不含" items={excludes} />
    </div>
  );
}
