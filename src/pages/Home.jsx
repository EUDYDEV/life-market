import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icons';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import ListingCard from '../components/ListingCard';
import ListingImage from '../components/ListingImage';
import Logo from '../components/Logo';
import Select from '../components/Select';
import { CATEGORIES, LISTINGS, LOCATIONS, TV_SHOWS, formatPrice, getListing } from '../data/mock';
import { useStore } from '../context/Store';
import { sortListings } from './Explore';

const HERO_CARDS = [
  { id: 1, pos: 'hc1', k: 14 },
  { id: 4, pos: 'hc2', k: 22 },
  { id: 6, pos: 'hc3', k: 10 },
  { id: 7, pos: 'hc4', k: 26 },
  { id: 3, pos: 'hc5', k: 18 },
];

const FILTERS = [
  { id: 'all', label: 'Toutes' },
  { id: 'recent', label: 'Plus récentes' },
  { id: 'popular', label: 'Populaires' },
  { id: 'asc', label: 'Prix croissant' },
  { id: 'desc', label: 'Prix décroissant' },
];

const STEPS = [
  { t: 'Inscrivez-vous', d: 'Créez votre compte vendeur en quelques secondes et recevez 5 crédits offerts.', i: 'user' },
  { t: 'Publiez votre annonce', d: 'Photos, prix, localisation : votre annonce est en ligne pour 30 jours (1 crédit).', i: 'plus' },
  { t: 'Les acheteurs la découvrent', d: 'La consultation est gratuite. Votre annonce apparaît dans sa catégorie et dans les recherches.', i: 'eye' },
  { t: 'Ils vous contactent', d: 'Directement par WhatsApp ou par téléphone, sans intermédiaire.', i: 'whatsapp' },
  { t: 'Vendez', d: 'Concluez la vente avec votre acheteur, près de chez vous.', i: 'check' },
];

function Hero({ ready }) {
  const nav = useNavigate();
  const stage = useRef(null);
  const hero = useRef(null);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [loc, setLoc] = useState('');
  const { listings } = useStore();

  // Parallaxe légère : souris (desktop) + scroll, via variables CSS et rAF.
  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        el.style.setProperty('--sy', (-y / 40).toFixed(2));
      });
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
      el.style.setProperty('--my', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const h = hero.current;
    h?.addEventListener('pointermove', onMove);
    return () => { window.removeEventListener('scroll', onScroll); h?.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q.trim()) p.set('q', q.trim());
    if (cat) p.set('cat', cat);
    if (loc) p.set('loc', loc);
    nav(`/explorer?${p.toString()}`);
  };

  const words = ['Achetez', 'près', 'de', 'chez', 'vous.'];

  return (
    <section className={`hero ${ready ? 'go' : ''}`} ref={hero}>
      <div className="hero-bg" aria-hidden="true">
        <span className="glow g1" /><span className="glow g2" /><span className="grid-lines" />
        <span className="beam" />
      </div>
      <div className="container hero-in">
        <div className="hero-copy">
          <span className="eyebrow b" style={{ '--d': '300ms' }}><span className="live" /> Portée par Life TV</span>
          <h1 className="hero-title" aria-label="Achetez près de chez vous.">
            {words.map((w, i) => (
              <span className="w" key={w + i} aria-hidden="true"><span className={`wi ${i >= 3 ? 'accent' : ''}`} style={{ '--d': `${380 + i * 90}ms` }}>{w}</span></span>
            ))}
          </h1>
          <p className="hero-sub b" style={{ '--d': '850ms' }}>Des milliers d'annonces pour trouver ce dont vous avez besoin, tout près de vous.</p>

          <form className="searchbar b" style={{ '--d': '980ms' }} onSubmit={submit} role="search">
            <label className="sb-field sb-q">
              <Icon name="search" size={22} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Que recherchez-vous ?" aria-label="Que recherchez-vous ?" />
            </label>
            <div className="sb-field sb-cat">
              <Select variant="bare" value={cat} onChange={setCat} ariaLabel="Catégorie" leading={<Icon name="grid" size={20} />}
                options={[{ value: '', label: 'Toutes catégories', icon: 'grid' }, ...CATEGORIES.map((c) => ({ value: c.id, label: c.name, icon: c.icon }))]} />
            </div>
            <div className="sb-field sb-loc">
              <Select variant="bare" value={loc} onChange={setLoc} ariaLabel="Localisation" leading={<Icon name="pin" size={20} />}
                options={[{ value: '', label: 'Partout', icon: 'pin' }, ...LOCATIONS.map((l) => ({ value: l, label: l, icon: 'pin' }))]} />
            </div>
            <button className="btn btn-primary btn-lg sb-go" type="submit">Rechercher<Icon name="arrow" size={20} /></button>
          </form>

          <div className="quick b" style={{ '--d': '1100ms' }}>
            <span>Populaire :</span>
            {['iPhone', 'Canapé', 'Terrain', 'Robe'].map((t) => <Link key={t} to={`/explorer?q=${t}`}>{t}</Link>)}
          </div>
        </div>

        <div className="hero-stage" ref={stage} aria-hidden="true">
          <div className="orbit o1" /><div className="orbit o2" />
          {HERO_CARDS.map((c, i) => {
            const l = getListing(c.id);
            return (
              <div key={c.id} className={`hcard ${c.pos}`} style={{ '--k': c.k, '--d': `${600 + i * 130}ms` }}>
                <div className="hcard-in" style={{ animationDelay: `${i * -1.3}s` }}>
                  <div className="hcard-img"><ListingImage l={l} /></div>
                  <div className="hcard-txt">
                    <b>{l.title}</b>
                    <span>{formatPrice(l.price)}</span>
                    <em><Icon name="pin" size={12} /> {l.location}</em>
                  </div>
                  {l.isBoosted && <span className="chip chip-boost sm"><Icon name="bolt" size={11} fill stroke={0} /> BOOSTÉ</span>}
                </div>
              </div>
            );
          })}
          <div className="hpill hp1 b" style={{ '--d': '1300ms' }}><Icon name="whatsapp" size={16} /> Contact direct WhatsApp</div>
          <div className="hpill hp2 b" style={{ '--d': '1450ms' }}><Icon name="check" size={16} /> Consultation gratuite</div>
        </div>
      </div>

      <div className="container">
        <ul className="stats b" style={{ '--d': '1250ms' }}>
          <li><strong><Counter to={10} start={ready} /></strong><span>catégories</span></li>
          <li><strong><Counter to={1000} suffix="+" start={ready} /></strong><span>annonces</span></li>
          <li><strong className="t"><Icon name="pin" size={22} /> Locaux</strong><span>des vendeurs près de vous</span></li>
          <li><strong className="t"><Icon name="gift" size={22} /> Gratuit</strong><span>consultation sans frais</span></li>
        </ul>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="section" id="categories">
      <div className="container">
        <Reveal className="sec-head">
          <div><span className="kicker">Catégories</span><h2 className="h2">Explorer par catégorie</h2></div>
          <Link to="/categories" className="link-arrow">Tout voir <Icon name="arrow" size={18} /></Link>
        </Reveal>
        <div className="cat-rail">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} variant="pop" delay={i * 55}>
              <Link to={`/explorer?cat=${c.id}`} className="cat">
                <span className="cat-ico"><Icon name={c.icon} size={28} /></span>
                <span className="cat-name">{c.name}</span>
                <span className="cat-count"><b>{c.count}</b> annonces</span>
                <span className="cat-go"><Icon name="arrow" size={16} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Feed() {
  const [f, setF] = useState('all');
  const { listings } = useStore();
  const items = useMemo(() => sortListings(listings, f).slice(0, 8), [listings, f]);
  return (
    <section className="section tint" id="annonces">
      <div className="container">
        <Reveal className="sec-head">
          <div><span className="kicker">En direct</span><h2 className="h2">Les annonces du moment</h2></div>
          <Link to="/explorer" className="link-arrow">Toutes les annonces <Icon name="arrow" size={18} /></Link>
        </Reveal>
        <Reveal className="pills" delay={80}>
          {FILTERS.map((x) => (
            <button key={x.id} className={`pill ${f === x.id ? 'on' : ''}`} onClick={() => setF(x.id)}>{x.label}</button>
          ))}
        </Reveal>
        <div className="grid-cards" key={f}>
          {items.map((l, i) => (
            <Reveal key={l.id} variant="build" delay={(i % 4) * 80}><ListingCard l={l} /></Reveal>
          ))}
        </div>
        <Reveal className="center" style={{ marginTop: 40 }}>
          <Link to="/explorer" className="btn btn-dark btn-lg">Voir toutes les annonces <Icon name="arrow" size={20} /></Link>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.62 - r.top) / r.height;
      el.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(3));
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="section how" id="comment">
      <div className="container how-grid">
        <div className="how-side">
          <Reveal><span className="kicker">Comment ça marche</span>
            <h2 className="h2">De l'idée à la vente, en cinq étapes.</h2>
            <p className="lead">Les acheteurs consultent gratuitement. Vous gardez le contact direct avec vos clients.</p>
            <div className="gift"><Icon name="gift" size={22} /><div><b>5 crédits offerts à l'inscription</b><span>1 crédit = 1 annonce visible pendant 30 jours.</span></div></div>
            <Link to="/vendre" className="btn btn-primary btn-lg" style={{ marginTop: 24 }}>Commencer maintenant <Icon name="arrow" size={20} /></Link>
          </Reveal>
        </div>
        <ol className="steps" ref={ref}>
          <span className="steps-line"><span className="steps-fill" /></span>
          {STEPS.map((s, i) => (
            <Reveal as="li" variant="step" delay={60} key={s.t} className="step">
              <span className="step-n">0{i + 1}</span>
              <span className="step-dot"><Icon name={s.i} size={20} /></span>
              <div className="step-card"><h3>{s.t}</h3><p>{s.d}</p></div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function LifeTV() {
  const sample = [getListing(1), getListing(4), getListing(7)];
  return (
    <section className="section tv-sec" id="life-tv">
      <div className="container">
        <div className="tv-panel">
          <div className="tv-glow" aria-hidden="true" />
          <Reveal className="tv-copy">
            <span className="kicker light">Écosystème Life TV</span>
            <h2 className="h2 light">Votre annonce peut aller beaucoup plus loin.</h2>
            <p className="lead light">Une plateforme de petites annonces portée par Life TV.</p>
            <ul className="tv-points">
              <li><span><Icon name="tv" size={20} /></span><div><b>Spots Life TV</b><em>Diffusés à l'antenne pour lancer et faire connaître Life Market.</em></div></li>
              <li><span><Icon name="play" size={20} /></span><div><b>Scrolls dans les émissions</b><em>Des annonces qui défilent en direct pendant vos programmes préférés.</em></div></li>
              <li><span><Icon name="share" size={20} /></span><div><b>Relais Facebook</b><em>Une visibilité qui se prolonge sur les réseaux de Life TV.</em></div></li>
            </ul>
          </Reveal>

          <Reveal className="tv-scene" variant="pop" delay={150}>
            <div className="tv">
              <div className="tv-screen">
                <div className="tv-live"><span className="live" /> EN DIRECT</div>
                <div className="tv-logo"><Logo to={null} height={58} /></div>
                <div className="tv-tag">Life TV × Life Market</div>
                <div className="tv-ticker"><div className="tv-ticker-in">
                  {[...LISTINGS.slice(0, 7), ...LISTINGS.slice(0, 7)].map((l, i) => <span key={i}><b>{l.title}</b> {formatPrice(l.price)} · {l.location}</span>)}
                </div></div>
              </div>
              <div className="tv-stand" />
            </div>
            <div className="phone">
              <div className="phone-notch" />
              <div className="phone-body">
                <Logo to={null} height={22} />
                <div className="phone-search"><Icon name="search" size={14} /> Que recherchez-vous ?</div>
                {sample.map((l) => (
                  <div className="phone-row" key={l.id}>
                    <div className="phone-img"><ListingImage l={l} /></div>
                    <div><b>{l.title}</b><span>{formatPrice(l.price)}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="float-card fc1"><span className="avatar sm" style={{ background: '#25D366' }}><Icon name="whatsapp" size={14} /></span> Nouveau contact WhatsApp</div>
            <div className="float-card fc2"><Icon name="eye" size={16} /> +128 vues aujourd'hui</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ShowsBand() {
  const items = [...TV_SHOWS, 'Life TV × Life Market'];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="shows" aria-label="Émissions Life TV">
      <div className="shows-track">
        {row.map((s, i) => (
          <span key={i} className={s.includes('×') ? 'x' : ''}>{s}<i /></span>
        ))}
      </div>
    </div>
  );
}

function SellCTA() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta" variant="pop">
          <div className="cta-bg" aria-hidden="true"><span /><span /><span /></div>
          <div className="cta-copy">
            <h2 className="h2 light">Vous avez quelque chose à vendre ?</h2>
            <p className="lead light">Transformez votre produit en opportunité.</p>
            <div className="cta-btns">
              <Link to="/vendre" className="btn btn-white btn-lg"><Icon name="plus" size={20} /> Publier une annonce</Link>
              <Link to="/offres" className="btn btn-outline-light btn-lg">Voir les offres</Link>
            </div>
          </div>
          <div className="cta-art" aria-hidden="true">
            {[8, 2, 7].map((id, i) => { const l = getListing(id); return (
              <div key={id} className={`cta-card c${i}`}><ListingImage l={l} /></div>
            ); })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StickySearch() {
  const [show, setShow] = useState(false);
  const [q, setQ] = useState('');
  const nav = useNavigate();
  useEffect(() => {
    const on = () => setShow(window.scrollY > 520);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <form className={`m-search ${show ? 'show' : ''}`} onSubmit={(e) => { e.preventDefault(); nav(`/explorer?q=${encodeURIComponent(q)}`); }}>
      <Icon name="search" size={18} />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Que recherchez-vous ?" aria-label="Rechercher" />
      <button type="submit" aria-label="Lancer la recherche"><Icon name="arrow" size={18} /></button>
    </form>
  );
}

export default function Home({ ready }) {
  return (
    <main>
      <StickySearch />
      <Hero ready={ready} />
      <CategoriesSection />
      <Feed />
      <HowItWorks />
      <LifeTV />
      <ShowsBand />
      <SellCTA />
    </main>
  );
}
