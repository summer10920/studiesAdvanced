import { useEffect, useMemo, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, firebaseReady, missingFirebaseMessage } from './firebase.js';
import { AuthContext } from './auth-context.js';

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

  const api = useMemo(
    () => ({
      user,
      provider: user?.providerData?.[0]?.providerId ?? null,
      ready,
      firebaseReady,
      signInWithGoogle() {
        if (!auth) return Promise.reject(new Error(missingFirebaseMessage));
        return signInWithPopup(auth, new GoogleAuthProvider());
      },
      signIn(email, password) {
        if (!auth) return Promise.reject(new Error(missingFirebaseMessage));
        return signInWithEmailAndPassword(auth, email, password);
      },
      signOut() {
        return auth ? signOut(auth) : Promise.resolve();
      },
    }),
    [user, ready],
  );

  return <AuthContext value={api}>{children}</AuthContext>;
}
