import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icons';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import ListingCard from '../components/ListingCard';
import { getSeller } from '../data/mock';
import { useStore } from '../context/Store';

export default function Seller() {
  const { id } = useParams();
  const s = getSeller(id);
  const { listings } = useStore();
  if (!s) return <main className="container page-pad center"><h1 className="h1">Vendeur introuvable</h1><Link to="/explorer" className="btn btn-primary">Explorer</Link></main>;
  const items = listings.filter((l) => l.seller === s.id);
  const views = items.reduce((a, l) => a + l.views, 0);

  return (
    <main className="page-pad">
      <div className="container">
        <Reveal className="seller-hero" variant="pop">
          <div className="seller-cover" aria-hidden="true"><span /><span /></div>
          <div className="seller-row">
            <span className="avatar xl" style={{ background: s.tone }}>{s.initials}</span>
            <div className="seller-id">
              <h1 className="h2">{s.name}{s.verified && <span className="verified" title="Vendeur vérifié"><Icon name="check" size={14} stroke={3} /></span>}</h1>
              <div className="seller-meta">
                <span><Icon name="star" size={16} fill /> <b>{s.rating}</b></span>
                <span><Icon name="pin" size={16} /> {s.location}</span>
                <span><Icon name="list" size={16} /> {s.ads} annonces</span>
                <span>Membre depuis {s.since}</span>
              </div>
            </div>
            <div className="seller-btns">
              <a className="btn btn-wa" href="https://wa.me/2250555258075" target="_blank" rel="noreferrer"><Icon name="whatsapp" size={20} /> WhatsApp</a>
              <a className="btn btn-primary" href="tel:+2250555258075"><Icon name="phone" size={20} /> Contacter</a>
            </div>
          </div>
          <p className="seller-bio">{s.bio}</p>
          <ul className="seller-stats">
            <li><strong><Counter to={s.ads} /></strong><span>annonces actives</span></li>
            <li><strong><Counter to={views + 2400} /></strong><span>vues au total</span></li>
            <li><strong><Counter to={Math.round(s.ads * 7.4)} /></strong><span>contacts reçus</span></li>
            <li><strong>{s.rating}<small>/5</small></strong><span>note moyenne</span></li>
          </ul>
        </Reveal>

        <section className="section-sm">
          <Reveal><h2 className="h2">Annonces de {s.name}</h2></Reveal>
          <div className="grid-cards cols-4">{items.map((l, i) => <Reveal key={l.id} variant="build" delay={(i % 4) * 70}><ListingCard l={l} /></Reveal>)}</div>
        </section>
      </div>
    </main>
  );
}
