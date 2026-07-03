import Link from 'next/link';
import { Gamepad2, Cpu, HardDrive, Monitor, MousePointer, Tag } from 'lucide-react';

const categories = [
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Mice, keyboards, headsets & more',
    icon: Gamepad2,
    color: 'cyan' as const,
    href: '/products?category=gaming',
  },
  {
    id: 'pc-parts',
    name: 'PC Parts',
    description: 'CPUs, GPUs, RAM, motherboards',
    icon: Cpu,
    color: 'pink' as const,
    href: '/products?category=pc-parts',
  },
  {
    id: 'storage',
    name: 'Storage',
    description: 'SSDs, HDDs & memory cards',
    icon: HardDrive,
    color: 'purple' as const,
    href: '/products?category=storage',
  },
  {
    id: 'monitors',
    name: 'Monitors',
    description: '4K, 144Hz+ gaming displays',
    icon: Monitor,
    color: 'cyan' as const,
    href: '/products?category=monitors',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Cables, hubs, pads & stands',
    icon: MousePointer,
    color: 'pink' as const,
    href: '/products?category=accessories',
  },
  {
    id: 'deals',
    name: 'Deals',
    description: 'Sale, new arrivals & offers',
    icon: Tag,
    color: 'purple' as const,
    href: '/products?category=deals',
  },
];

const colorMap = {
  cyan: {
    border: 'border-cyber-cyan/15 hover:border-cyber-cyan/50',
    icon: 'text-cyber-cyan',
    iconBg: 'bg-cyber-cyan/5 border-cyber-cyan/15',
    tag: 'text-cyber-cyan/60 border-cyber-cyan/15',
    glow: 'hover:shadow-[0_0_25px_rgba(0,245,255,0.1)]',
  },
  pink: {
    border: 'border-cyber-pink/15 hover:border-cyber-pink/50',
    icon: 'text-cyber-pink',
    iconBg: 'bg-cyber-pink/5 border-cyber-pink/15',
    tag: 'text-cyber-pink/60 border-cyber-pink/15',
    glow: 'hover:shadow-[0_0_25px_rgba(255,45,120,0.1)]',
  },
  purple: {
    border: 'border-cyber-purple/15 hover:border-cyber-purple/50',
    icon: 'text-cyber-purple',
    iconBg: 'bg-cyber-purple/5 border-cyber-purple/15',
    tag: 'text-cyber-purple/60 border-cyber-purple/15',
    glow: 'hover:shadow-[0_0_25px_rgba(155,48,255,0.1)]',
  },
};

export default function FeaturedCategories() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-cyber-cyan opacity-60" />
            <span className="font-orbitron text-[0.6rem] tracking-[0.35em] text-cyber-cyan/70 uppercase">
              Browse by
            </span>
          </div>
          <h2 className="section-title text-2xl sm:text-3xl text-cyber-text">
            Shop <span className="neon-text-cyan">Categories</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const colors = colorMap[cat.color];
            const Icon = cat.icon;

            return (
              <Link
                key={cat.id}
                href={cat.href}
                className={`group relative flex flex-col items-center text-center p-5 bg-cyber-card border transition-all duration-300 ${colors.border} ${colors.glow}`}
              >
                {/* Corner decorators */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: cat.color === 'cyan' ? '#00f5ff' : cat.color === 'pink' ? '#ff2d78' : '#9b30ff' }} />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: cat.color === 'cyan' ? '#00f5ff' : cat.color === 'pink' ? '#ff2d78' : '#9b30ff' }} />

                {/* Icon */}
                <div className={`p-3 border mb-3 ${colors.iconBg}`}>
                  <Icon className={`w-5 h-5 ${colors.icon} group-hover:scale-110 transition-transform`} />
                </div>

                {/* Name */}
                <h3 className={`font-orbitron text-[0.65rem] font-bold tracking-wide text-cyber-text group-hover:${cat.color === 'cyan' ? 'text-cyber-cyan' : cat.color === 'pink' ? 'text-cyber-pink' : 'text-cyber-purple'} transition-colors leading-tight mb-1.5`}>
                  {cat.name}
                </h3>

                {/* Description */}
                <p className="text-cyber-muted text-[0.65rem] leading-tight hidden sm:block">
                  {cat.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
