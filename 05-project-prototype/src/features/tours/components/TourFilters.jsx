import { useSearchParams } from 'react-router';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { dayOptions, priceBands, regions, sortOptions } from '../mock.data.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';

const regionOptions = [{ value: '', label: '不限' }, ...regions.map((item) => ({ value: item, label: item }))];
const dayChoices = [{ value: '', label: '不限' }, ...dayOptions.map((item) => ({ value: String(item), label: `${item} 天` }))];

export default function TourFilters() {
  const [params, setParams] = useSearchParams();
  const theme = params.get('theme') ?? '';
  const region = params.get('region') ?? '';
  const days = params.get('days') ?? '';
  const price = params.get('price') ?? '';
  const sort = params.get('sort') || 'price-asc';

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || (key === 'sort' && value === 'price-asc')) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setParams(next);
  };

  const clear = () => setParams(new URLSearchParams());

  const clearTheme = () => {
    const next = new URLSearchParams(params);
    next.delete('theme');
    setParams(next);
  };

  return (
    <div className="mt-8">
      <div className="grid gap-4 md:grid-cols-4">
        <FieldSelect id="region" label="地區" value={region} onChange={(value) => set('region', value)} options={regionOptions} />
        <FieldSelect id="days" label="天數" value={days} onChange={(value) => set('days', value)} options={dayChoices} />
        <FieldSelect id="price" label="價格" value={price} onChange={(value) => set('price', value)} options={priceBands} />
        <FieldSelect id="sort" label="排序" value={sort} onChange={(value) => set('sort', value)} options={sortOptions} />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" variant="outlined" onClick={clear}>清除</Button>
      </div>
      {theme ? <Chip className="mt-4" color="primary" label={`主題：${theme}`} onDelete={clearTheme} /> : null}
    </div>
  );
}
