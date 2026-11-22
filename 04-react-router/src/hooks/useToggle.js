import { useState } from 'react';

export function useToggle(initialOpen) {
  const [open, setOpen] = useState(initialOpen);

  const toggle = () => {
    setOpen((value) => !value);
  };

  return { open, toggle };
}
