import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

// Top-of-page media for a project: the project's film when it has one, otherwise its cover.
// Sized from the media's own ratio and capped to the viewport height, so nothing is cropped.
export default function HeroMedia({ work }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const media = work.video || work.cover;
  const ratio = media.w / media.h;

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
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
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
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
