import { useState } from 'react';
import ProductArt from './ProductArt';
import { photoSrc } from '../data/mock';

// Vraie photo de l'annonce ; illustration de secours si l'image est absente.
export default function ListingImage({ l, n = 0, className = '', eager = false }) {
  const [bad, setBad] = useState(false);
  const src = photoSrc(l, n);
  if (!src || bad) return <ProductArt kind={l.kind} tone={l.tone} accent={l.accent} className={className} />;
  return <img className={`art photo ${className}`} src={src} alt={l.title} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable="false" onError={() => setBad(true)} />;
}
