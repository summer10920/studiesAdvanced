import { useEffect, useState } from 'react';
import { getTour, listMyOrders, listOrders, listTours } from './api.js';

export function useAsync(load, deps) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let active = true;
    // load 每次 render 都是新函式，不放進依賴；真正會變的是 deps 與 tick。
    setLoading(true);
    setError(null);
    setData(null);
    load()
      .then((value) => {
        if (active) setData(value);
      })
      .catch((err) => {
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [tick, ...deps]);

  return { data, error, loading, reload: () => setTick((n) => n + 1) };
}

export const useTours = () => useAsync(listTours, []);
export const useTour = (id) => useAsync(() => getTour(id), [id]);
export const useOrders = () => useAsync(listOrders, []);
export const useMyOrders = (uid) => useAsync(() => listMyOrders(uid), [uid]);
