import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';

const ease = [0.22, 1, 0.36, 1];
const clamp = (n) => Math.min(100, Math.max(0, n));

// One clay/final "plate": the final render fills the frame and the clay render sits on top,
// clipped to the left of a divider. Press and drag (mouse or touch) to move the divider;
// with the keyboard the arrow keys move it.
export default function Compare({ clay, final, label, className, style }) {
  const frameRef = useRef(null);
  const [pos, setPos] = useState(50);
  const [active, setActive] = useState(false);
  // Mirrors `active` so every pointer event sees the latest value.
  const activeRef = useRef(false);
  const { t } = useLang();

  const moveTo = (clientX) => {
    const r = frameRef.current.getBoundingClientRect();
    setPos(clamp(((clientX - r.left) / r.width) * 100));
  };

  const setDragging = (on) => {
    activeRef.current = on;
    setActive(on);
  };

  const onPointerMove = (e) => {
    if (activeRef.current) moveTo(e.clientX);
  };

  const onPointerDown = (e) => {
    setDragging(true);
    try {
      frameRef.current.setPointerCapture(e.pointerId);
    } catch {}
    moveTo(e.clientX);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPos((p) => clamp(p - 5));
    if (e.key === 'ArrowRight') setPos((p) => clamp(p + 5));
  };

  return (
    <motion.figure
      className={`compare ${className || ''}`}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease }}
    >
      <div
        ref={frameRef}
        className={`compare__frame ${active ? 'is-active' : ''}`}
        style={{ aspectRatio: `${final.w} / ${final.h}` }}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        role="slider"
        tabIndex={0}
        aria-label={`${label}: drag to compare clay and final render`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
      >
        <img className="compare__img" src={final.src} alt={`${label} final render`} loading="lazy" draggable="false" />
        <img
          className="compare__img compare__img--clay"
          src={clay.src}
          alt={`${label} clay render`}
          loading="lazy"
          draggable="false"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        <span className="compare__tag compare__tag--left">{t('clay')}</span>
        <span className="compare__tag compare__tag--right">{t('final')}</span>
        <span className="compare__divider" style={{ left: `${pos}%` }}>
          <span className="compare__knob" aria-hidden="true">
            ‹ ›
          </span>
        </span>
      </div>
      <figcaption>
        <span className="muted">{label}</span> {t('clay')} / {t('final')}
      </figcaption>
    </motion.figure>
  );
}
