// Rejoue les recherches pour retrouver auteur + licence de chaque photo déjà téléchargée (taille identique = même fichier).
import fs from 'node:fs';
const UA = { 'User-Agent': 'LifeMarketDemo/1.0 (eudyproject@gmail.com)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const strip = (h = '') => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
async function search(q, limit, filter = true) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=900&format=json`;
  for (let t = 0; t < 3; t++) {
    try { const j = await (await fetch(url, { headers: UA })).json(); const pages = Object.values(j.query?.pages || {}).sort((a, b) => a.index - b.index);
      return pages.map((p) => ({ title: p.title, ...p.imageinfo?.[0] })).filter((i) => i.mime === 'image/jpeg' && i.width >= 700 && i.height >= 450 && i.width / i.height > 1.1 && i.width / i.height < 2.2); } catch { await sleep(2000); }
  }
  return [];
}
const sizeOf = async (u) => { try { const r = await fetch(u, { headers: UA }); return r.ok ? (await r.arrayBuffer()).byteLength : -1; } catch { return -1; } };
const manifest = JSON.parse(fs.readFileSync('src/data/photos.json', 'utf8'));
const out = {};
const dir = 'public/assets/products/';
// pour chaque fichier retenu, on cherche parmi les requêtes possibles celle dont une miniature a la même taille
const QUERIES = {
  1: ['iPhone 15 Pro filetype:bitmap'], 2: ['Samsung Galaxy S24 Ultra filetype:bitmap'], 3: ['MacBook Air M2 filetype:bitmap'], 5: ['white sneakers filetype:bitmap'], 7: ['Toyota Corolla 2018 filetype:bitmap'], 8: ['plot of land for sale filetype:bitmap'],
  9: ['apartment living room interior filetype:bitmap'], 10: ['portable generator filetype:bitmap'], 11: ['fruit basket', 'tropical fruit basket mango pineapple filetype:bitmap'], 12: ['skincare cosmetics products filetype:bitmap'], 13: ['child bicycle', 'kids bike', 'children bicycle park'],
  14: ['electrician working filetype:bitmap'], 15: ['HP EliteBook laptop filetype:bitmap'], 16: ['Hyundai Tucson 2020 filetype:bitmap'], 17: ['Tecno Camon smartphone filetype:bitmap'], 18: ['wax print fabric', 'African print dress', 'Ankara fashion'],
  19: ['wooden dining table chairs filetype:bitmap'], 20: ['rice bag', 'sack of rice', 'rice grains'], 21: ['villa with swimming pool filetype:bitmap'], 22: ['bakery bread oven', 'commercial baking oven', 'pizza oven'], 23: ['teddy bear filetype:bitmap'],
  24: ['wedding photographer filetype:bitmap'], 25: ['perfume bottle filetype:bitmap', 'perfume spray bottle', 'eau de parfum bottle', 'fragrance bottle'], 26: ['Samsung smart TV', 'LCD television 55', 'flat screen TV living room', 'television set', 'LED TV'], 27: ['Peugeot 208 2019 filetype:bitmap'], 28: ['running shoes filetype:bitmap'],
  4: ['woman wearing evening gown', 'red evening dress', 'long dress fashion model', 'evening dress', 'gown'], 6: ['modern sofa', 'grey couch', 'sectional sofa living room', 'sofa', 'couch living room'],
};
for (const [id, files] of Object.entries(manifest)) {
  out[id] = [];
  const cands = [];
  for (const q of QUERIES[id] || []) { cands.push(...(await search(q, 20))); await sleep(300); }
  const seen = new Set(); const uniq = cands.filter((c) => !seen.has(c.title) && seen.add(c.title));
  for (const f of files) {
    const target = fs.statSync(dir + f).size; let hit = null;
    for (const c of uniq) {
      if (c.matched) continue;
      const s = await sizeOf(c.thumburl); await sleep(150);
      if (s === target) { hit = c; c.matched = true; break; }
    }
    const m = hit?.extmetadata || {};
    out[id].push({ file: f, title: hit?.title || null, author: strip(m.Artist?.value), license: m.LicenseShortName?.value || null, licenseUrl: m.LicenseUrl?.value || null, page: hit?.descriptionurl || null });
    console.log(id, f, hit ? `${m.LicenseShortName?.value} | ${strip(m.Artist?.value).slice(0, 40)}` : 'NO MATCH');
  }
}
fs.writeFileSync('src/data/credits.json', JSON.stringify(out, null, 1));
