import Link from "next/link";
import { Zap, Mail } from "lucide-react";
import NewsletterForm from "./NewsletterForm";
import { categories, getCategoryHref } from "@/lib/categories";

const links = {
  shop: [
    { href: "/products", label: "All Products" },
    ...categories.map((cat) => ({ href: getCategoryHref(cat), label: cat.name })),
  ],
  support: [
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns Policy" },
    { href: "/warranty", label: "Warranty" },
    { href: "/contact", label: "Contact Us" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
};

const socials = [
  { href: "mailto:support.keshcore@gmail.com", label: "Email", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative bg-cyber-dark border-t border-cyber-cyan/10">
      {/* Top accent */}
      <div className="neon-divider" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Zap className="w-5 h-5 text-cyber-cyan group-hover:drop-shadow-[0_0_8px_#00f5ff] transition-all" />
              <span className="font-orbitron font-black text-base tracking-widest">
                <span className="text-cyber-text">KESH</span>
                <span className="neon-text-cyan">CORE</span>
              </span>
            </Link>
            <p className="text-cyber-muted text-sm leading-relaxed mb-5">
              Premium gaming & tech hardware for UK enthusiasts. Fuelling your
              setup, one component at a time.
            </p>
            <div className="flex gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 border border-cyber-cyan/10 text-cyber-muted hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-orbitron text-xs tracking-[0.2em] text-cyber-cyan mb-5 uppercase">
              Shop
            </h4>
            <ul className="space-y-3">
              {links.shop.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-cyber-muted text-sm hover:text-cyber-text transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-orbitron text-xs tracking-[0.2em] text-cyber-cyan mb-5 uppercase">
              Support
            </h4>
            <ul className="space-y-3">
              {links.support.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-cyber-muted text-sm hover:text-cyber-text transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-orbitron text-xs tracking-[0.2em] text-cyber-cyan mb-5 uppercase">
              Stay Updated
            </h4>
            <p className="text-cyber-muted text-sm mb-4">
              Get the latest drops, deals and cyber-exclusive offers.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-cyber-cyan/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cyber-muted text-xs font-space">
            © {new Date().getFullYear()} KeshCore Ltd. All rights reserved.
            Registered in England & Wales.
          </p>
          <div className="flex gap-5">
            {links.legal.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-cyber-muted text-xs hover:text-cyber-cyan transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
