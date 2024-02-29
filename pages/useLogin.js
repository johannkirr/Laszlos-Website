import { useState, useEffect } from 'react';
import { auth } from './firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router'; // Importieren Sie useRouter

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Initialisieren Sie useRouter

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      try {
        const user = getAuth().currentUser;
        setIsLoggedIn(Boolean(user));
      } catch (error) {
        console.error('Error checking if user is logged in:', error);
      }
    };

    checkIfUserIsLoggedIn();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', res.user);
      setIsLoggedIn(true);
      router.push('/admin'); // Weiterleitung zur Admin-Komponente
    } catch (err) {
      setError(err.message);
      setIsLoggedIn(false);
    }
  };

  return { error, login, isLoggedIn };
};

