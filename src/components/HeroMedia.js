import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];
const UNLOCK_EVENTS = ['pointerdown', 'keydown', 'touchstart'];

// Top-of-page media for a project: the project's film when it has one, otherwise its cover.
// Sized from the media's own ratio and capped to the viewport height, so nothing is cropped.
export default function HeroMedia({ work }) {
  const videoRef = useRef(null);
  const userChose = useRef(false);
  const [muted, setMuted] = useState(true);
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
      if (userChose.current || e.target.closest?.('.hero-media__sound')) return;
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
        <>
          <video
            ref={videoRef}
            src={work.video.src}
            poster={work.cover.src}
            loop
            playsInline
            preload="auto"
            aria-label={`${work.title} film`}
          />
          <button className="hero-media__sound" onClick={toggleSound} aria-pressed={!muted}>
            <span className={`hero-media__dot ${muted ? '' : 'is-on'}`} />
            {muted ? 'Sound off' : 'Sound on'}
          </button>
        </>
      ) : (
        <img src={work.cover.src} alt={work.title} />
      )}
    </motion.div>
  );
}
