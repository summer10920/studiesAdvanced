import { useEffect, useState } from 'react';
import {
  getOrder,
  getTour,
  listMyOrders,
  listOrders,
  listTours,
} from './api.js';

export function useAsync(load, key) {
  const [tick, setTick] = useState(0);
  const requestKey = `${key ?? ''}:${tick}`;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seenKey, setSeenKey] = useState(requestKey);

  if (seenKey !== requestKey) {
    setSeenKey(requestKey);
    setData(null);
    setError(null);
    setLoading(true);
  }

  useEffect(() => {
    let active = true;
    load(key)
      .then((value) => {
        if (active) {
          setData(value);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setData(null);
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [requestKey, load, key]);

  return { data, error, loading, reload: () => setTick((n) => n + 1) };
}

export const useTours = () => useAsync(listTours, 'tours');
export const useTour = (id) => useAsync(getTour, id);
export const useOrder = (id) => useAsync(getOrder, id);
export const useOrders = () => useAsync(listOrders, 'orders');
export const useMyOrders = (uid) => useAsync(listMyOrders, uid);
