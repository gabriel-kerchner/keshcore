'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/products', label: 'ALL PRODUCTS' },
  { href: '/products?category=gaming', label: 'GAMING' },
  { href: '/products?category=pc-parts', label: 'PC PARTS' },
  { href: '/products?category=storage', label: 'STORAGE' },
  { href: '/products?category=monitors', label: 'MONITORS' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden p-2 text-cyber-muted hover:text-cyber-cyan transition-colors"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-cyber-dark/98 backdrop-blur-xl border-b border-cyber-cyan/10 animate-slide-down">
          <nav className="container mx-auto px-4 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-orbitron text-xs tracking-[0.18em] text-cyber-muted hover:text-cyber-cyan py-3 px-2 border-b border-cyber-cyan/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
