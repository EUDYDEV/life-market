import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../components/Icons';
import ListingCard from '../components/ListingCard';
import Reveal from '../components/Reveal';
import Select from '../components/Select';
import { CATEGORIES, LOCATIONS } from '../data/mock';
import { useStore } from '../context/Store';

export function sortListings(list, mode = 'all') {
  const a = [...list];
  switch (mode) {
    case 'recent': return a.sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt));
    case 'popular': return a.sort((x, y) => y.views - x.views);
    case 'asc': return a.sort((x, y) => x.price - y.price);
    case 'desc': return a.sort((x, y) => y.price - x.price);
    default: return a.sort((x, y) => Number(y.isBoosted) - Number(x.isBoosted)); // les boostés d'abord
  }
}

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function Explore() {
  const [sp, setSp] = useSearchParams();
  const { listings } = useStore();
  const [showFilters, setShowFilters] = useState(false);
  const q = sp.get('q') || '';
  const cat = sp.get('cat') || '';
  const loc = sp.get('loc') || '';
  const sort = sp.get('sort') || 'all';
  const max = sp.get('max') || '';
  const boostedOnly = sp.get('boost') === '1';

  const set = (k, v) => {
    const n = new URLSearchParams(sp);
    if (v) n.set(k, v); else n.delete(k);
    setSp(n, { replace: true });
  };

  const results = useMemo(() => {
    const nq = norm(q);
    const f = listings.filter((l) =>
      (!cat || l.category === cat) &&
      (!loc || l.location === loc) &&
      (!max || l.price <= Number(max)) &&
      (!boostedOnly || l.isBoosted) &&
      (!nq || norm(l.title + ' ' + l.desc + ' ' + l.location).includes(nq))
    );
    return sortListings(f, sort);
  }, [listings, q, cat, loc, sort, max, boostedOnly]);

  const activeFilters = [cat, loc, max, boostedOnly ? '1' : ''].filter(Boolean).length;

  const Filters = (
    <div className="filters">
      <div className="f-group">
        <h4>Localisation</h4>
        <Select value={loc} onChange={(v) => set('loc', v)} ariaLabel="Localisation"
          options={[{ value: '', label: 'Partout', icon: 'pin' }, ...LOCATIONS.map((l) => ({ value: l, label: l, icon: 'pin' }))]} />
      </div>
      <div className="f-group">
        <h4>Prix maximum</h4>
        <Select value={max} onChange={(v) => set('max', v)} ariaLabel="Prix maximum" placeholder="Pas de limite"
          options={[{ value: '', label: 'Pas de limite' }, ...[50000, 100000, 500000, 1000000, 10000000].map((p) => ({ value: String(p), label: `Jusqu'à ${new Intl.NumberFormat('fr-FR').format(p).replace(/ | /g, ' ')} FCFA` }))]} />
      </div>
      <label className="switch-row">
        <span><Icon name="bolt" size={16} /> Annonces boostées</span>
        <input type="checkbox" checked={boostedOnly} onChange={(e) => set('boost', e.target.checked ? '1' : '')} />
        <i className="switch" />
      </label>
      {activeFilters > 0 && <button className="btn btn-ghost btn-sm" onClick={() => setSp(q ? { q } : {}, { replace: true })}>Réinitialiser</button>}
    </div>
  );

  return (
    <main className="page-pad">
      <div className="container">
        <Reveal className="page-head">
          <span className="kicker">Explorer</span>
          <h1 className="h1">{cat ? CATEGORIES.find((c) => c.id === cat)?.name : 'Toutes les annonces'}</h1>
        </Reveal>

        <div className="explore-bar">
          <label className="sb-field big">
            <Icon name="search" size={20} />
            <input value={q} onChange={(e) => set('q', e.target.value)} placeholder="Que recherchez-vous ?" aria-label="Recherche" />
          </label>
          <Select className="sort" value={sort} onChange={(v) => set('sort', v === 'all' ? '' : v)} ariaLabel="Trier"
            options={[{ value: 'all', label: "Pertinence (boostées d'abord)" }, { value: 'recent', label: 'Plus récentes' }, { value: 'popular', label: 'Populaires' }, { value: 'asc', label: 'Prix croissant' }, { value: 'desc', label: 'Prix décroissant' }]} />
          <button className="btn btn-ghost m-only-flex" onClick={() => setShowFilters((s) => !s)}><Icon name="filter" size={18} /> Filtres{activeFilters ? ` (${activeFilters})` : ''}</button>
        </div>

        <div className="chips-row">
          <button className={`pill ${!cat ? 'on' : ''}`} onClick={() => set('cat', '')}>Toutes</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} className={`pill ${cat === c.id ? 'on' : ''}`} onClick={() => set('cat', c.id)}><Icon name={c.icon} size={16} /> {c.short || c.name}</button>
          ))}
        </div>

        <div className="explore-layout">
          <aside className={`explore-side ${showFilters ? 'open' : ''}`}>{Filters}</aside>
          <div>
            <p className="muted count"><b>{results.length}</b> annonce{results.length > 1 ? 's' : ''}{q ? <> pour « {q} »</> : null}</p>
            {results.length === 0 ? (
              <div className="empty"><Icon name="search" size={34} /><h3>Aucune annonce trouvée</h3><p className="muted">Essayez un autre mot-clé ou retirez un filtre.</p></div>
            ) : (
              <div className="grid-cards cols-3" key={cat + loc + sort + q + max}>
                {results.map((l, i) => <Reveal key={l.id} variant="build" delay={(i % 3) * 70}><ListingCard l={l} /></Reveal>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
