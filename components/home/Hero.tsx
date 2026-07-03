import Link from 'next/link';
import { ArrowRight, Zap, Shield, Truck, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 cyber-bg-grid" />
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black/60 via-transparent to-cyber-black" />
      <div className="scanlines absolute inset-0 opacity-30 pointer-events-none" />

      {/* Decorative horizontal lines */}
      <div className="absolute top-[30%] left-0 w-[40%] h-px bg-gradient-to-r from-cyber-cyan/40 to-transparent" />
      <div className="absolute top-[70%] right-0 w-[35%] h-px bg-gradient-to-l from-cyber-pink/30 to-transparent" />
      <div className="absolute top-[50%] right-[5%] h-32 w-px bg-gradient-to-b from-transparent via-cyber-purple/30 to-transparent" />

      {/* Corner decorations */}
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyber-cyan/20 hidden md:block" />
      <div className="absolute bottom-16 left-8 w-16 h-16 border-b-2 border-l-2 border-cyber-pink/20 hidden md:block" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-5xl">

          {/* Label */}
          <div className="flex items-center gap-3 mb-7 animate-fade-in">
            <div className="h-px w-10 bg-cyber-cyan opacity-70" />
            <span className="font-orbitron text-[0.6rem] tracking-[0.4em] text-cyber-cyan/80 uppercase">
              UK Gaming &amp; Tech Store
            </span>
            <div className="h-px w-10 bg-cyber-cyan opacity-70" />
          </div>

          {/* Main headline */}
          <h1 className="font-orbitron font-black leading-[0.9] tracking-tight mb-8 animate-fade-in">
            <span className="block text-4xl sm:text-6xl lg:text-8xl text-cyber-text drop-shadow-[0_0_40px_rgba(0,245,255,0.08)]">
              GEAR UP.
            </span>
            <span className="block text-4xl sm:text-6xl lg:text-8xl neon-text-cyan mt-1">
              LEVEL UP.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-cyber-muted font-space text-lg sm:text-xl max-w-2xl leading-relaxed mb-10 animate-fade-in">
            Premium gaming peripherals, PC components, and SSDs — handpicked for UK
            gamers and tech enthusiasts.{' '}
            <span className="text-cyber-cyan font-medium">Free & Express delivery</span> across the
            United Kingdom.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-16 animate-fade-in">
            <Link href="/products" className="cyber-btn cyber-btn-primary cyber-btn-lg group">
              SHOP NOW
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/products?sort=newest" className="cyber-btn cyber-btn-pink cyber-btn-lg">
              NEW ARRIVALS
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 sm:gap-10 animate-fade-in">
            {[
              { icon: Truck, text: 'Free & Express UK Delivery', sub: 'DHL: 3-8 or 2-5 days' },
              { icon: Shield, text: 'Official UK Warranty', sub: 'All products covered' },
              { icon: Zap, text: 'DHL Express £5', sub: '2-5 Business Days' },
              { icon: Star, text: 'Expert Support', sub: 'Real gamers, real advice' },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="p-2 border border-cyber-cyan/15 text-cyber-cyan">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-cyber-text text-sm font-medium font-space">{text}</div>
                  <div className="text-cyber-muted text-xs">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyber-black to-transparent pointer-events-none" />
    </section>
  );
}
