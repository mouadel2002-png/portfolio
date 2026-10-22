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
// Used only when a folder has no COVER image.
const fallbackCover = {};
const isImg = (f) => /\.(png|jpe?g)$/i.test(f);
// Every image is also listed under its file name (lower case, no extension, e.g. "bench 01"),
// so a project page can be laid out by name in src/data/site.js (see projectInfo.*.layout).
const fileKey = (f) => f.replace(/\.[^.]+$/, '').trim().replace(/\s+/g, ' ').toLowerCase();

// About page portrait: WEBSITE/PHOTO.png with any solid dark rows at the top/bottom edge trimmed.
async function encodePortrait() {
  const input = path.join(SRC, 'PHOTO.png');
  if (!fs.existsSync(input)) return;
  const { data, info } = await sharp(input).greyscale().raw().toBuffer({ resolveWithObject: true });
  const rowMean = (y) => {
    let t = 0;
    for (let x = 0; x < info.width; x++) t += data[y * info.width + x];
    return t / info.width;
  };
  let top = 0;
  let bottom = info.height - 1;
  while (top < bottom && rowMean(top) < 12) top++;
  while (bottom > top && rowMean(bottom) < 12) bottom--;
  fs.mkdirSync(`${APP}/public/images/about`, { recursive: true });
  const out = await sharp(input).extract({ left: 0, top, width: info.width, height: bottom - top + 1 })
    .resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${APP}/public/images/about/photo.webp`);
  console.log(`Portrait: trimmed ${top}px top / ${info.height - 1 - bottom}px bottom -> ${out.width}x${out.height}`);
  return { src: '/images/about/photo.webp', w: out.width, h: out.height };
}

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

// Landing-page background: WEBSITE/SHOWREEL.mp4 -> silent, looping web video plus a poster frame.
function encodeShowreel() {
  const input = path.join(SRC, 'SHOWREEL.mp4');
  const out = `${VIDEOS}/showreel.mp4`;
  if (!fs.existsSync(input)) return;
  fs.mkdirSync(VIDEOS, { recursive: true });
  if (!fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(input).mtimeMs) {
    execFileSync(ffmpeg, ['-y', '-v', 'error', '-i', input, '-an', '-vf', 'scale=1920:-2', '-c:v', 'libx264',
      '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
    execFileSync(ffmpeg, ['-y', '-v', 'error', '-i', out, '-frames:v', '1', '-q:v', '3', '-vf', 'scale=1600:-2',
      `${APP}/public/images/showreel-poster.jpg`]);
  }
  console.log(`Showreel: ${Math.round(fs.statSync(out).size / 1024)}KB`);
}

(async () => {
  encodeShowreel();
  const portrait = await encodePortrait();
  if (portrait) fs.writeFileSync(`${APP}/src/data/portrait.json`, JSON.stringify(portrait, null, 2) + '\n');
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
        images.push({ ...(await conv(f, `${String(n).padStart(2, '0')}.webp`, 1600)), file: f });
        n++;
      } catch (e) { console.error('skip', dir, f, e.message); }
    }
    const videoFile = all.find((f) => /\.mp4$/i.test(f));
    const video = videoFile ? encodeVideo(path.join(SRC, dir, videoFile), slug) : null;
    const fileMap = { [fileKey(coverFile)]: cover };
    images.forEach((img) => { fileMap[fileKey(img.file)] = img; });
    manifest.push({ slug, title, cover, images, video, files: fileMap });
    const kb = images.reduce((s, i) => s + i.kb, 0) + cover.kb;
    console.log(`${title}: cover ${cover.w}x${cover.h} (${coverFile}), ${images.length} images, ${kb}KB` +
      (video ? `, video ${video.w}x${video.h} ${video.kb}KB (${videoFile})` : ''));
  }
  const pick = ({ src, w, h }) => ({ src, w, h });
  const strip = manifest.map(({ video, files, ...p }) => ({
    ...p,
    cover: pick(p.cover),
    images: p.images.map(pick),
    ...(video && { video: pick(video) }),
    files: Object.fromEntries(Object.entries(files).map(([k, v]) => [k, pick(v)])),
  }));
  fs.writeFileSync(`${APP}/src/data/projects.json`, JSON.stringify(strip, null, 2) + '\n');
})();
