'use client';

import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AccountButton() {
  const { isLoggedIn, loading, login, logout } = useAuth();

  return (
    <button
      onClick={isLoggedIn ? logout : login}
      disabled={loading}
      className="relative p-2 text-cyber-muted hover:text-cyber-cyan transition-colors group disabled:opacity-40"
      aria-label={isLoggedIn ? 'Log out' : 'Log in'}
      title={isLoggedIn ? 'Log out' : 'Log in'}
    >
      {isLoggedIn ? (
        <LogOut className="w-5 h-5 group-hover:drop-shadow-[0_0_6px_rgba(0,245,255,0.6)] transition-all" />
      ) : (
        <User className="w-5 h-5 group-hover:drop-shadow-[0_0_6px_rgba(0,245,255,0.6)] transition-all" />
      )}
    </button>
  );
}
