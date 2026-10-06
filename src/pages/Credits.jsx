import Reveal from '../components/Reveal';
import { LISTINGS, allCredits } from '../data/mock';

export default function Credits() {
  const rows = allCredits();
  const title = (id) => LISTINGS.find((l) => String(l.id) === id)?.title;
  return (
    <main className="page-pad">
      <div className="container">
        <Reveal className="page-head">
          <span className="kicker">Crédits</span>
          <h1 className="h1">Crédits photos</h1>
          <p className="lead">Les photos de démonstration proviennent de Wikimedia Commons et sont utilisées selon leurs licences libres (CC0, CC BY, CC BY-SA). Merci à leurs auteurs.</p>
        </Reveal>
        <div className="card credits-list">
          {rows.map((c) => (
            <div className="credit-row" key={c.file}>
              <img src={`/assets/products/${c.file}`} alt="" loading="lazy" />
              <div>
                <b>{title(c.id)}</b>
                <span>{c.author || 'Auteur non précisé'} — {c.licenseUrl ? <a href={c.licenseUrl} target="_blank" rel="noreferrer">{c.license}</a> : c.license}{c.page && <> · <a href={c.page} target="_blank" rel="noreferrer">Source</a></>}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
