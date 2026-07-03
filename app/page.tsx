import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { CheckCircle, Zap, Globe, Headphones } from "lucide-react";

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="cyber-card overflow-hidden">
          <div className="aspect-square bg-cyber-dark animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="h-3 bg-cyber-dark rounded animate-pulse w-1/3" />
            <div className="h-4 bg-cyber-dark rounded animate-pulse" />
            <div className="h-4 bg-cyber-dark rounded animate-pulse w-2/3" />
            <div className="h-6 bg-cyber-dark rounded animate-pulse w-1/2 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

const whyUs = [
  {
    icon: Zap,
    title: "Free & Express UK Delivery",
    desc: "Choose free DHL shipping (3-8 business days) or DHL Express for £5 (2-5 business days) at checkout.",
  },
  {
    icon: CheckCircle,
    title: "Official UK Warranty",
    desc: "Every product sold comes with full UK manufacturer warranty coverage. Zero hassle returns within 30 days.",
  },
  {
    icon: Globe,
    title: "UK Stock Only",
    desc: "All our stock is held in UK warehouses. No overseas customs fees, no long waits — ever.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    desc: "Real gamers and tech enthusiasts on our support team. We actually know our products inside out.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <div className="neon-divider" />

      <FeaturedCategories />

      <div className="neon-divider-pink" />

      {/* Featured products */}
      <Suspense
        fallback={
          <div className="py-20 container mx-auto px-4">
            <ProductSkeleton />
          </div>
        }
      >
        <FeaturedProducts />
      </Suspense>

      <div className="neon-divider" />

      {/* Why KeshCore */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-cyber-purple opacity-60" />
              <span className="font-orbitron text-[0.6rem] tracking-[0.35em] text-cyber-purple/70 uppercase">
                Why us
              </span>
              <div className="h-px w-8 bg-cyber-purple opacity-60" />
            </div>
            <h2 className="section-title text-2xl sm:text-3xl text-cyber-text">
              Why <span className="neon-text-purple">KeshCore</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="cyber-card p-6">
                <div className="p-3 border border-cyber-cyan/10 bg-cyber-cyan/5 w-fit mb-4">
                  <Icon className="w-5 h-5 text-cyber-cyan" />
                </div>
                <h3 className="font-orbitron text-xs font-bold tracking-wide text-cyber-text mb-3">
                  {title}
                </h3>
                <p className="text-cyber-muted text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 cyber-bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 via-cyber-purple/5 to-cyber-pink/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="font-orbitron font-black text-3xl sm:text-5xl tracking-tight mb-4">
            <span className="text-cyber-text">READY TO </span>
            <span className="neon-text-cyan">UPGRADE</span>
            <span className="text-cyber-text">?</span>
          </h2>
          <p className="text-cyber-muted text-lg mb-8 max-w-xl mx-auto">
            Explore our full catalogue of gaming gear and PC hardware.
          </p>
          <a
            href="/products"
            className="cyber-btn cyber-btn-primary cyber-btn-lg"
          >
            SHOP THE FULL RANGE
          </a>
        </div>
      </section>
    </>
  );
}
