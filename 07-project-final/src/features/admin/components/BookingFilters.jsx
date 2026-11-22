import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { statusLabel } from '../../../format.js';

const statusOptions = ['all', 'pending', 'confirmed', 'cancelled'];

export default function BookingFilters({
  status,
  query,
  sort,
  onStatusChange,
  onQueryChange,
  onSortChange,
}) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_minmax(0,14rem)]">
      <TextField
        select
        label="狀態"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        {statusOptions.map((value) => (
          <MenuItem key={value} value={value}>
            {value === 'all' ? '全部' : statusLabel[value]}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="搜尋姓名"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="輸入姓名"
      />
      <TextField
        select
        label="日期排序"
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <MenuItem value="date-desc">出發日新到舊</MenuItem>
        <MenuItem value="date-asc">出發日舊到新</MenuItem>
      </TextField>
    </div>
  );
}
