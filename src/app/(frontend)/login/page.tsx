'use client';

import { loginAction } from '@/app/actions/login-action';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await loginAction({ email, password });
      router.push('/');
    } catch (error) {
      if (
        error instanceof Error &&
        error.message ==
          'This user is locked due to having too many failed login attempts.'
      ) {
        setErrorMessage(
          'Too many failed attempts, please try again 2 minutes later.'
        );
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="authform-container">
      <p className="form-title">Login</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="auth-form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <Link href="/signup">Create account here</Link>
        <div>
          <button type="submit" className="create-btn">
            Login
          </button>
        </div>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
