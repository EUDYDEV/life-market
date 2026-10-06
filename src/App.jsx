import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import Intro from './components/Intro';
import Icon from './components/Icons';
import { useStore } from './context/Store';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Categories from './pages/Categories';
import ListingDetail from './pages/ListingDetail';
import Seller from './pages/Seller';
import Sell from './pages/Sell';
import Offers from './pages/Offers';
import Favorites from './pages/Favorites';
import Credits from './pages/Credits';
import Dashboard, { Overview, MyAds, Stats, Subscription, Messages, Boosts, Profile } from './pages/Dashboard';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function NotFound() {
  return <main className="container page-pad center"><h1 className="h1">Page introuvable</h1><p className="muted">Cette page n'existe pas (encore).</p></main>;
}

export default function App() {
  const [ready, setReady] = useState(false);
  const { toast } = useStore();
  const loc = useLocation();
  const inDash = loc.pathname.startsWith('/dashboard');

  return (
    <>
      <Intro onDone={() => setReady(true)} />
      <ScrollToTop />
      <Navbar ready={ready} />
      <div className={`app ${ready ? 'ready' : ''}`}>
        <Routes>
          <Route path="/" element={<Home ready={ready} />} />
          <Route path="/explorer" element={<Explore />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/annonce/:id" element={<ListingDetail />} />
          <Route path="/vendeur/:id" element={<Seller />} />
          <Route path="/vendre" element={<Sell />} />
          <Route path="/offres" element={<Offers />} />
          <Route path="/favoris" element={<Favorites />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="annonces" element={<MyAds />} />
            <Route path="nouvelle" element={<Sell embedded />} />
            <Route path="statistiques" element={<Stats />} />
            <Route path="messages" element={<Messages />} />
            <Route path="abonnement" element={<Subscription />} />
            <Route path="boosts" element={<Boosts />} />
            <Route path="profil" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!inDash && <Footer />}
      </div>
      <BottomNav />
      {toast && <div className="toast" key={toast.k} role="status"><Icon name="check" size={18} /> {toast.msg}</div>}
    </>
  );
}
