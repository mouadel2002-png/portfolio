// Run with `npm run import-projects`. Converts every image in each project folder to WebP under
// public/images/works/<slug>/ and writes src/data/projects.json describing covers and gallery images.
// The first MP4 in a folder is re-encoded for the web into public/videos/<slug>.mp4
// (skipped when the encoded file is already newer than the source).
const sharp = require('sharp');
const fs = require('fs'), path = require('path');
const { execFileSync } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;
const ffprobe = require('@ffprobe-installer/ffprobe').path;
// Project folders live three levels up: WEBSITE/<PROJECT>/
const SRC = path.resolve(__dirname, '../../..');
const APP = path.resolve(__dirname, '..');
const OUT = `${APP}/public/images/works`;
const VIDEOS = `${APP}/public/videos`;
// Home page order.
const projects = [
  ['EDEN', 'Eden'], ['GLOBALSTAR', 'Globalstar'], ['microsoft', 'Microsoft'], ['WILSON', 'Wilson'],
  ['GUMMAGIC', 'Gummagic'], ['SAMSUNG', 'Samsung'], ['SAUVAGE', 'Sauvage'], ['OULMESS', 'Oulmess'],
  ['THE MATTER', 'The Matter'], ['ONCE CHERISHED NOW FORSAKEN', 'Once Cherished Now Forsaken'],
];
const fallbackCover = { GLOBALSTAR: 'ChatGPT Image Oct 18, 2026, 03_14_55 AM-2.png' };
const isImg = (f) => /\.(png|jpe?g)$/i.test(f);
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// H.264 + AAC, at most 1920x1080, with the index up front so playback starts immediately.
function encodeVideo(input, slug) {
  fs.mkdirSync(VIDEOS, { recursive: true });
  const out = `${VIDEOS}/${slug}.mp4`;
  if (!fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(input).mtimeMs) {
    execFileSync(ffmpeg, [
      '-y', '-v', 'error', '-i', input,
      '-vf', "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2",
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out,
    ]);
  }
  const [w, h] = execFileSync(ffprobe, [
    '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', out,
  ]).toString().trim().split(',').map(Number);
  return { src: `/videos/${slug}.mp4`, w, h, kb: Math.round(fs.statSync(out).size / 1024) };
}

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true });
  const manifest = [];
  for (const [dir, title] of projects) {
    const slug = slugify(title);
    fs.mkdirSync(`${OUT}/${slug}`, { recursive: true });
    const all = fs.readdirSync(path.join(SRC, dir)).filter((f) => fs.statSync(path.join(SRC, dir, f)).isFile());
    const files = all.filter(isImg).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
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
    const videoFile = all.find((f) => /\.mp4$/i.test(f));
    const video = videoFile ? encodeVideo(path.join(SRC, dir, videoFile), slug) : null;
    manifest.push({ slug, title, cover, images, video });
    const kb = images.reduce((s, i) => s + i.kb, 0) + cover.kb;
    console.log(`${title}: cover ${cover.w}x${cover.h} (${coverFile}), ${images.length} images, ${kb}KB` +
      (video ? `, video ${video.w}x${video.h} ${video.kb}KB (${videoFile})` : ''));
  }
  const pick = ({ src, w, h }) => ({ src, w, h });
  const strip = manifest.map(({ video, ...p }) => ({
    ...p,
    cover: pick(p.cover),
    images: p.images.map(pick),
    ...(video && { video: pick(video) }),
  }));
  fs.writeFileSync(`${APP}/src/data/projects.json`, JSON.stringify(strip, null, 2) + '\n');
})();
