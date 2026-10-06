import { Link } from 'react-router-dom';
import Icon from '../components/Icons';
import Reveal from '../components/Reveal';
import ListingImage from '../components/ListingImage';
import { CATEGORIES, LISTINGS } from '../data/mock';

export default function Categories() {
  return (
    <main className="page-pad">
      <div className="container">
        <Reveal className="page-head">
          <span className="kicker">Catégories</span>
          <h1 className="h1">10 catégories, des milliers d'annonces.</h1>
          <p className="lead">Choisissez un univers et trouvez près de chez vous.</p>
        </Reveal>
        <div className="cat-big-grid">
          {CATEGORIES.map((c, i) => {
            const sample = LISTINGS.find((l) => l.category === c.id);
            return (
              <Reveal key={c.id} variant="build" delay={(i % 3) * 80}>
                <Link to={`/explorer?cat=${c.id}`} className="cat-big">
                  <div className="cat-big-art">{sample && <ListingImage l={sample} />}</div>
                  <div className="cat-big-body">
                    <span className="cat-ico"><Icon name={c.icon} size={26} /></span>
                    <div><h3>{c.name}</h3><span className="muted"><b>{c.count}</b> annonces</span></div>
                    <span className="cat-go"><Icon name="arrow" size={18} /></span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </main>
  );
}
