import Link from 'next/link';
import { User } from '@/payload-types';
import { logoutAction } from '../actions/logout-action';

export const Navbar = ({ user }: { user: User | null }) => {
  return (
    <>
      <nav className="navbar">
        <Link href="/" className="nav-link">
          Blog
        </Link>
        {user ? (
          <button onClick={logoutAction} className='nav-btn'>Logout</button>
        ) : (
          <Link href="/login" className="nav-link">
            Login
          </Link>
        )}
      </nav>
    </>
  );
};
