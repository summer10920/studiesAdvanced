import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { tours } from './features/tours/mock.data.js';
import { db, missingFirebaseMessage } from './firebase.js';

const database = () => {
  if (!db) throw new Error(missingFirebaseMessage);
  return db;
};

export const listTours = async () => {
  const snap = await getDocs(collection(database(), 'tours'));
  return snap.docs
    .map((item) => ({ id: item.id, ...item.data() }))
    .sort((a, b) => a.title.localeCompare(b.title, 'zh-Hant'));
};

export const getTour = async (id) => {
  const snap = await getDoc(doc(database(), 'tours', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const seedTours = async () => {
  const base = database();
  let created = 0;
  for (const tour of tours) {
    const ref = doc(base, 'tours', tour.id);
    if ((await getDoc(ref)).exists()) continue;
    await setDoc(ref, tour);
    created += 1;
  }
  return created;
};

export const createOrder = async (input) => {
  const ref = await addDoc(collection(database(), 'orders'), {
    ...input,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, status: 'pending', ...input };
};

export const listOrders = async () => {
  const snap = await getDocs(
    query(collection(database(), 'orders'), orderBy('createdAt', 'desc')),
  );
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }));
};

export const listMyOrders = async (uid) => {
  const snap = await getDocs(
    query(collection(database(), 'orders'), where('uid', '==', uid)),
  );
  return snap.docs
    .map((item) => ({ id: item.id, ...item.data() }))
    .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
};

export const updateOrderStatus = async (id, status) => {
  await updateDoc(doc(database(), 'orders', id), { status });
};
