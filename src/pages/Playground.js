import { useEffect, useMemo, useRef, useState } from 'react';
import Page from '../components/Page';
import FitText from '../components/FitText';
import Lightbox from '../components/Lightbox';
import { MaskLine, RevealImage } from '../components/Reveal';
import { archive, profile } from '../data/site';
import { DESKTOP, useMediaQuery } from '../hooks';
import { useLang } from '../i18n';
import './pages.css';

// Small seeded random generator, so the arrangement is the same on every visit.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// #rrggbb -> hue (0-360), saturation and lightness (0-1).
function hsl(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (!d) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h = (h * 60 + 360) % 360;
  return { h, s, l };
}

// A colour journey: darks first, then warm reds and browns, greens, blues, greys, and light pieces last.
function colourRank(hex) {
  const { h, s, l } = hsl(hex || '#808080');
  if (l < 0.12) return l;
  if (l > 0.72) return 5 + l;
  if (s < 0.12) return 4 + l;
  return 1 + ((h + 30) % 360) / 120;
}

// Shape classes share one width range, so pieces of the same shape read at the same size.
const WIDTH = { wide: [30, 36], square: [19, 24], tall: [14, 18] };
const shape = (it) => (it.w / it.h > 1.3 ? 'wide' : it.w / it.h < 0.85 ? 'tall' : 'square');
const ALIGN = ['flex-start', 'center', 'flex-end'];
const JUSTIFY = ['space-between', 'space-around', 'space-evenly'];

// Order by colour (lightly shuffled within neighbours), then lay out row by row.
function arrange(items) {
  const rand = seeded(20261023);
  const list = items
    .map((it) => ({ ...it, rank: colourRank(it.color) + rand() * 0.35 }))
    .sort((a, b) => a.rank - b.rank);
  const rows = [];
  let row = { pieces: [], used: 0 };
  list.forEach((it) => {
    const [lo, hi] = WIDTH[shape(it)];
    const width = lo + rand() * (hi - lo);
    if (row.pieces.length && row.used + width > 92) {
      rows.push(row);
      row = { pieces: [], used: 0 };
    }
    row.pieces.push({ ...it, style: { width: `${width.toFixed(1)}%`, marginTop: `${Math.round(rand() * 70)}px` } });
    row.used += width + 3;
  });
  if (row.pieces.length) rows.push(row);
  let n = 0;
  return rows.map((r, i) => ({
    style: { alignItems: ALIGN[i % 3], justifyContent: JUSTIFY[Math.floor(rand() * 3)] },
    pieces: r.pieces.map((p) => ({ ...p, n: n++ })),
  }));
}

// Plays silently on loop while on screen; sound only from the full-screen view.
function VideoTile({ item, onOpen, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      rootMargin: '200px 0px',
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <button
      className="archive__tile archive__tile--video"
      style={{ aspectRatio: `${item.w} / ${item.h}` }}
      onClick={onOpen}
      aria-label={label}
    >
      <video ref={ref} src={item.src} poster={item.poster} muted loop playsInline autoPlay preload="metadata" />
    </button>
  );
}

export default function Playground() {
  const isDesktop = useMediaQuery(DESKTOP);
  const { t } = useLang();
  const [open, setOpen] = useState(null);
  const rows = useMemo(() => arrange(archive), []);
  const pieces = useMemo(() => rows.flatMap((r) => r.pieces), [rows]);

  return (
    <Page title={`Playground — ${profile.name}`}>
      <section className="playground container">
        <h1 className="display playground__title" aria-label={t('archiveWork')}>
          {isDesktop ? (
            <MaskLine>
              <FitText>{t('archiveWork')}</FitText>
            </MaskLine>
          ) : (
            <>
              <MaskLine>{t('archive')}</MaskLine>
              {t('work') !== t('archive') && <MaskLine delay={0.12}>{t('work')}</MaskLine>}
            </>
          )}
        </h1>

        <div className="archive">
          {rows.map((r, i) => (
            <div key={i} className="archive__row" style={r.style}>
              {r.pieces.map((it) => (
                <figure key={it.src} className={`archive__piece archive__piece--${it.n % 2 ? 'even' : 'odd'}`} style={it.style}>
                  {it.type === 'video' ? (
                    <VideoTile item={it} onOpen={() => setOpen(it.n)} label={`${t('archive')} ${it.n + 1}`} />
                  ) : (
                    <button className="archive__tile" onClick={() => setOpen(it.n)} aria-label={`${t('archive')} ${it.n + 1}`}>
                      <RevealImage src={it.src} alt="" ratio={`${it.w} / ${it.h}`} />
                    </button>
                  )}
                  <figcaption className="muted">({String(it.n + 1).padStart(2, '0')})</figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </section>
      <Lightbox images={pieces} index={open} onChange={setOpen} onClose={() => setOpen(null)} label={t('archive')} />
    </Page>
  );
}
