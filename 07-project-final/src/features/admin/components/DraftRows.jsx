import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function DraftRows({
  title,
  items,
  blank,
  addLabel,
  onChange,
  children,
}) {
  const update = (index, next) =>
    onChange(items.map((item, current) => (current === index ? next : item)));
  const remove = (index) =>
    onChange(items.filter((_, current) => current !== index));

  return (
    <div className="sm:col-span-2 grid gap-4">
      <Typography variant="h3">{title}</Typography>
      {items.map((item, index) => (
        <div
          key={index}
          className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {children(item, index, update)}
          </div>
          <Button
            type="button"
            color="error"
            variant="outlined"
            onClick={() => remove(index)}
          >
            刪除
          </Button>
        </div>
      ))}
      <div>
        <Button
          type="button"
          variant="outlined"
          onClick={() => onChange([...items, blank])}
        >
          {addLabel}
        </Button>
      </div>
    </div>
  );
}
