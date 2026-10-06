import { Link } from 'react-router-dom';
import Icon from '../components/Icons';
import Reveal from '../components/Reveal';
import ListingCard from '../components/ListingCard';
import { useStore } from '../context/Store';

export default function Favorites() {
  const { listings, favs } = useStore();
  const items = listings.filter((l) => favs.includes(l.id));
  return (
    <main className="page-pad">
      <div className="container">
        <Reveal className="page-head"><span className="kicker">Mes favoris</span><h1 className="h1">Vos coups de cœur</h1></Reveal>
        {items.length === 0 ? (
          <div className="empty"><Icon name="heart" size={34} /><h3>Aucun favori pour l'instant</h3><p className="muted">Touchez le cœur d'une annonce pour la retrouver ici.</p><Link to="/explorer" className="btn btn-primary">Explorer les annonces</Link></div>
        ) : (
          <div className="grid-cards cols-4">{items.map((l, i) => <Reveal key={l.id} variant="build" delay={(i % 4) * 70}><ListingCard l={l} /></Reveal>)}</div>
        )}
      </div>
    </main>
  );
}
