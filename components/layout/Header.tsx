import Link from 'next/link';
import { Zap, Search } from 'lucide-react';
import CartButton from './CartButton';
import MobileMenu from './MobileMenu';
import { categories, getCategoryHref } from '@/lib/categories';

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
            <Link
              href="/products"
              className="font-orbitron text-[0.65rem] tracking-[0.18em] text-cyber-muted hover:text-cyber-cyan transition-colors duration-200 hover:drop-shadow-[0_0_6px_rgba(0,245,255,0.6)]"
            >
              ALL PRODUCTS
            </Link>

            {categories.map((cat) => (
              <div key={cat.slug} className="relative group py-6 -my-6">
                <Link
                  href={getCategoryHref(cat)}
                  className="font-orbitron text-[0.65rem] tracking-[0.18em] text-cyber-muted hover:text-cyber-cyan transition-colors duration-200 hover:drop-shadow-[0_0_6px_rgba(0,245,255,0.6)]"
                >
                  {cat.name.toUpperCase()}
                </Link>

                {cat.children && cat.children.length > 0 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 hidden group-hover:block z-50">
                    <div className="flex gap-8 bg-cyber-dark/98 backdrop-blur-xl border border-cyber-cyan/15 shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-6 whitespace-nowrap">
                      {cat.children.map((child) => (
                        <div key={child.slug} className="min-w-[150px]">
                          <Link
                            href={getCategoryHref(child)}
                            className="font-orbitron text-[0.65rem] tracking-wide text-cyber-cyan/90 hover:text-cyber-cyan transition-colors block mb-2.5"
                          >
                            {child.name}
                          </Link>
                          {child.children && child.children.length > 0 && (
                            <ul className="space-y-2 border-l border-cyber-cyan/10 pl-3">
                              {child.children.map((grandchild) => (
                                <li key={grandchild.slug}>
                                  <Link
                                    href={getCategoryHref(grandchild)}
                                    className="text-cyber-muted text-xs hover:text-cyber-text transition-colors"
                                  >
                                    {grandchild.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
