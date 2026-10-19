// Run with `npm run import-projects`. Converts every image in each project folder to WebP under public/images/works/<slug>/
// and writes src/data/projects.json describing covers and gallery images.
const sharp = require('sharp');
const fs = require('fs'), path = require('path');
// Project folders live three levels up: WEBSITE/<PROJECT>/
const SRC = path.resolve(__dirname, '../../..');
const APP = path.resolve(__dirname, '..');
const OUT = `${APP}/public/images/works`;
// Home page order.
const projects = [
  ['EDEN', 'Eden'], ['GLOBALSTAR', 'Globalstar'], ['microsoft', 'Microsoft'], ['WILSON', 'Wilson'],
  ['GUMMAGIC', 'Gummagic'], ['SAMSUNG', 'Samsung'], ['SAUVAGE', 'Sauvage'], ['OULMESS', 'Oulmess'],
  ['THE MATTER', 'The Matter'], ['ONCE CHERISHED NOW FORSAKEN', 'Once Cherished Now Forsaken'],
];
const fallbackCover = { GLOBALSTAR: 'ChatGPT Image Oct 18, 2026, 03_14_55 AM-2.png' };
const isImg = (f) => /\.(png|jpe?g)$/i.test(f);
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true });
  const manifest = [];
  for (const [dir, title] of projects) {
    const slug = slugify(title);
    fs.mkdirSync(`${OUT}/${slug}`, { recursive: true });
    const files = fs.readdirSync(path.join(SRC, dir)).filter((f) => isImg(f) && fs.statSync(path.join(SRC, dir, f)).isFile())
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const coverFile = files.find((f) => /^cover\./i.test(f)) || fallbackCover[dir];
    const conv = async (file, name, width) => {
      const info = await sharp(path.join(SRC, dir, file), { limitInputPixels: false }).rotate()
        .resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUT}/${slug}/${name}`);
      return { src: `/images/works/${slug}/${name}`, w: info.width, h: info.height, kb: Math.round(info.size / 1024) };
    };
    const cover = await conv(coverFile, 'cover.webp', 1800);
    const images = [];
    let n = 1;
    for (const f of files) {
      if (f === coverFile) continue;
      try {
        images.push(await conv(f, `${String(n).padStart(2, '0')}.webp`, 1600));
        n++;
      } catch (e) { console.error('skip', dir, f, e.message); }
    }
    manifest.push({ slug, title, cover, images });
    console.log(`${title}: cover ${cover.w}x${cover.h} (${coverFile}), ${images.length} images, ${images.reduce((s, i) => s + i.kb, 0) + cover.kb}KB`);
  }
  const strip = manifest.map((p) => ({ ...p, cover: { src: p.cover.src, w: p.cover.w, h: p.cover.h }, images: p.images.map(({ src, w, h }) => ({ src, w, h })) }));
  fs.writeFileSync(`${APP}/src/data/projects.json`, JSON.stringify(strip, null, 2) + '\n');
})();
