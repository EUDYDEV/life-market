import { Link } from 'react-router-dom';
import Icon from '../components/Icons';
import Reveal from '../components/Reveal';
import { PLANS, formatPrice } from '../data/mock';
import { useStore } from '../context/Store';

const FAQ = [
  ['Combien coûte la consultation ?', 'La consultation des annonces est gratuite pour tous les acheteurs.'],
  ['Comment fonctionnent les crédits ?', "1 crédit = 1 annonce visible pendant 30 jours. 5 crédits sont offerts à l'inscription."],
  ['Comment les acheteurs me contactent-ils ?', 'Directement par WhatsApp ou par téléphone.'],
];

export default function Offers() {
  const { say } = useStore();
  return (
    <main className="page-pad offers">
      <div className="offers-bg" aria-hidden="true"><span /><span /></div>
      <div className="container">
        <Reveal className="page-head center">
          <span className="kicker">Offres vendeurs</span>
          <h1 className="h1">Vendez plus. Payez simple.</h1>
          <p className="lead">Choisissez la formule qui correspond à votre activité.</p>
          <div className="gift-banner"><Icon name="gift" size={22} /><div><b>5 crédits offerts à l'inscription</b><span>1 crédit = 1 annonce visible pendant 30 jours</span></div></div>
        </Reveal>

        <div className="plans">
          {PLANS.map((p, i) => (
            <Reveal key={p.id} variant="build" delay={i * 110} className={`plan ${p.popular ? 'popular' : ''} ${p.id}`}>
              {p.popular && <span className="plan-flag">Le plus choisi</span>}
              {p.saving && <span className="plan-flag save">{p.saving}</span>}
              <div className="plan-head">
                <span className="plan-ico"><Icon name={p.id === 'boost' ? 'bolt' : p.id === 'monthly' ? 'card' : 'star'} size={22} fill={p.id === 'boost'} stroke={p.id === 'boost' ? 0 : 1.8} /></span>
                <h2>{p.name.toUpperCase()}</h2>
              </div>
              <div className="plan-price"><b>{new Intl.NumberFormat('fr-FR').format(p.price).replace(/ | /g, ' ')}</b><span>FCFA <em>{p.unit}</em></span></div>
              <p className="plan-tag">{p.tagline}</p>
              <ul>{p.features.map((x) => <li key={x}><span><Icon name="check" size={14} stroke={3} /></span>{x}</li>)}</ul>
              <button className={`btn btn-lg block ${p.popular ? 'btn-primary' : 'btn-dark'}`} onClick={() => say(`Démo : ${p.name} — ${formatPrice(p.price)} ${p.unit}`)}>{p.cta}</button>
            </Reveal>
          ))}
        </div>

        <Reveal className="faq" delay={100}>
          {FAQ.map(([q, a]) => <details key={q}><summary>{q}<Icon name="plus" size={18} /></summary><p>{a}</p></details>)}
        </Reveal>
        <Reveal className="center" style={{ marginTop: 40 }}><Link to="/vendre" className="btn btn-primary btn-lg"><Icon name="plus" size={20} /> Publier ma première annonce</Link></Reveal>
      </div>
    </main>
  );
}
