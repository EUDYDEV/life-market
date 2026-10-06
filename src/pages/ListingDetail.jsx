import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icons';
import Reveal from '../components/Reveal';
import ListingImage from '../components/ListingImage';
import ListingCard from '../components/ListingCard';
import { formatPrice, getCategory, getSeller, photoCount, timeAgo } from '../data/mock';
import { useStore } from '../context/Store';

export default function ListingDetail() {
  const { id } = useParams();
  const { listings, favs, toggleFav, say } = useStore();
  const l = listings.find((x) => String(x.id) === id);
  const [idx, setIdx] = useState(0);

  if (!l) return <main className="container page-pad center"><h1 className="h1">Annonce introuvable</h1><Link to="/explorer" className="btn btn-primary">Retour aux annonces</Link></main>;

  const seller = getSeller(l.seller);
  const cat = getCategory(l.category);
  const fav = favs.includes(l.id);
  const total = Math.max(1, photoCount(l));
  const similar = listings.filter((x) => x.category === l.category && x.id !== l.id).slice(0, 4);
  const msg = encodeURIComponent(`Bonjour, je suis intéressé(e) par votre annonce « ${l.title} » sur Life Market.`);

  return (
    <main className="page-pad">
      <div className="container">
        <nav className="crumbs"><Link to="/">Accueil</Link><span>/</span><Link to={`/explorer?cat=${l.category}`}>{cat?.name}</Link><span>/</span><b>{l.title}</b></nav>
        <div className="detail">
          <Reveal className="gallery" variant="pop">
            <div className={`g-main ${l.isBoosted ? 'boosted' : ''}`}>
              <ListingImage key={idx} l={l} n={idx} className="g-art" eager />
              {l.isBoosted && <span className="chip chip-boost"><Icon name="bolt" size={12} fill stroke={0} /> BOOSTÉ</span>}
              <span className="g-count">{idx + 1} / {total}</span>
            </div>
            <div className="g-thumbs">
              {Array.from({ length: total }).map((_, i) => (
                <button key={i} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)} aria-label={`Photo ${i + 1}`}>
                  <ListingImage l={l} n={i} />
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal className="d-info" delay={120}>
            <span className="chip chip-soft">{cat?.name}</span>
            <h1 className="h1 d-title">{l.title}</h1>
            <div className="d-price">{formatPrice(l.price)}</div>
            <ul className="d-facts">
              <li><Icon name="pin" size={18} /><span>Localisation</span><b>{l.location}</b></li>
              <li><Icon name="shield" size={18} /><span>État</span><b>{l.condition}</b></li>
              <li><Icon name="eye" size={18} /><span>Vues</span><b>{l.views}</b></li>
              <li><Icon name="compass" size={18} /><span>Publiée</span><b>{timeAgo(l.createdAt)}</b></li>
            </ul>

            <Link to={`/vendeur/${seller.id}`} className="seller-box">
              <span className="avatar" style={{ background: seller.tone }}>{seller.initials}</span>
              <div><b>{seller.name}</b><span><Icon name="star" size={14} fill /> {seller.rating} · {seller.ads} annonces · {seller.location}</span></div>
              <Icon name="arrow" size={18} />
            </Link>

            <div className="d-cta">
              <a className="btn btn-wa btn-lg" href={`https://wa.me/2250555258075?text=${msg}`} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={22} /> Contacter sur WhatsApp</a>
              <a className="btn btn-primary btn-lg" href="tel:+2250555258075"><Icon name="phone" size={22} /> Appeler le vendeur</a>
              <button className={`btn btn-ghost btn-lg fav-btn ${fav ? 'on' : ''}`} onClick={() => toggleFav(l.id)}><Icon name="heart" size={22} fill={fav} /> {fav ? 'Dans vos favoris' : 'Ajouter aux favoris'}</button>
            </div>
            <button className="share" onClick={() => { navigator.clipboard?.writeText(window.location.href); say('Lien copié'); }}><Icon name="share" size={16} /> Partager l'annonce</button>

            <div className="d-desc"><h3>Description</h3><p>{l.desc}</p></div>
            <p className="safe"><Icon name="shield" size={16} /> Conseil : rencontrez le vendeur dans un lieu public et vérifiez l'article avant de payer.</p>
          </Reveal>
        </div>

        {similar.length > 0 && (
          <section className="section-sm">
            <Reveal><h2 className="h2">Annonces similaires</h2></Reveal>
            <div className="grid-cards cols-4">{similar.map((s, i) => <Reveal key={s.id} variant="build" delay={i * 70}><ListingCard l={s} /></Reveal>)}</div>
          </section>
        )}
      </div>
    </main>
  );
}
