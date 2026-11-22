import { useEffect, useState } from 'react';
import { getItem } from '../api/fake-api.js';

export function usePost(id) {
  const [status, setStatus] = useState('loading');
  const [post, setPost] = useState(null);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setStatus('loading');
      try {
        const data = await getItem(id);
        if (ignore) return;
        setPost(data);
        setStatus('ready');
      } catch {
        if (ignore) return;
        setPost(null);
        setStatus('error');
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  return { status, post };
}
