import { Link } from 'react-router-dom';
import Logo from './Logo';
import { CATEGORIES } from '../data/mock';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo height={38} />
          <p className="muted" style={{ marginTop: 16, maxWidth: 320 }}>Les petites annonces portées par Life TV. Consultation gratuite, contact direct par WhatsApp ou téléphone.</p>
        </div>
        <div><h4>Catégories</h4>{CATEGORIES.slice(0, 5).map((c) => <Link key={c.id} to={`/explorer?cat=${c.id}`}>{c.name}</Link>)}</div>
        <div><h4>Plus</h4>{CATEGORIES.slice(5).map((c) => <Link key={c.id} to={`/explorer?cat=${c.id}`}>{c.name}</Link>)}</div>
        <div><h4>Vendeurs</h4><Link to="/vendre">Publier une annonce</Link><Link to="/offres">Offres</Link><Link to="/dashboard">Espace vendeur</Link></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Life Market — portée par Life TV · <Link to="/credits" className="inline-link">Crédits photos</Link></span><span className="credit">E-PROJECT</span></div>
    </footer>
  );
}
