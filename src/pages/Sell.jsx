import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icons';
import Reveal from '../components/Reveal';
import Select from '../components/Select';
import ListingCard from '../components/ListingCard';
import { CATEGORIES, LOCATIONS, formatPrice } from '../data/mock';
import { useStore } from '../context/Store';

const CONDITIONS = ['Neuf', 'Comme neuf', 'Très bon état', 'Bon état', 'Service'];
const TONES = ['blue', 'sky', 'sand', 'mint', 'rose'];
const empty = { title: '', category: '', price: '', location: '', condition: '', desc: '', phone: '', boost: false };

function Field({ error, label, children, hint }) {
  return (
    <div className={`field ${error ? 'err' : ''}`}>
      <label>{label}</label>
      {children}
      {error ? <small className="error">{error}</small> : hint && <small>{hint}</small>}
    </div>
  );
}

export default function Sell({ embedded = false }) {
  const { addListing, credits, say } = useStore();
  const [f, setF] = useState(empty);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);

  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p)), []);

  const set = (k, v) => { setF((s) => ({ ...s, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };

  const validate = () => {
    const e = {};
    if (f.title.trim().length < 4) e.title = 'Donnez un titre d\'au moins 4 caractères.';
    if (!f.category) e.category = 'Choisissez une catégorie.';
    if (!f.price || Number(f.price) <= 0) e.price = 'Indiquez un prix valide en FCFA.';
    if (!f.location) e.location = 'Choisissez une localisation.';
    if (!f.condition) e.condition = 'Précisez l\'état.';
    if (f.desc.trim().length < 15) e.desc = 'Décrivez votre annonce (15 caractères minimum).';
    if (!/^\+?[0-9\s]{8,16}$/.test(f.phone.trim())) e.phone = 'Entrez un numéro de téléphone / WhatsApp valide.';
    return e;
  };

  const onPhotos = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 5 - photos.length);
    setPhotos((p) => [...p, ...files.map((x) => URL.createObjectURL(x))].slice(0, 5));
    e.target.value = '';
  };

  const submit = (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) { document.querySelector('.field.err')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    const cat = CATEGORIES.find((c) => c.id === f.category);
    const idx = CATEGORIES.indexOf(cat);
    const draft = {
      title: f.title.trim(), price: Number(f.price), category: f.category, location: f.location,
      condition: f.condition, desc: f.desc.trim(), isBoosted: f.boost,
      kind: cat.art, tone: TONES[idx % TONES.length], accent: '#1464A5', photo: photos[0] || null,
    };
    addListing(draft);
    say('Annonce publiée !');
    setDone(draft);
  };

  const preview = {
    id: 'preview', title: f.title || 'Titre de votre annonce', price: Number(f.price) || 0,
    category: f.category || 'tech', location: f.location || 'Votre ville', seller: 's1',
    condition: f.condition || 'État', isBoosted: f.boost, kind: CATEGORIES.find((c) => c.id === f.category)?.art || 'phone',
    tone: 'blue', accent: '#1464A5', photo: photos[0] || null,
  };

  if (credits === 0 && !done) {
    return (
      <main className={embedded ? '' : 'page-pad'}>
        <div className="container"><div className="empty"><Icon name="gift" size={34} /><h3>Vous n'avez plus de crédit</h3><p className="muted">1 crédit = 1 annonce visible pendant 30 jours. Passez à une offre pour publier davantage.</p><Link to="/offres" className="btn btn-primary">Voir les offres</Link></div></div>
      </main>
    );
  }

  if (done) {
    return (
      <main className={embedded ? '' : 'page-pad'}>
        <div className="container"><div className="success">
          <span className="success-ring"><Icon name="check" size={44} stroke={2.6} /></span>
          <h1 className="h1">Votre annonce est en ligne !</h1>
          <p className="lead">« {done.title} » est visible pendant 30 jours. Il vous reste <b>{credits}</b> crédit{credits > 1 ? 's' : ''}.</p>
          <div className="row-btns">
            <Link to="/dashboard/annonces" className="btn btn-primary btn-lg">Voir mes annonces</Link>
            <button className="btn btn-ghost btn-lg" onClick={() => { setDone(null); setF(empty); setPhotos([]); }}>Publier une autre annonce</button>
          </div>
        </div></div>
      </main>
    );
  }

  return (
    <main className={embedded ? '' : 'page-pad'}>
      <div className="container">
        {!embedded && <Reveal className="page-head"><span className="kicker">Vendre</span><h1 className="h1">Publier une annonce</h1><p className="lead">Gratuit pour les acheteurs, simple pour vous. <b>{credits}</b> crédit{credits > 1 ? 's' : ''} disponible{credits > 1 ? 's' : ''}.</p></Reveal>}
        {embedded && <h1 className="h2" style={{ marginBottom: 20 }}>Nouvelle annonce</h1>}
        <div className="sell-layout">
          <form className="card form" onSubmit={submit} noValidate>
            <Field name="title" error={errors.title} label="Titre de l'annonce">
              <input className="input" value={f.title} maxLength={70} onChange={(e) => set('title', e.target.value)} placeholder="Ex. iPhone 15 Pro 256 Go" />
            </Field>
            <div className="two">
              <Field name="category" error={errors.category} label="Catégorie">
                <Select value={f.category} onChange={(v) => set('category', v)} placeholder="Choisir…" options={CATEGORIES.map((c) => ({ value: c.id, label: c.name, icon: c.icon }))} />
              </Field>
              <Field name="condition" error={errors.condition} label="État">
                <Select value={f.condition} onChange={(v) => set('condition', v)} placeholder="Choisir…" options={CONDITIONS.map((c) => ({ value: c, label: c }))} />
              </Field>
            </div>
            <div className="two">
              <Field name="price" error={errors.price} label="Prix (FCFA)" hint={f.price ? formatPrice(Number(f.price)) : null}>
                <input className="input" inputMode="numeric" value={f.price} onChange={(e) => set('price', e.target.value.replace(/\D/g, ''))} placeholder="1 250 000" />
              </Field>
              <Field name="location" error={errors.location} label="Localisation">
                <Select value={f.location} onChange={(v) => set('location', v)} placeholder="Choisir…" options={LOCATIONS.map((l) => ({ value: l, label: l, icon: 'pin' }))} />
              </Field>
            </div>
            <Field name="desc" error={errors.desc} label="Description">
              <textarea className="input" rows={4} value={f.desc} maxLength={500} onChange={(e) => set('desc', e.target.value)} placeholder="Décrivez votre produit ou service : caractéristiques, état, disponibilité…" />
              <small className="count-c">{f.desc.length}/500</small>
            </Field>
            <div className="field">
              <label>Photos <span className="muted">(jusqu'à 5)</span></label>
              <div className="uploader">
                {photos.map((p, i) => (
                  <div className="up-thumb" key={p}><img src={p} alt="" /><button type="button" onClick={() => setPhotos((x) => x.filter((_, j) => j !== i))} aria-label="Retirer la photo"><Icon name="close" size={14} /></button></div>
                ))}
                {photos.length < 5 && <label className="up-add"><Icon name="plus" size={22} /><span>Ajouter</span><input type="file" accept="image/*" multiple onChange={onPhotos} hidden /></label>}
              </div>
            </div>
            <Field name="phone" error={errors.phone} label="Téléphone / WhatsApp" hint="Les acheteurs vous contacteront à ce numéro.">
              <input className="input" inputMode="tel" value={f.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+225 07 00 00 00 00" />
            </Field>
            <label className="boost-opt">
              <input type="checkbox" checked={f.boost} onChange={(e) => set('boost', e.target.checked)} />
              <span className="bo-ico"><Icon name="bolt" size={20} fill stroke={0} /></span>
              <span><b>Booster cette annonce</b><em>1 000 FCFA / 7 jours · mise en avant dans sa catégorie</em></span>
              <i className="switch" />
            </label>
            <button type="submit" className="btn btn-primary btn-lg block">Publier l'annonce <Icon name="arrow" size={20} /></button>
            <p className="muted small center">1 crédit sera utilisé · annonce visible 30 jours</p>
          </form>

          <aside className="sell-preview">
            <h4>Aperçu en direct</h4>
            <div className="no-click"><ListingCard l={preview} /></div>
            <ul className="tips">
              <li><Icon name="check" size={16} /> Une photo nette multiplie les contacts</li>
              <li><Icon name="check" size={16} /> Indiquez un prix clair</li>
              <li><Icon name="check" size={16} /> Répondez vite sur WhatsApp</li>
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
