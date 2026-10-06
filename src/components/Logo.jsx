import { Link } from 'react-router-dom';

// Utilise le logo existant (assets/logo.jpeg), simplement rogné de ses marges blanches.
export default function Logo({ height = 38, to = '/', className = '' }) {
  const img = (
    <img
      className="logo-img"
      src="/assets/logo.jpeg"
      alt="Life Market"
      style={{ height, aspectRatio: '1520 / 355' }}
      draggable="false"
    />
  );
  return to ? (
    <Link to={to} className={`logo ${className}`} aria-label="Life Market — accueil">{img}</Link>
  ) : (
    <span className={`logo ${className}`}>{img}</span>
  );
}
