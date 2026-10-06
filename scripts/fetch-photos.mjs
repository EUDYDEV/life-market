// Télécharge de vraies photos (Wikimedia Commons, licences libres) pour les annonces de démo.
import fs from 'node:fs';
const Q = {
  1: 'iPhone 15 Pro', 2: 'Samsung Galaxy S24 Ultra', 3: 'MacBook Air M2', 4: 'evening gown dress', 5: 'white sneakers',
  6: 'grey sofa living room', 7: 'Toyota Corolla 2018', 8: 'plot of land for sale', 9: 'apartment living room interior', 10: 'portable generator',
  11: 'tropical fruit basket mango pineapple', 12: 'skincare cosmetics products', 13: 'baby stroller', 14: 'electrician working', 15: 'HP EliteBook laptop',
  16: 'Hyundai Tucson 2020', 17: 'Tecno Camon smartphone', 18: 'African wax print dress', 19: 'wooden dining table chairs', 20: 'rice sack 25 kg',
  21: 'villa with swimming pool', 22: 'bakery oven', 23: 'teddy bear', 24: 'wedding photographer', 25: 'perfume bottle',
  26: 'Smart TV 55 inch', 27: 'Peugeot 208 2019', 28: 'running shoes',
};
const UA = { 'User-Agent': 'LifeMarketDemo/1.0 (eudyproject@gmail.com)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const manifest = {};
for (const [id, q] of Object.entries(Q)) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q + ' filetype:bitmap')}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=900&format=json`;
  let pages = [];
  try { const j = await (await fetch(url, { headers: UA })).json(); pages = Object.values(j.query?.pages || {}).sort((a, b) => a.index - b.index); } catch (e) { console.log(id, 'search fail', e.message); }
  const ok = pages.map((p) => p.imageinfo?.[0]).filter((i) => i && i.mime === 'image/jpeg' && i.width >= 700 && i.height >= 450 && i.width / i.height > 1.1 && i.width / i.height < 2.2);
  let n = 0;
  for (const info of ok) {
    if (n >= 4) break;
    try {
      const r = await fetch(info.thumburl, { headers: UA });
      if (!r.ok) { await sleep(1500); continue; }
      fs.writeFileSync(`public/assets/products/${id}-${n}.jpg`, Buffer.from(await r.arrayBuffer()));
      n++; await sleep(400);
    } catch {}
  }
  manifest[id] = n;
  console.log(id, q, '->', n);
  await sleep(500);
}
fs.writeFileSync('src/data/photos.json', JSON.stringify(manifest));
