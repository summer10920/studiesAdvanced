import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { dayOptions, priceBands, regions, sortOptions } from '../data/options.js';
import FieldSelect from './FieldSelect.jsx';

const regionOptions = [{ value: '', label: '不限' }, ...regions.map((item) => ({ value: item, label: item }))];
const dayChoices = [{ value: '', label: '不限' }, ...dayOptions.map((item) => ({ value: String(item), label: `${item} 天` }))];

const read = (params) => ({
  region: params.get('region') ?? '',
  days: params.get('days') ?? '',
  price: params.get('price') ?? '',
  sort: params.get('sort') || 'price-asc',
});

export default function TourFilters() {
  const [params, setParams] = useSearchParams();
  const query = params.toString();
  const [draft, setDraft] = useState(() => read(params));
  useEffect(() => { setDraft(read(new URLSearchParams(query))); }, [query]);
  const [open, setOpen] = useState('region');
  const theme = params.get('theme') ?? '';
  const set = (key) => (value) => setDraft((current) => ({ ...current, [key]: value }));

  const apply = (event) => {
    event.preventDefault();
    const next = new URLSearchParams();
    if (draft.region) next.set('region', draft.region);
    if (draft.days) next.set('days', draft.days);
    if (draft.price) next.set('price', draft.price);
    if (draft.sort && draft.sort !== 'price-asc') next.set('sort', draft.sort);
    if (theme) next.set('theme', theme);
    setParams(next);
  };

  const fields = [
    { key: 'region', label: '地區', options: regionOptions },
    { key: 'days', label: '天數', options: dayChoices },
    { key: 'price', label: '價格', options: priceBands },
    { key: 'sort', label: '排序', options: sortOptions },
  ];

  return (
    <form className="mt-8" onSubmit={apply}>
      <div className="md:hidden">
        {fields.map((field) => (
          <Accordion key={field.key} expanded={open === field.key} onChange={(_, expanded) => setOpen(expanded ? field.key : '')} className="mb-2">
            <AccordionSummary>{field.label}</AccordionSummary>
            <AccordionDetails>
              <FieldSelect id={`m-${field.key}`} label={field.label} hiddenLabel value={draft[field.key]} onChange={set(field.key)} options={field.options} />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <div className="hidden gap-4 md:grid md:grid-cols-4">
        {fields.map((field) => (
          <FieldSelect key={field.key} id={field.key} label={field.label} value={draft[field.key]} onChange={set(field.key)} options={field.options} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="submit" variant="contained">套用條件</Button>
        <Button type="button" variant="outlined" onClick={() => { setDraft({ region: '', days: '', price: '', sort: 'price-asc' }); setParams(new URLSearchParams()); }}>清除</Button>
      </div>
      {theme ? <Chip className="mt-4" color="primary" label={`主題：${theme}`} onDelete={() => { const next = new URLSearchParams(params); next.delete('theme'); setParams(next); }} /> : null}
    </form>
  );
}
