import { useEffect, useState } from 'react';
import Logo from './Logo';

let played = false;

// Séquence d'ouverture courte (≈1,5 s) : logo qui se dévoile + ligne lumineuse qui traverse l'écran.
export default function Intro({ onDone }) {
  const [show, setShow] = useState(!played);
  useEffect(() => {
    if (played) { onDone?.(); return; }
    played = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t1 = setTimeout(() => onDone?.(), reduce ? 50 : 1050);
    const t2 = setTimeout(() => setShow(false), reduce ? 80 : 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (!show) return null;
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-bg" />
      <div className="intro-beam" />
      <div className="intro-logo"><Logo to={null} height={64} /></div>
      <div className="intro-dots">{Array.from({ length: 14 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</div>
    </div>
  );
}
