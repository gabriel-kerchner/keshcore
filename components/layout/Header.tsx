import Link from 'next/link';
import { Zap, Search } from 'lucide-react';
import CartButton from './CartButton';
import MobileMenu from './MobileMenu';

const navLinks = [
  { href: '/products', label: 'ALL PRODUCTS' },
  { href: '/products?category=gaming', label: 'GAMING' },
  { href: '/products?category=pc-parts', label: 'PC PARTS' },
  { href: '/products?category=storage', label: 'STORAGE' },
  { href: '/products?category=monitors', label: 'MONITORS' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glass backdrop */}
      <div className="absolute inset-0 bg-cyber-black/85 backdrop-blur-xl border-b border-cyber-cyan/10" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-40" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative">
              <Zap className="w-5 h-5 text-cyber-cyan group-hover:drop-shadow-[0_0_8px_#00f5ff] transition-all duration-300" />
            </div>
            <span className="font-orbitron font-black text-base tracking-widest select-none">
              <span className="text-cyber-text">KESH</span>
              <span className="neon-text-cyan">CORE</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-orbitron text-[0.65rem] tracking-[0.18em] text-cyber-muted hover:text-cyber-cyan transition-colors duration-200 hover:drop-shadow-[0_0_6px_rgba(0,245,255,0.6)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <Link
              href="/products"
              className="p-2 text-cyber-muted hover:text-cyber-cyan transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Link>

            <CartButton />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
