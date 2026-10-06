import { Link } from 'react-router-dom';
import Icon from './Icons';
import ListingImage from './ListingImage';
import { formatPrice, getCategory, getSeller } from '../data/mock';
import { useStore } from '../context/Store';

export default function ListingCard({ l, delay = 0, build = false }) {
  const { favs, toggleFav } = useStore();
  const fav = favs.includes(l.id);
  const cat = getCategory(l.category);
  const seller = getSeller(l.seller);
  return (
    <article className={`lcard ${l.isBoosted ? 'boosted' : ''} ${build ? 'build' : ''}`} style={{ '--d': `${delay}ms` }}>
      <Link to={`/annonce/${l.id}`} className="lcard-media" aria-label={l.title}>
        <ListingImage l={l} />
        <span className="chip chip-glass">{cat?.short || cat?.name}</span>
        {l.isBoosted && <span className="chip chip-boost"><Icon name="bolt" size={12} fill stroke={0} /> BOOSTÉ</span>}
      </Link>
      <button className={`fav ${fav ? 'on' : ''}`} onClick={() => toggleFav(l.id)} aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'} aria-pressed={fav}>
        <Icon name="heart" size={18} fill={fav} />
        <span className="fav-burst" aria-hidden="true">{Array.from({ length: 6 }).map((_, i) => <i key={i} style={{ '--a': `${i * 60}deg` }} />)}</span>
      </button>
      <div className="lcard-body">
        <Link to={`/annonce/${l.id}`} className="lcard-title">{l.title}</Link>
        <div className="lcard-price">{formatPrice(l.price)}</div>
        <div className="lcard-meta"><Icon name="pin" size={14} /> {l.location}<span className="dot" />{l.condition}</div>
        <Link to={`/vendeur/${seller?.id}`} className="lcard-seller">
          <span className="avatar sm" style={{ background: seller?.tone }}>{seller?.initials}</span>
          <span>{seller?.name}</span>
        </Link>
      </div>
    </article>
  );
}
