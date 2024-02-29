import styles from '../styles/Login.module.css';
import { useState } from 'react';
import { useLogin } from './useLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Zustand für den Ladezustand hinzugefügt
  const { error, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Setzen Sie den Ladezustand auf true während der Anmeldung
    await login(email, password);
    setLoading(false); // Setzen Sie den Ladezustand auf false nach der Anmeldung
  };

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>
        <label>
          <span>Email</span>
          <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required // Hinzugefügt, um sicherzustellen, dass das Feld nicht leer ist
          />
        </label>
        <label>
          <span>Password</span>
          <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
            required // Hinzugefügt, um sicherzustellen, dass das Feld nicht leer ist
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </h2>
      {error && <p>{error}</p>}
    </form>
  );
}

