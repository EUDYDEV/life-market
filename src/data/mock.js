import PHOTOS from './photos.json';
import CREDITS from './credits.json';

// Toutes les données sont fictives (front-end uniquement).

export const CATEGORIES = [
  { id: 'mode', name: 'Mode', icon: 'mode', count: 186, art: 'dress' },
  { id: 'beaute', name: 'Beauté', icon: 'beaute', count: 94, art: 'beauty' },
  { id: 'tech', name: 'Téléphones & informatique', short: 'Téléphones & info.', icon: 'tech', count: 248, art: 'phone' },
  { id: 'maison', name: 'Maison', icon: 'maison', count: 132, art: 'sofa' },
  { id: 'alimentation', name: 'Alimentation', icon: 'alimentation', count: 78, art: 'food' },
  { id: 'enfants', name: 'Enfants', icon: 'enfants', count: 65, art: 'kids' },
  { id: 'vehicules', name: 'Véhicules', icon: 'vehicules', count: 112, art: 'car' },
  { id: 'immobilier', name: 'Immobilier', icon: 'immobilier', count: 87, art: 'apartment' },
  { id: 'pro', name: 'Matériel professionnel', short: 'Matériel pro', icon: 'pro', count: 54, art: 'tools' },
  { id: 'services', name: 'Services', icon: 'services', count: 71, art: 'service' },
];

export const LOCATIONS = [
  'Cocody', 'Plateau', 'Marcory', 'Yopougon', 'Treichville', 'Abobo',
  'Koumassi', 'Bingerville', 'Grand-Bassam', 'Bouaké', 'Yamoussoukro',
];

export const SELLERS = [
  { id: 's1', name: 'Boutique Fashion Abidjan', initials: 'BF', rating: 4.8, location: 'Abidjan', ads: 24, since: 2024, verified: true, tone: '#1464A5', bio: "Prêt-à-porter féminin et accessoires sélectionnés avec soin. Livraison possible dans tout Abidjan, essayage en boutique à Cocody." },
  { id: 's2', name: 'Tech Plateau', initials: 'TP', rating: 4.9, location: 'Plateau', ads: 41, since: 2023, verified: true, tone: '#0B2347', bio: "Smartphones, ordinateurs et accessoires. Appareils testés et garantis, facture fournie à chaque vente." },
  { id: 's3', name: 'Auto Prestige CI', initials: 'AP', rating: 4.6, location: 'Marcory', ads: 18, since: 2023, verified: true, tone: '#2F7FC0', bio: "Véhicules d'occasion contrôlés. Essai routier sur rendez-vous, papiers à jour." },
  { id: 's4', name: 'Maison & Déco Kadi', initials: 'MK', rating: 4.7, location: 'Cocody', ads: 32, since: 2024, verified: false, tone: '#0F7A8A', bio: "Mobilier, décoration et électroménager pour toute la famille. Montage et livraison à domicile." },
  { id: 's5', name: 'Immo Lagune', initials: 'IL', rating: 4.5, location: 'Bingerville', ads: 15, since: 2022, verified: true, tone: '#134E83', bio: "Terrains, appartements et villas. Visites organisées chaque week-end, dossiers juridiques vérifiés." },
  { id: 's6', name: 'Saveurs du Terroir', initials: 'ST', rating: 4.9, location: 'Yopougon', ads: 27, since: 2024, verified: true, tone: '#C26A1B', bio: "Produits alimentaires locaux : attiéké, huile de palme, épices et fruits de saison, directement des producteurs." },
  { id: 's7', name: 'Pro Équipements', initials: 'PE', rating: 4.4, location: 'Koumassi', ads: 12, since: 2023, verified: false, tone: '#3C5A7D', bio: "Matériel professionnel neuf et reconditionné pour artisans, restaurateurs et PME." },
];

const H = 3600 * 1000;
const ago = (hours) => new Date(Date.now() - hours * H).toISOString();

// kind = illustration utilisée par ProductArt, tone = teinte du fond
export const LISTINGS = [
  { id: 1, title: 'iPhone 15 Pro 256 Go', price: 1250000, category: 'tech', location: 'Cocody', seller: 's2', kind: 'phone', tone: 'blue', accent: '#2B3A55', condition: 'Très bon état', isBoosted: true, createdAt: ago(3), views: 1284, desc: "iPhone 15 Pro titane naturel, 256 Go, batterie à 94 %. Vendu avec chargeur d'origine, coque et facture. Aucun défaut, toujours sous protection écran." },
  { id: 2, title: 'Samsung Galaxy S24 Ultra', price: 980000, category: 'tech', location: 'Plateau', seller: 's2', kind: 'phone', tone: 'sky', accent: '#6E7F99', condition: 'Comme neuf', isBoosted: false, createdAt: ago(9), views: 842, desc: "Galaxy S24 Ultra 512 Go, S Pen inclus. Acheté il y a 3 mois, boîte et accessoires complets." },
  { id: 3, title: 'MacBook Air M2 13"', price: 890000, category: 'tech', location: 'Marcory', seller: 's2', kind: 'laptop', tone: 'sky', accent: '#9AA7B8', condition: 'Très bon état', isBoosted: true, createdAt: ago(5), views: 1011, desc: "MacBook Air M2, 8 Go / 256 Go. 112 cycles de batterie. Livré avec chargeur MagSafe." },
  { id: 4, title: 'Robe de soirée satinée', price: 35000, category: 'mode', location: 'Cocody', seller: 's1', kind: 'dress', tone: 'sand', accent: '#1464A5', condition: 'Neuf', isBoosted: true, createdAt: ago(2), views: 536, desc: "Robe longue satinée, coupe fluide, tailles S à XL disponibles. Idéale pour mariage et cérémonie." },
  { id: 5, title: 'Sneakers urbaines blanches', price: 28000, category: 'mode', location: 'Yopougon', seller: 's1', kind: 'shoes', tone: 'blue', accent: '#F4F7FB', condition: 'Neuf', isBoosted: false, createdAt: ago(14), views: 402, desc: "Baskets légères, semelle confort, pointures 38 à 45. Livraison possible sur Abidjan." },
  { id: 6, title: 'Canapé 3 places en tissu gris', price: 185000, category: 'maison', location: 'Cocody', seller: 's4', kind: 'sofa', tone: 'sand', accent: '#5B7A99', condition: 'Très bon état', isBoosted: false, createdAt: ago(20), views: 689, desc: "Canapé 3 places très confortable, tissu déhoussable. Dimensions 210 x 90 cm. Livraison à négocier." },
  { id: 7, title: 'Toyota Corolla 2018 automatique', price: 7800000, category: 'vehicules', location: 'Marcory', seller: 's3', kind: 'car', tone: 'blue', accent: '#1464A5', condition: 'Bon état', isBoosted: true, createdAt: ago(7), views: 2140, desc: "Corolla 2018, 62 000 km, essence, boîte automatique, climatisation. Première main, carnet d'entretien complet." },
  { id: 8, title: 'Terrain de 600 m² à Bingerville', price: 18000000, category: 'immobilier', location: 'Bingerville', seller: 's5', kind: 'land', tone: 'mint', accent: '#2E7D5B', condition: 'Titre foncier', isBoosted: false, createdAt: ago(30), views: 977, desc: "Terrain viabilisé de 600 m², lot bien situé, proche des commodités. Titre foncier disponible, visite possible le week-end." },
  { id: 9, title: 'Appartement 3 pièces meublé', price: 350000, category: 'immobilier', location: 'Cocody', seller: 's5', kind: 'apartment', tone: 'sky', accent: '#1464A5', condition: 'Location / mois', isBoosted: true, createdAt: ago(11), views: 1530, desc: "Appartement 3 pièces entièrement meublé, 2e étage, gardiennage, parking. Disponible immédiatement." },
  { id: 10, title: 'Groupe électrogène 7 kVA', price: 420000, category: 'pro', location: 'Koumassi', seller: 's7', kind: 'tools', tone: 'sand', accent: '#0B2347', condition: 'Neuf', isBoosted: false, createdAt: ago(26), views: 311, desc: "Groupe électrogène silencieux 7 kVA, démarrage électrique, autonomie 10 h. Garantie 1 an." },
  { id: 11, title: 'Panier de fruits de saison', price: 12500, category: 'alimentation', location: 'Yopougon', seller: 's6', kind: 'food', tone: 'mint', accent: '#C26A1B', condition: 'Frais du jour', isBoosted: false, createdAt: ago(1), views: 214, desc: "Mangues, ananas, papayes et bananes cueillis cette semaine. Livraison le jour même sur commande." },
  { id: 12, title: 'Coffret soin visage complet', price: 22000, category: 'beaute', location: 'Cocody', seller: 's1', kind: 'beauty', tone: 'rose', accent: '#1464A5', condition: 'Neuf', isBoosted: false, createdAt: ago(18), views: 298, desc: "Routine complète : nettoyant, sérum, crème hydratante. Produits adaptés aux peaux foncées." },
  { id: 13, title: 'Draisienne enfant 2-5 ans', price: 45000, category: 'enfants', location: 'Marcory', seller: 's4', kind: 'kids', tone: 'rose', accent: '#B7733B', condition: 'Très bon état', isBoosted: false, createdAt: ago(40), views: 187, desc: "Draisienne légère pour enfants de 2 à 5 ans, selle réglable. Idéale pour apprendre l'équilibre avant le vélo." },
  { id: 14, title: 'Réparation et dépannage électricité', price: 15000, category: 'services', location: 'Abobo', seller: 's7', kind: 'service', tone: 'blue', accent: '#0B2347', condition: 'Service', isBoosted: true, createdAt: ago(6), views: 445, desc: "Électricien qualifié, intervention rapide sur Abidjan. Devis gratuit, travail garanti." },
  { id: 15, title: 'HP EliteBook 840 G8', price: 420000, category: 'tech', location: 'Plateau', seller: 's2', kind: 'laptop', tone: 'blue', accent: '#3C4B63', condition: 'Bon état', isBoosted: false, createdAt: ago(48), views: 523, desc: "Core i5 11e gen, 16 Go de RAM, SSD 512 Go. Idéal bureautique et télétravail." },
  { id: 16, title: 'Hyundai Tucson 2020', price: 12500000, category: 'vehicules', location: 'Cocody', seller: 's3', kind: 'car', tone: 'sky', accent: '#0B2347', condition: 'Très bon état', isBoosted: false, createdAt: ago(55), views: 1380, desc: "SUV 2020, diesel, 48 000 km, toit ouvrant, caméra de recul. Entretien suivi chez le concessionnaire." },
  { id: 17, title: 'Tecno Camon 30 Pro', price: 215000, category: 'tech', location: 'Yopougon', seller: 's2', kind: 'phone', tone: 'mint', accent: '#2E7D9B', condition: 'Neuf', isBoosted: false, createdAt: ago(12), views: 376, desc: "Tecno Camon 30 Pro, 256 Go, appareil photo 50 MP, charge rapide. Scellé, garantie 12 mois." },
  { id: 18, title: 'Ensemble pagne wax sur mesure', price: 42000, category: 'mode', location: 'Treichville', seller: 's1', kind: 'dress', tone: 'sky', accent: '#C26A1B', condition: 'Sur commande', isBoosted: false, createdAt: ago(28), views: 449, desc: "Ensemble en pagne wax, confection sur mesure en 5 jours. Plusieurs motifs disponibles." },
  { id: 19, title: 'Table à manger 6 places', price: 125000, category: 'maison', location: 'Bingerville', seller: 's4', kind: 'sofa', tone: 'blue', accent: '#8A6A4A', condition: 'Neuf', isBoosted: false, createdAt: ago(36), views: 254, desc: "Table en bois massif avec six chaises assorties. Livraison et montage inclus sur Abidjan." },
  { id: 20, title: 'Sac de riz parfumé 25 kg', price: 17500, category: 'alimentation', location: 'Abobo', seller: 's6', kind: 'food', tone: 'sand', accent: '#9C6B2E', condition: 'Neuf', isBoosted: false, createdAt: ago(22), views: 163, desc: "Riz parfumé de qualité supérieure, sac de 25 kg. Prix dégressifs à partir de 5 sacs." },
  { id: 21, title: 'Villa 4 chambres avec piscine', price: 95000000, category: 'immobilier', location: 'Grand-Bassam', seller: 's5', kind: 'apartment', tone: 'mint', accent: '#0F7A8A', condition: 'À vendre', isBoosted: true, createdAt: ago(16), views: 1894, desc: "Villa moderne de 4 chambres, piscine, jardin arboré, proche de la plage. Dossier complet disponible." },
  { id: 22, title: 'Four de boulangerie professionnel', price: 1350000, category: 'pro', location: 'Marcory', seller: 's7', kind: 'tools', tone: 'blue', accent: '#3C5A7D', condition: 'Bon état', isBoosted: false, createdAt: ago(60), views: 142, desc: "Four 3 étages, électrique, parfait état de fonctionnement. Idéal pour une boulangerie ou pâtisserie." },
  { id: 23, title: 'Peluche ours géant 1 m', price: 18000, category: 'enfants', location: 'Cocody', seller: 's4', kind: 'kids', tone: 'sand', accent: '#C29A6B', condition: 'Neuf', isBoosted: false, createdAt: ago(8), views: 201, desc: "Grand ourson très doux, idéal pour cadeau d'anniversaire. Livraison possible." },
  { id: 24, title: 'Photographe événementiel', price: 75000, category: 'services', location: 'Plateau', seller: 's2', kind: 'service', tone: 'sky', accent: '#1464A5', condition: 'Service', isBoosted: false, createdAt: ago(33), views: 318, desc: "Photographie de mariages, baptêmes et événements d'entreprise. Galerie livrée sous 72 h." },
  { id: 25, title: 'Parfum floral 100 ml', price: 38000, category: 'beaute', location: 'Marcory', seller: 's1', kind: 'beauty', tone: 'sky', accent: '#5B7FA8', condition: 'Neuf', isBoosted: false, createdAt: ago(44), views: 267, desc: "Eau de parfum 100 ml, notes florales et boisées, tenue longue durée." },
  { id: 26, title: 'Smart TV 55" 4K', price: 295000, category: 'maison', location: 'Yopougon', seller: 's4', kind: 'laptop', tone: 'sand', accent: '#1B2A44', condition: 'Neuf', isBoosted: false, createdAt: ago(15), views: 612, desc: "Téléviseur 4K Smart TV 55 pouces, Wi-Fi, applications de streaming. Garantie 2 ans." },
  { id: 27, title: 'Peugeot 208 2019 essence', price: 6500000, category: 'vehicules', location: 'Abobo', seller: 's3', kind: 'car', tone: 'mint', accent: '#C23B3B', condition: 'Bon état', isBoosted: false, createdAt: ago(70), views: 489, desc: "Citadine économique, 54 000 km, climatisation, Bluetooth. Papiers à jour." },
  { id: 28, title: 'Sneakers running homme', price: 32000, category: 'mode', location: 'Plateau', seller: 's1', kind: 'shoes', tone: 'sand', accent: '#1464A5', condition: 'Neuf', isBoosted: false, createdAt: ago(25), views: 351, desc: "Chaussures de running amorties, respirantes, pointures 40 à 46." },
];

export const photoCount = (l) => (l.photo ? 1 : (PHOTOS[l.id] || []).length);
export const photoSrc = (l, n = 0) => (l.photo ? l.photo : PHOTOS[l.id]?.[n] ? `/assets/products/${PHOTOS[l.id][n]}` : null);

export const photoCredit = (l, n = 0) => (l.photo ? null : CREDITS[l.id]?.[n] || null);
export const allCredits = () => Object.entries(CREDITS).flatMap(([id, a]) => a.map((c) => ({ id, ...c })));

export const getListing = (id) => LISTINGS.find((l) => String(l.id) === String(id));
export const getSeller = (id) => SELLERS.find((s) => s.id === id);
export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);

export const formatPrice = (n) =>
  new Intl.NumberFormat('fr-FR').format(n).replace(/ | /g, ' ') + ' FCFA';

export const timeAgo = (iso) => {
  const h = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / H));
  if (h < 24) return `il y a ${h} h`;
  const d = Math.round(h / 24);
  return `il y a ${d} j`;
};

export const TV_SHOWS = ['Willy à Midi', 'Le Vrai Match', 'Le Grand Talk'];

export const PLANS = [
  {
    id: 'boost', name: 'Boosté', price: 1000, unit: '/ 7 jours',
    tagline: '1 annonce active et mise en avant dans sa catégorie.',
    features: ['1 annonce active', 'Mise en avant dans sa catégorie', 'Badge ⚡ Boosté', 'Placement prioritaire'],
    cta: 'Booster une annonce',
  },
  {
    id: 'monthly', name: 'Mensuel', price: 5000, unit: '/ mois', popular: true,
    tagline: "Pour les vendeurs qui publient régulièrement.",
    features: ["Jusqu'à 30 annonces actives", 'Page vendeur', 'Statistiques de vues', 'Statistiques de contacts'],
    cta: "Choisir l'offre mensuelle",
  },
  {
    id: 'quarterly', name: 'Trimestriel', price: 12000, unit: '/ trimestre', saving: '20 % d’économie',
    tagline: 'Même service pendant 3 mois.',
    features: ["Jusqu'à 30 annonces actives", 'Page vendeur', 'Statistiques de vues', 'Statistiques de contacts'],
    cta: "Choisir l'offre trimestrielle",
  },
];

// Séries fictives pour les graphiques
export const VIEWS_7 = [420, 560, 480, 690, 740, 910, 485];
export const CONTACTS_7 = [18, 26, 22, 31, 29, 38, 22];
export const VIEWS_30 = [210,260,240,300,340,310,420,380,350,410,460,430,520,500,470,540,610,580,560,640,690,660,720,700,780,760,840,910,880,485];
export const CONTACTS_30 = [6,9,8,11,12,10,16,14,13,15,18,17,20,19,18,21,24,22,21,26,28,27,29,28,32,31,35,38,36,22];
