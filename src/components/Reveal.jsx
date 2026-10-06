import { useEffect, useRef, useState } from 'react';

// Révèle un bloc quand il entre dans le viewport (une seule fois).
export function useInView(options = { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!('IntersectionObserver' in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
}

export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', children, style, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <Tag
      ref={ref}
      className={`rv rv-${variant} ${seen ? 'in' : ''} ${className}`}
      style={{ '--d': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
