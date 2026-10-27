import { useEffect, useState } from 'react';
import { getItems } from '../api/fake-api.js';

export function useFilteredItems(minPrice) {
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setStatus('loading');
        const list = await getItems(controller.signal);
        setItems(list.filter((item) => item.price >= minPrice));
        setStatus('ready');
      } catch (error) {
        if (error.name === 'AbortError') return;
        setItems([]);
        setStatus('error');
      }
    };
    load();
    return () => controller.abort();
  }, [minPrice]);

  return { status, items };
}
