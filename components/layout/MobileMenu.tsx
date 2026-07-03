'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { categories, getCategoryHref, type CategoryItem } from '@/lib/categories';

function AccordionItem({
  item,
  depth = 0,
  onNavigate,
}: {
  item: CategoryItem;
  depth?: number;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = !!item.children?.length;

  return (
    <div className={depth > 0 ? 'pl-4 border-l border-cyber-cyan/10' : ''}>
      <div className="flex items-center justify-between">
        <Link
          href={getCategoryHref(item)}
          onClick={onNavigate}
          className={`font-orbitron tracking-[0.14em] text-cyber-muted hover:text-cyber-cyan py-3 transition-colors ${
            depth === 0 ? 'text-xs' : 'text-[0.65rem]'
          }`}
        >
          {depth === 0 ? item.name.toUpperCase() : item.name}
        </Link>
        {hasChildren && (
          <button
            type="button"
            aria-label={`Toggle ${item.name} submenu`}
            onClick={() => setExpanded((v) => !v)}
            className="p-3 text-cyber-muted hover:text-cyber-cyan transition-colors"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="flex flex-col gap-0.5 pb-2">
          {item.children!.map((child) => (
            <AccordionItem key={child.slug} item={child} depth={depth + 1} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

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
        <div className="lg:hidden absolute top-full left-0 right-0 max-h-[calc(100vh-4rem)] overflow-y-auto bg-cyber-dark/98 backdrop-blur-xl border-b border-cyber-cyan/10 animate-slide-down">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            <Link
              href="/products"
              onClick={close}
              className="font-orbitron text-xs tracking-[0.14em] text-cyber-muted hover:text-cyber-cyan py-3 border-b border-cyber-cyan/5 transition-colors"
            >
              ALL PRODUCTS
            </Link>
            {categories.map((cat) => (
              <div key={cat.slug} className="border-b border-cyber-cyan/5">
                <AccordionItem item={cat} onNavigate={close} />
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
