import fs from 'node:fs';
const Q = { 6: ['sofa', 'couch living room', 'canapé'], 11: ['fruit basket', 'mangoes', 'pineapple fruit', 'tropical fruits market'], 18: ['wax print fabric', 'African print dress', 'Ankara fashion'], 20: ['rice bag', 'sack of rice', 'rice grains'], 4: ['evening dress', 'gown'], 26: ['television set', 'LED TV', 'flat screen television'] };
const UA = { 'User-Agent': 'LifeMarketDemo/1.0 (eudyproject@gmail.com)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const manifest = JSON.parse(fs.readFileSync('src/data/photos.json', 'utf8'));
for (const [id, qs] of Object.entries(Q)) {
  let n = manifest[id] > 1 ? manifest[id] : 0; if (manifest[id] === 1) n = 0;
  n = 0;
  for (const q of qs) {
    if (n >= 4) break;
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=900&format=json`;
    let pages = [];
    try { const j = await (await fetch(url, { headers: UA })).json(); pages = Object.values(j.query?.pages || {}).sort((a, b) => a.index - b.index); } catch (e) { console.log(id, q, 'fail'); await sleep(2000); continue; }
    const ok = pages.map((p) => p.imageinfo?.[0]).filter((i) => i && i.mime === 'image/jpeg' && i.width >= 700 && i.height >= 450 && i.width / i.height > 1.1 && i.width / i.height < 2.2);
    for (const info of ok) {
      if (n >= 4) break;
      try { const r = await fetch(info.thumburl, { headers: UA }); if (!r.ok) { await sleep(1500); continue; } fs.writeFileSync(`public/assets/products/${id}-${n}.jpg`, Buffer.from(await r.arrayBuffer())); n++; await sleep(500); } catch {}
    }
    await sleep(600);
  }
  manifest[id] = n; console.log(id, '->', n);
}
fs.writeFileSync('src/data/photos.json', JSON.stringify(manifest));
