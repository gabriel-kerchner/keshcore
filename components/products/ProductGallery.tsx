'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getProductImageUrl } from '@/lib/utils';

interface Props {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden bg-cyber-dark cyber-card">
        <Image
          src={getProductImageUrl(images[selected], 800, 800)}
          alt={name}
          fill
          className="object-contain p-6"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative w-16 h-16 shrink-0 overflow-hidden border transition-all ${
                selected === i
                  ? 'border-cyber-cyan shadow-neon-cyan-sm'
                  : 'border-cyber-cyan/10 hover:border-cyber-cyan/40'
              }`}
            >
              <Image
                src={getProductImageUrl(url, 120, 120)}
                alt={`View ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
