import fs from 'node:fs';
const Q = { 13: ['child bicycle', 'kids bike', 'children bicycle park'] };
const UA = { 'User-Agent': 'LifeMarketDemo/1.0 (eudyproject@gmail.com)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (const [id, qs] of Object.entries(Q)) {
  let n = 0;
  for (const q of qs) {
    if (n >= 8) break;
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=900&format=json`;
    let pages = [];
    try { const j = await (await fetch(url, { headers: UA })).json(); pages = Object.values(j.query?.pages || {}).sort((a, b) => a.index - b.index); } catch { await sleep(2000); continue; }
    const ok = pages.map((p) => p.imageinfo?.[0]).filter((i) => i && i.mime === 'image/jpeg' && i.width >= 700 && i.height >= 450 && i.width / i.height > 1.1 && i.width / i.height < 2.2);
    for (const info of ok.slice(0, 4)) {
      try { const r = await fetch(info.thumburl, { headers: UA }); if (!r.ok) { await sleep(1500); continue; } fs.writeFileSync(`public/assets/products/${id}-x${n}.jpg`, Buffer.from(await r.arrayBuffer())); n++; await sleep(500); } catch {}
    }
    await sleep(600);
  }
  console.log(id, n);
}
