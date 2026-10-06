import { useEffect, useId, useRef, useState } from 'react';
import Icon from './Icons';

// Liste déroulante personnalisée (remplace <select> natif) : clavier, fermeture au clic extérieur, ouverture vers le haut si besoin.
// options: [{ value, label, icon? }]
export default function Select({ value, onChange, options, placeholder = 'Choisir…', ariaLabel, variant = 'input', leading, className = '' }) {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const [maxH, setMaxH] = useState(320);
  const [hi, setHi] = useState(-1);
  const root = useRef(null);
  const list = useRef(null);
  const id = useId();
  const cur = options.find((o) => String(o.value) === String(value));

  const toggle = () => {
    if (!open) {
      const r = root.current.getBoundingClientRect();
      const below = window.innerHeight - r.bottom - 24;
      const goUp = below < 220 && r.top > below;
      setUp(goUp);
      setMaxH(Math.max(180, Math.min(320, (goUp ? r.top : below) - 16)));
      setHi(Math.max(0, options.findIndex((o) => String(o.value) === String(value))));
    }
    setOpen((o) => !o);
  };
  const pick = (o) => { onChange(o.value); setOpen(false); root.current?.querySelector('button')?.focus(); };

  useEffect(() => {
    if (!open) return;
    const away = (e) => { if (!root.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
  }, [open]);
  useEffect(() => { if (open) list.current?.children[hi]?.scrollIntoView({ block: 'nearest' }); }, [hi, open]);

  const onKey = (e) => {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      if (!open) { toggle(); return; }
      if (e.key === 'ArrowDown') setHi((h) => Math.min(options.length - 1, h + 1));
      else if (e.key === 'ArrowUp') setHi((h) => Math.max(0, h - 1));
      else if (options[hi]) pick(options[hi]);
    }
  };

  return (
    <div className={`sel sel-${variant} ${open ? 'open' : ''} ${up ? 'up' : ''} ${className}`} ref={root} onKeyDown={onKey}>
      <button type="button" className="sel-btn" onClick={toggle} aria-haspopup="listbox" aria-expanded={open} aria-controls={id} aria-label={ariaLabel}>
        {leading}
        <span className={`sel-val ${cur ? '' : 'ph'}`}>{cur ? cur.label : placeholder}</span>
        <svg className="sel-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <ul className="sel-pop" role="listbox" id={id} ref={list} style={{ maxHeight: maxH }}>
          {options.map((o, i) => {
            const on = String(o.value) === String(value);
            return (
              <li key={o.value} role="option" aria-selected={on} className={`${on ? 'on' : ''} ${i === hi ? 'hi' : ''}`} onMouseEnter={() => setHi(i)} onClick={() => pick(o)}>
                {o.icon && <span className="sel-ico"><Icon name={o.icon} size={18} /></span>}
                <span className="sel-lbl">{o.label}</span>
                {on && <Icon name="check" size={16} stroke={2.6} className="sel-ok" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
