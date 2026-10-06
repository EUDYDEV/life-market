import { useEffect, useState } from 'react';
import { useInView } from './Reveal';

export default function Counter({ to, suffix = '', duration = 1400, start = true }) {
  const [ref, seen] = useInView({ rootMargin: '0px', threshold: 0 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen || !start) return;
    let raf, t0;
    const tick = (t) => {
      t0 ??= t;
      const p = Math.min(1, (t - t0) / duration);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, start, to, duration]);
  return <span ref={ref}>{new Intl.NumberFormat('fr-FR').format(v)}{suffix}</span>;
}
