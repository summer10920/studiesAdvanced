import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function FieldSelect({ id, label, value, onChange, options, hiddenLabel = false }) {
  return (
    <FormControl className="w-full">
      <InputLabel id={`${id}-label`} className={hiddenLabel ? 'sr-only' : undefined}>{label}</InputLabel>
      <Select labelId={`${id}-label`} id={id} label={hiddenLabel ? undefined : label} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <MenuItem key={option.value || 'all'} value={option.value}>{option.label}</MenuItem>)}
      </Select>
    </FormControl>
  );
}
