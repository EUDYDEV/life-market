import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LISTINGS } from '../data/mock';

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };

// Magasin 100 % front : favoris persistés en localStorage, annonces ajoutées en mémoire.
export function StoreProvider({ children }) {
  const [favs, setFavs] = useState(() => load('lm:favs', [1, 4]));
  const [mine, setMine] = useState(() => load('lm:mine', []));
  const [credits, setCredits] = useState(() => load('lm:credits', 5));
  const [toast, setToast] = useState(null);

  useEffect(() => { try { localStorage.setItem('lm:favs', JSON.stringify(favs)); } catch {} }, [favs]);
  useEffect(() => { try { localStorage.setItem('lm:mine', JSON.stringify(mine)); localStorage.setItem('lm:credits', JSON.stringify(credits)); } catch {} }, [mine, credits]);

  const say = useCallback((msg) => {
    setToast({ msg, k: Date.now() });
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const toggleFav = useCallback((id) => {
    setFavs((f) => {
      const on = f.includes(id);
      say(on ? 'Retiré des favoris' : 'Ajouté aux favoris');
      return on ? f.filter((x) => x !== id) : [...f, id];
    });
  }, [say]);

  const listings = useMemo(() => [...mine, ...LISTINGS], [mine]);

  const addListing = (l) => {
    setMine((m) => [{ ...l, id: `u${Date.now()}`, seller: 's1', createdAt: new Date().toISOString(), views: 0, mine: true }, ...m]);
    setCredits((c) => Math.max(0, c - 1));
  };
  const removeMine = (id) => { setMine((m) => m.filter((x) => x.id !== id)); say('Annonce supprimée'); };
  const toggleBoost = (id) => setMine((m) => m.map((x) => (x.id === id ? { ...x, isBoosted: !x.isBoosted } : x)));

  return (
    <Ctx.Provider value={{ favs, toggleFav, listings, addListing, removeMine, toggleBoost, credits, toast, say, mine }}>
      {children}
    </Ctx.Provider>
  );
}
