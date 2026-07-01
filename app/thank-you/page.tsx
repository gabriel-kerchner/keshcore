import Link from 'next/link';
import type { Metadata } from 'next';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Thank you for your order from KeshCore!',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center px-4">
      <div className="cyber-bg-grid absolute inset-0 opacity-30" />
      <div className="relative z-10 text-center max-w-lg mx-auto">

        {/* Icon */}
        <div className="inline-flex p-6 border border-cyber-green/20 bg-cyber-green/5 text-cyber-green mb-8 animate-pulse-neon">
          <CheckCircle className="w-12 h-12" />
        </div>

        {/* Heading */}
        <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-cyber-text mb-4">
          ORDER <span className="neon-text-cyan">CONFIRMED</span>
        </h1>

        <p className="text-cyber-muted text-lg mb-2">
          Thank you for your purchase!
        </p>
        <p className="text-cyber-muted/70 text-sm mb-10 leading-relaxed">
          You&apos;ll receive a confirmation email shortly with your order details and tracking information.
        </p>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
          <div className="cyber-card p-5">
            <Package className="w-5 h-5 text-cyber-cyan mb-3" />
            <h3 className="font-orbitron text-xs font-bold tracking-wide text-cyber-text mb-1">
              FAST DISPATCH
            </h3>
            <p className="text-cyber-muted text-xs">
              Orders placed before 3pm ship the same day via tracked courier.
            </p>
          </div>
          <div className="cyber-card p-5">
            <CheckCircle className="w-5 h-5 text-cyber-green mb-3" />
            <h3 className="font-orbitron text-xs font-bold tracking-wide text-cyber-text mb-1">
              UK WARRANTY
            </h3>
            <p className="text-cyber-muted text-xs">
              All items covered by full UK manufacturer warranty.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="cyber-btn cyber-btn-primary cyber-btn-lg">
            CONTINUE SHOPPING
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link href="/" className="cyber-btn cyber-btn-lg">
            BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
