import { useEffect, useState } from 'react';
import { getItems } from '../api/fake-api.js';

export function useLocalItems() {
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setItems(await getItems(controller.signal));
        setStatus('ready');
      } catch (error) {
        if (error.name === 'AbortError') return;
        setItems([]);
        setStatus('error');
      }
    };
    load();
    return () => controller.abort();
  }, []);

  return { status, items };
}
