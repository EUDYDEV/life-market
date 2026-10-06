import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Icon from './Icons';
import { useStore } from '../context/Store';

const LINKS = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/explorer', label: 'Explorer' },
  { to: '/categories', label: 'Catégories' },
  { to: '/#comment', label: 'Comment ça marche', hash: 'comment' },
  { to: '/vendre', label: 'Vendre' },
];

export default function Navbar({ ready }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bell, setBell] = useState(false);
  const { favs } = useStore();
  const loc = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { setOpen(false); setBell(false); }, [loc.pathname]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const goHash = (e, hash) => {
    e.preventDefault();
    setOpen(false);
    if (loc.pathname !== '/') nav('/');
    setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), loc.pathname === '/' ? 0 : 350);
  };

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${ready ? 'ready' : ''}`}>
      <div className="nav-in container">
        <div className="nav-logo b" style={{ '--d': '0ms' }}><Logo height={34} /></div>

        <nav className="nav-links" aria-label="Navigation principale">
          {LINKS.map((l, i) =>
            l.hash ? (
              <a key={l.to} href={l.to} onClick={(e) => goHash(e, l.hash)} className="b" style={{ '--d': `${120 + i * 70}ms` }}>{l.label}</a>
            ) : (
              <NavLink key={l.to} to={l.to} end={l.end} className="b" style={{ '--d': `${120 + i * 70}ms` }}>{l.label}</NavLink>
            )
          )}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn m-only b" style={{ '--d': '300ms' }} onClick={() => nav('/explorer')} aria-label="Rechercher"><Icon name="search" /></button>
          <Link to="/favoris" className="icon-btn b" style={{ '--d': '380ms' }} aria-label="Favoris">
            <Icon name="heart" />{favs.length > 0 && <span className="badge-n">{favs.length}</span>}
          </Link>
          <div className="d-only b" style={{ '--d': '440ms', position: 'relative' }}>
            <button className="icon-btn" onClick={() => setBell((b) => !b)} aria-label="Notifications"><Icon name="bell" /><span className="badge-dot" /></button>
            {bell && (
              <div className="pop">
                <strong>Notifications</strong>
                <p><Icon name="eye" size={16} /> Votre iPhone 15 Pro a reçu 42 nouvelles vues.</p>
                <p><Icon name="whatsapp" size={16} /> 3 acheteurs vous ont contacté aujourd'hui.</p>
                <p><Icon name="bolt" size={16} /> Votre boost se termine dans 2 jours.</p>
              </div>
            )}
          </div>
          <Link to="/dashboard" className="btn btn-ghost btn-sm d-only b" style={{ '--d': '500ms' }}><Icon name="user" size={18} /> Connexion</Link>
          <Link to="/vendre" className="btn btn-primary btn-sm d-only b" style={{ '--d': '560ms' }}><Icon name="plus" size={18} /> Publier une annonce</Link>
          <button className="icon-btn m-only b" style={{ '--d': '440ms' }} onClick={() => setOpen(true)} aria-label="Ouvrir le menu"><Icon name="menu" /></button>
        </div>
      </div>

      <div className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-bg" onClick={() => setOpen(false)} />
        <div className="drawer-panel">
          <div className="drawer-head"><Logo height={32} /><button className="icon-btn" onClick={() => setOpen(false)} aria-label="Fermer"><Icon name="close" /></button></div>
          {LINKS.map((l) => l.hash
            ? <a key={l.to} href={l.to} onClick={(e) => goHash(e, l.hash)}>{l.label}<Icon name="arrow" size={18} /></a>
            : <NavLink key={l.to} to={l.to} end={l.end}>{l.label}<Icon name="arrow" size={18} /></NavLink>)}
          <NavLink to="/offres">Offres vendeurs<Icon name="arrow" size={18} /></NavLink>
          <NavLink to="/dashboard">Espace vendeur<Icon name="arrow" size={18} /></NavLink>
          <Link to="/vendre" className="btn btn-primary btn-lg"><Icon name="plus" size={20} /> Publier une annonce</Link>
        </div>
      </div>
    </header>
  );
}
