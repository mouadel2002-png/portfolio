import { useMemo, useRef, useState } from 'react';
import Page from '../components/Page';
import FitText from '../components/FitText';
import Lightbox from '../components/Lightbox';
import { MaskLine, RevealImage } from '../components/Reveal';
import { archive, profile } from '../data/site';
import { DESKTOP, useMediaQuery } from '../hooks';
import { useLang } from '../i18n';
import './pages.css';

// Small seeded random generator, so the "random" scatter is the same on every visit.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Shuffle the archive and give every piece its own size and offset: a loose library wall.
function scatter(items) {
  const rand = seeded(20261023);
  const list = items.map((it, i) => ({ ...it, i })).sort(() => rand() - 0.5);
  return list.map((it) => {
    const wide = it.w / it.h > 1.2;
    const width = wide ? 26 + rand() * 14 : 15 + rand() * 11; // % of the page width
    return {
      ...it,
      style: {
        width: `${width.toFixed(1)}%`,
        marginTop: `${Math.round(rand() * 140)}px`,
        marginLeft: `${(rand() * 4).toFixed(1)}%`,
        marginRight: `${(rand() * 4).toFixed(1)}%`,
      },
    };
  });
}

function VideoTile({ item, onOpen, label }) {
  const ref = useRef(null);
  const play = () => ref.current?.play().catch(() => {});
  const stop = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };
  return (
    <button
      className="archive__tile archive__tile--video"
      style={{ aspectRatio: `${item.w} / ${item.h}` }}
      onClick={onOpen}
      onPointerEnter={play}
      onPointerLeave={stop}
      aria-label={label}
    >
      <img src={item.poster} alt="" loading="lazy" />
      {/* Silent preview while hovering; sound only when opened full screen. */}
      <video ref={ref} src={item.src} muted loop playsInline preload="none" />
      <span className="archive__play" aria-hidden="true">
        ▶
      </span>
    </button>
  );
}

export default function Playground() {
  const isDesktop = useMediaQuery(DESKTOP);
  const { t } = useLang();
  const [open, setOpen] = useState(null);
  const pieces = useMemo(() => scatter(archive), []);

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
          {pieces.map((it, n) => (
            <figure key={it.src} className="archive__piece" style={it.style}>
              {it.type === 'video' ? (
                <VideoTile item={it} onOpen={() => setOpen(n)} label={`${t('archive')} ${n + 1}`} />
              ) : (
                <button className="archive__tile" onClick={() => setOpen(n)} aria-label={`${t('archive')} ${n + 1}`}>
                  <RevealImage src={it.src} alt="" ratio={`${it.w} / ${it.h}`} />
                </button>
              )}
              <figcaption className="muted">({String(n + 1).padStart(2, '0')})</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <Lightbox images={pieces} index={open} onChange={setOpen} onClose={() => setOpen(null)} label={t('archive')} />
    </Page>
  );
}
