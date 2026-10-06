import { NavLink } from 'react-router-dom';
import Icon from './Icons';

export default function BottomNav() {
  const item = (to, icon, label, end) => (
    <NavLink to={to} end={end} className="bn-item"><Icon name={icon} size={22} /><span>{label}</span></NavLink>
  );
  return (
    <nav className="bottom-nav" aria-label="Navigation mobile">
      {item('/', 'home', 'Accueil', true)}
      {item('/explorer', 'compass', 'Explorer')}
      <NavLink to="/vendre" className="bn-item bn-plus" aria-label="Publier"><span className="bn-fab"><Icon name="plus" size={26} stroke={2.4} /></span><span>Publier</span></NavLink>
      {item('/favoris', 'heart', 'Favoris')}
      {item('/dashboard', 'user', 'Profil')}
    </nav>
  );
}
