import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, firebaseReady, missingFirebaseMessage } from './firebase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(!firebaseReady);

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, (next) => {
      setUser(next);
      setReady(true);
    });
  }, []);

  const api = useMemo(() => ({
    user,
    ready,
    firebaseReady,
    signIn(email, password) {
      if (!auth) return Promise.reject(new Error(missingFirebaseMessage));
      return signInWithEmailAndPassword(auth, email, password);
    },
    signOut() {
      return auth ? signOut(auth) : Promise.resolve();
    },
  }), [user, ready]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
