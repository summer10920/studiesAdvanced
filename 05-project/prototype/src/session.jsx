import { createContext, useContext, useMemo, useState } from 'react';

const KEY = 'loki-travel-session';
const SessionContext = createContext(null);

const readUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || 'null');
  } catch {
    return null;
  }
};

export function SessionProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const api = useMemo(() => ({
    user,
    signIn() {
      const next = { name: '林可', email: 'lin@example.com', role: 'member' };
      sessionStorage.setItem(KEY, JSON.stringify(next));
      setUser(next);
    },
    signInAdmin() {
      const next = { name: '管理員', email: 'admin@gmail.com', role: 'admin' };
      sessionStorage.setItem(KEY, JSON.stringify(next));
      setUser(next);
    },
    signOut() {
      sessionStorage.removeItem(KEY);
      setUser(null);
    },
  }), [user]);
  return <SessionContext.Provider value={api}>{children}</SessionContext.Provider>;
}

export const useSession = () => useContext(SessionContext);
