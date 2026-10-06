import { useMemo, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Icon from '../components/Icons';
import Counter from '../components/Counter';
import Reveal from '../components/Reveal';
import ListingImage from '../components/ListingImage';
import { CONTACTS_30, CONTACTS_7, VIEWS_30, VIEWS_7, formatPrice, getCategory } from '../data/mock';
import { useStore } from '../context/Store';

const NAV = [
  ['/dashboard', 'Vue générale', 'grid', true],
  ['/dashboard/annonces', 'Mes annonces', 'list'],
  ['/dashboard/nouvelle', 'Nouvelle annonce', 'plus'],
  ['/dashboard/statistiques', 'Statistiques', 'chart'],
  ['/dashboard/messages', 'Messages', 'chat'],
  ['/dashboard/abonnement', 'Abonnement', 'card'],
  ['/dashboard/boosts', 'Boosts', 'bolt'],
  ['/dashboard/profil', 'Profil', 'user'],
];

export default function Dashboard() {
  return (
    <main className="dash">
      <aside className="dash-side">
        <div className="dash-user"><span className="avatar" style={{ background: '#1464A5' }}>BF</span><div><b>Boutique Fashion</b><span>Offre Mensuel</span></div></div>
        <nav>
          {NAV.map(([to, label, icon, end]) => (
            <NavLink key={to} to={to} end={end}><Icon name={icon} size={20} /><span>{label}</span></NavLink>
          ))}
        </nav>
      </aside>
      <div className="dash-main"><Outlet /></div>
    </main>
  );
}

/* ---------- Graphiques SVG légers ---------- */
function AreaChart({ data, labels, color = '#1464A5', unit = '' }) {
  const [hi, setHi] = useState(null);
  const W = 600, H = 220, P = { l: 8, r: 8, t: 16, b: 26 };
  const max = Math.max(...data) * 1.15;
  const x = (i) => P.l + (i * (W - P.l - P.r)) / (data.length - 1);
  const y = (v) => P.t + (1 - v / max) * (H - P.t - P.b);
  const line = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L${x(data.length - 1)} ${H - P.b} L${x(0)} ${H - P.b} Z`;
  const id = 'ar' + color.slice(1);
  const step = Math.ceil(data.length / 7);
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} onMouseLeave={() => setHi(null)} role="img" aria-label="Graphique">
        <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".28" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => <line key={t} x1={P.l} x2={W - P.r} y1={P.t + t * (H - P.t - P.b)} y2={P.t + t * (H - P.t - P.b)} className="gl" />)}
        <path d={area} fill={`url(#${id})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="draw" pathLength="1" />
        {data.map((v, i) => (
          <g key={i} onMouseEnter={() => setHi(i)}>
            <rect x={x(i) - (W / data.length) / 2} y="0" width={W / data.length} height={H} fill="transparent" />
            {i % step === 0 && <text x={x(i)} y={H - 6} textAnchor="middle" className="ax">{labels[i]}</text>}
          </g>
        ))}
        {hi !== null && <g><line x1={x(hi)} x2={x(hi)} y1={P.t} y2={H - P.b} className="cursor" /><circle cx={x(hi)} cy={y(data[hi])} r="5" fill="#fff" stroke={color} strokeWidth="3" /></g>}
      </svg>
      {hi !== null && <div className="tip" style={{ left: `${(x(hi) / W) * 100}%` }}><b>{data[hi]}{unit}</b><span>{labels[hi]}</span></div>}
    </div>
  );
}

function BarChart({ data, labels, color = '#1464A5' }) {
  const [hi, setHi] = useState(null);
  const max = Math.max(...data);
  return (
    <div className="bars" onMouseLeave={() => setHi(null)}>
      {data.map((v, i) => (
        <div key={i} className={`bar ${hi === i ? 'hi' : ''}`} onMouseEnter={() => setHi(i)}>
          <span className="bar-v">{v}</span>
          <i style={{ height: `${(v / max) * 100}%`, background: color, '--d': `${i * 40}ms` }} />
          <em>{labels[i]}</em>
        </div>
      ))}
    </div>
  );
}

const DAYS7 = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const DAYS30 = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

function useMine() {
  const { listings } = useStore();
  return listings.filter((l) => l.seller === 's1');
}

/* ---------- Vue générale ---------- */
export function Overview() {
  const mine = useMine();
  const recent = [...mine].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  const cards = [
    ['eye', 4285, 'vues', '+12 %'], ['whatsapp', 186, 'contacts', '+8 %'],
    ['list', 12, 'annonces actives', ''], ['gift', 8, 'annonces restantes', ''],
  ];
  const cardsFull = [
    { ico: 'list', n: 12, l: 'annonces actives', t: '+2 cette semaine' },
    { ico: 'eye', n: 4285, l: 'vues', t: '+12 % vs semaine dernière' },
    { ico: 'whatsapp', n: 186, l: 'contacts', t: '+8 %' },
    { ico: 'gift', n: 8, l: 'annonces restantes', t: 'sur votre offre' },
  ];
  return (
    <div className="dash-page">
      <Reveal className="dash-head">
        <div><h1 className="h1">Bonjour 👋</h1><p className="lead">Votre activité cette semaine.</p></div>
        <Link to="/dashboard/nouvelle" className="btn btn-primary"><Icon name="plus" size={18} /> Nouvelle annonce</Link>
      </Reveal>
      <div className="kpis">
        {cardsFull.map((c, i) => (
          <Reveal key={c.l} variant="build" delay={i * 80} className="kpi">
            <span className="kpi-ico"><Icon name={c.ico} size={20} /></span>
            <strong><Counter to={c.n} /></strong><span>{c.l}</span><em>{c.t}</em>
          </Reveal>
        ))}
      </div>
      <div className="dash-grid">
        <Reveal className="card chart-card"><div className="card-h"><h3>Vues</h3><span className="muted">7 derniers jours</span></div><AreaChart data={VIEWS_7} labels={DAYS7} /></Reveal>
        <Reveal className="card chart-card" delay={100}><div className="card-h"><h3>Contacts</h3><span className="muted">7 derniers jours</span></div><BarChart data={CONTACTS_7} labels={DAYS7} color="#0B2347" /></Reveal>
      </div>
      <Reveal className="card">
        <div className="card-h"><h3>Annonces récentes</h3><Link to="/dashboard/annonces" className="link-arrow">Tout voir <Icon name="arrow" size={16} /></Link></div>
        <AdTable items={recent} compact />
      </Reveal>
    </div>
  );
}

function AdTable({ items, compact, onBoost, onDelete }) {
  return (
    <div className="adtable">
      {items.map((l) => (
        <div className="adrow" key={l.id}>
          <Link to={`/annonce/${l.id}`} className="adthumb"><ListingImage l={l} /></Link>
          <div className="adinfo"><b>{l.title}</b><span>{formatPrice(l.price)} · {getCategory(l.category)?.short || getCategory(l.category)?.name}</span></div>
          <span className="adviews"><Icon name="eye" size={15} /> {l.views}</span>
          <span className={`status ${l.isBoosted ? 'boost' : 'ok'}`}>{l.isBoosted ? '⚡ Boostée' : 'Active'}</span>
          {!compact && (
            <span className="adactions">
              <button className="btn btn-ghost btn-sm" onClick={() => onBoost(l)}>{l.isBoosted ? 'Retirer le boost' : 'Booster'}</button>
              {l.mine && <button className="icon-btn" onClick={() => onDelete(l.id)} aria-label="Supprimer"><Icon name="trash" size={18} /></button>}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- Mes annonces ---------- */
export function MyAds() {
  const mine = useMine();
  const { toggleBoost, removeMine, say } = useStore();
  const [local, setLocal] = useState({});
  const items = mine.map((l) => (l.id in local ? { ...l, isBoosted: local[l.id] } : l));
  const boost = (l) => {
    if (l.mine) toggleBoost(l.id); else setLocal((s) => ({ ...s, [l.id]: !l.isBoosted }));
    say(l.isBoosted ? 'Boost retiré' : 'Annonce boostée pour 7 jours (démo)');
  };
  return (
    <div className="dash-page">
      <div className="dash-head"><div><h1 className="h1">Mes annonces</h1><p className="lead">{items.length} annonces publiées</p></div><Link to="/dashboard/nouvelle" className="btn btn-primary"><Icon name="plus" size={18} /> Nouvelle annonce</Link></div>
      <div className="card"><AdTable items={items} onBoost={boost} onDelete={removeMine} /></div>
    </div>
  );
}

/* ---------- Statistiques ---------- */
export function Stats() {
  const [range, setRange] = useState(7);
  const mine = useMine();
  const top = useMemo(() => [...mine].sort((a, b) => b.views - a.views).slice(0, 5), [mine]);
  const v = range === 7 ? VIEWS_7 : VIEWS_30;
  const c = range === 7 ? CONTACTS_7 : CONTACTS_30;
  const labels = range === 7 ? DAYS7 : DAYS30;
  const sum = (a) => a.reduce((x, y) => x + y, 0);
  return (
    <div className="dash-page">
      <div className="dash-head"><div><h1 className="h1">Statistiques</h1><p className="lead">Vues et contacts de vos annonces.</p></div>
        <div className="seg">{[7, 30].map((r) => <button key={r} className={range === r ? 'on' : ''} onClick={() => setRange(r)}>{r} jours</button>)}</div>
      </div>
      <div className="kpis three">
        <div className="kpi"><span className="kpi-ico"><Icon name="eye" size={20} /></span><strong>{new Intl.NumberFormat('fr-FR').format(sum(v))}</strong><span>vues</span></div>
        <div className="kpi"><span className="kpi-ico"><Icon name="whatsapp" size={20} /></span><strong>{sum(c)}</strong><span>contacts</span></div>
        <div className="kpi"><span className="kpi-ico"><Icon name="chart" size={20} /></span><strong>{((sum(c) / sum(v)) * 100).toFixed(1)} %</strong><span>taux de contact</span></div>
      </div>
      <div className="card chart-card"><div className="card-h"><h3>Vues</h3></div><AreaChart key={range + 'v'} data={v} labels={labels} /></div>
      <div className="card chart-card"><div className="card-h"><h3>Contacts</h3></div><AreaChart key={range + 'c'} data={c} labels={labels} color="#0B2347" /></div>
      <div className="card"><div className="card-h"><h3>Annonces les plus vues</h3></div>
        {top.map((l, i) => (
          <div className="rank" key={l.id}><span>{i + 1}</span><b>{l.title}</b><div className="meter"><i style={{ width: `${(l.views / top[0].views) * 100}%` }} /></div><em>{l.views}</em></div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Messages ---------- */
const CONVOS = [
  { id: 1, name: 'Awa K.', ad: 'iPhone 15 Pro', msgs: [['them', 'Bonjour, est-il toujours disponible ?'], ['me', 'Oui, toujours disponible !'], ['them', 'Je peux passer demain à Cocody ?']] },
  { id: 2, name: 'Jean-Marc D.', ad: 'Robe de soirée', msgs: [['them', 'Quelle taille avez-vous en stock ?']] },
  { id: 3, name: 'Fatou S.', ad: 'Ensemble pagne wax', msgs: [['them', 'Combien de temps pour la confection ?'], ['me', '5 jours maximum.']] },
];
export function Messages() {
  const [convos, setConvos] = useState(CONVOS);
  const [sel, setSel] = useState(1);
  const [txt, setTxt] = useState('');
  const cur = convos.find((c) => c.id === sel);
  const send = (e) => {
    e.preventDefault();
    if (!txt.trim()) return;
    setConvos((cs) => cs.map((c) => (c.id === sel ? { ...c, msgs: [...c.msgs, ['me', txt.trim()]] } : c)));
    setTxt('');
  };
  return (
    <div className="dash-page">
      <div className="dash-head"><div><h1 className="h1">Messages</h1><p className="lead">Vos échanges avec les acheteurs.</p></div></div>
      <div className="card inbox">
        <div className="inbox-list">
          {convos.map((c) => (
            <button key={c.id} className={c.id === sel ? 'on' : ''} onClick={() => setSel(c.id)}>
              <span className="avatar sm" style={{ background: '#2F7FC0' }}>{c.name[0]}</span>
              <div><b>{c.name}</b><span>{c.msgs[c.msgs.length - 1][1]}</span></div>
            </button>
          ))}
        </div>
        <div className="thread">
          <div className="thread-h"><b>{cur.name}</b><span className="muted">à propos de « {cur.ad} »</span></div>
          <div className="thread-b">{cur.msgs.map(([w, m], i) => <p key={i} className={w}>{m}</p>)}</div>
          <form onSubmit={send}><input className="input" value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Écrire un message…" /><button className="btn btn-primary" aria-label="Envoyer"><Icon name="send" size={18} /></button></form>
        </div>
      </div>
    </div>
  );
}

/* ---------- Abonnement ---------- */
export function Subscription() {
  const { credits } = useStore();
  return (
    <div className="dash-page">
      <div className="dash-head"><div><h1 className="h1">Abonnement</h1><p className="lead">Votre offre et vos crédits.</p></div><Link to="/offres" className="btn btn-ghost">Changer d'offre</Link></div>
      <div className="dash-grid">
        <div className="card plan-now">
          <span className="chip chip-soft">Offre actuelle</span>
          <h2 className="h2">Mensuel</h2>
          <div className="plan-price"><b>5 000</b><span>FCFA <em>/ mois</em></span></div>
          <ul className="plain"><li><Icon name="check" size={16} /> Jusqu'à 30 annonces actives</li><li><Icon name="check" size={16} /> Page vendeur</li><li><Icon name="check" size={16} /> Statistiques de vues et de contacts</li></ul>
          <div className="usage"><div><span>Annonces actives</span><b>12 / 30</b></div><div className="meter lg"><i style={{ width: '40%' }} /></div></div>
        </div>
        <div className="card credits">
          <span className="kpi-ico"><Icon name="gift" size={22} /></span>
          <strong>{credits}</strong><span>crédits disponibles</span>
          <p className="muted">1 crédit = 1 annonce visible pendant 30 jours. 5 crédits offerts à l'inscription.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Boosts ---------- */
export function Boosts() {
  const mine = useMine();
  const { toggleBoost, say } = useStore();
  const [local, setLocal] = useState({});
  const items = mine.map((l) => (l.id in local ? { ...l, isBoosted: local[l.id] } : l));
  const act = (l) => { if (l.mine) toggleBoost(l.id); else setLocal((s) => ({ ...s, [l.id]: !l.isBoosted })); say(l.isBoosted ? 'Boost arrêté' : 'Boost activé : 1 000 FCFA / 7 jours (démo)'); };
  return (
    <div className="dash-page">
      <div className="dash-head"><div><h1 className="h1">Boosts</h1><p className="lead">Mettez vos annonces en avant dans leur catégorie — 1 000 FCFA / 7 jours.</p></div></div>
      <div className="boost-grid">
        {items.map((l) => (
          <div key={l.id} className={`card boost-card ${l.isBoosted ? 'on' : ''}`}>
            <div className="adthumb"><ListingImage l={l} /></div>
            <b>{l.title}</b>
            <span className="muted">{l.isBoosted ? 'Boost actif · 5 jours restants' : 'Non boostée'}</span>
            <button className={`btn btn-sm ${l.isBoosted ? 'btn-ghost' : 'btn-primary'}`} onClick={() => act(l)}><Icon name="bolt" size={16} fill stroke={0} /> {l.isBoosted ? 'Arrêter' : 'Booster'}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Profil ---------- */
export function Profile() {
  const { say } = useStore();
  const [p, setP] = useState({ name: 'Boutique Fashion Abidjan', phone: '+225 07 00 00 00 00', city: 'Abidjan', bio: 'Prêt-à-porter féminin et accessoires sélectionnés avec soin.' });
  return (
    <div className="dash-page">
      <div className="dash-head"><div><h1 className="h1">Profil</h1><p className="lead">Informations affichées sur votre page vendeur.</p></div><Link to="/vendeur/s1" className="btn btn-ghost">Voir ma page</Link></div>
      <form className="card form" onSubmit={(e) => { e.preventDefault(); say('Profil enregistré'); }}>
        <div className="field"><label>Nom de la boutique</label><input className="input" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} /></div>
        <div className="two">
          <div className="field"><label>Téléphone / WhatsApp</label><input className="input" value={p.phone} onChange={(e) => setP({ ...p, phone: e.target.value })} /></div>
          <div className="field"><label>Ville</label><input className="input" value={p.city} onChange={(e) => setP({ ...p, city: e.target.value })} /></div>
        </div>
        <div className="field"><label>Description</label><textarea className="input" rows={4} value={p.bio} onChange={(e) => setP({ ...p, bio: e.target.value })} /></div>
        <button className="btn btn-primary">Enregistrer</button>
      </form>
    </div>
  );
}
