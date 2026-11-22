import { redirect } from 'react-router';
import { signOut } from 'firebase/auth';
import { auth, firebaseReady } from './firebase.js';

const snapshot = (user) =>
  user
    ? {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        provider: user.providerData?.[0]?.providerId ?? null,
      }
    : null;

export const session = async () => {
  if (!firebaseReady || !auth) return { firebaseReady: false, user: null };
  await auth.authStateReady();
  return { firebaseReady: true, user: snapshot(auth.currentUser) };
};

export const requireUser = async (request) => {
  const current = await session();
  if (!current.firebaseReady) return current;
  if (!current.user) {
    const url = new URL(request.url);
    throw redirect(
      `/login?next=${encodeURIComponent(`${url.pathname}${url.search}`)}`,
    );
  }
  return current;
};

export const requireAdmin = async (request) => {
  const current = await requireUser(request);
  if (!current.firebaseReady) return { ...current, denied: false };
  if (current.user.provider !== 'password') return { ...current, denied: true };
  return { ...current, denied: false };
};

export const safeNext = (value) =>
  typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
    ? value
    : '/';

export const rootLoader = () => session();

export const logoutLoader = () => redirect('/');

export const logoutAction = async () => {
  if (auth) await signOut(auth);
  return redirect('/');
};
