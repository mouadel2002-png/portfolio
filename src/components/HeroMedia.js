import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from './Lightbox';
import { useLang } from '../i18n';

const ease = [0.22, 1, 0.36, 1];
const UNLOCK_EVENTS = ['pointerdown', 'keydown', 'touchstart'];

// Top-of-page media for a project: the project's film when it has one, otherwise its cover.
// Sized from the media's own ratio and capped to the viewport height, so nothing is cropped.
export default function HeroMedia({ work }) {
  const videoRef = useRef(null);
  const userChose = useRef(false);
  const [muted, setMuted] = useState(true);
  const [viewer, setViewer] = useState(null);
  const { t } = useLang();
  const media = work.video || work.cover;
  const ratio = media.w / media.h;

  // Start with sound. Browsers only allow that once the visitor has interacted with the
  // site (e.g. clicked through from the home page); otherwise play muted and switch the
  // sound on at the first click, tap or key press anywhere on the page.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    userChose.current = false;

    const unlock = (e) => {
      if (userChose.current || e.target.closest?.('.hero-media__controls')) return;
      v.muted = false;
      setMuted(false);
      v.play().catch(() => {});
      UNLOCK_EVENTS.forEach((t) => window.removeEventListener(t, unlock));
    };

    v.muted = false;
    v.play()
      .then(() => setMuted(false))
      .catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
        UNLOCK_EVENTS.forEach((t) => window.addEventListener(t, unlock, { passive: true }));
      });

    return () => UNLOCK_EVENTS.forEach((t) => window.removeEventListener(t, unlock));
  }, [work.slug]);

  // Video: the browser's own fullscreen player (with its controls while fullscreen).
  // Image: the site's full-screen viewer.
  const openFullscreen = () => {
    const v = videoRef.current;
    if (!v) {
      setViewer(0);
      return;
    }
    const onChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        v.controls = false;
        document.removeEventListener('fullscreenchange', onChange);
        document.removeEventListener('webkitfullscreenchange', onChange);
      }
    };
    v.controls = true;
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    if (v.requestFullscreen) {
      v.requestFullscreen().catch(() => {
        v.controls = false;
      });
    } else if (v.webkitEnterFullscreen) {
      v.webkitEnterFullscreen(); // iPhone Safari
    }
  };

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    userChose.current = true;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play();
  };

  return (
    <motion.div
      className="hero-media"
      style={{ aspectRatio: `${media.w} / ${media.h}`, width: `min(100%, calc(82vh * ${ratio}))` }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease, delay: 0.2 }}
    >
      {work.video ? (
        <video
          ref={videoRef}
          src={work.video.src}
          poster={work.cover.src}
          loop
          playsInline
          preload="auto"
          aria-label={`${work.title} film`}
        />
      ) : (
        <img src={work.cover.src} alt={work.title} />
      )}

      <div className="hero-media__controls">
        {work.video && (
          <button className="hero-media__btn" onClick={toggleSound} aria-pressed={!muted}>
            <span className={`hero-media__dot ${muted ? '' : 'is-on'}`} />
            {muted ? t('soundOff') : t('soundOn')}
          </button>
        )}
        <button
          className="hero-media__btn"
          onClick={openFullscreen}
          aria-label={work.video ? 'Play film full screen' : 'View cover full screen'}
        >
          <FullscreenIcon /> {t('fullscreen')}
        </button>
      </div>

      {!work.video && (
        <Lightbox images={[work.cover]} index={viewer} onChange={setViewer} onClose={() => setViewer(null)} label={work.title} />
      )}
    </motion.div>
  );
}

function FullscreenIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M1 4.5V1h3.5M7.5 1H11v3.5M11 7.5V11H7.5M4.5 11H1V7.5" />
    </svg>
  );
}
