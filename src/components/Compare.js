import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];
const clamp = (n) => Math.min(100, Math.max(0, n));

// One clay/final "plate": the final render fills the frame and the clay render sits on top,
// clipped to the left of a divider. With a mouse the divider follows the pointer while it is
// over the plate; on touch it follows a drag; with the keyboard the arrow keys move it.
export default function Compare({ clay, final, label, className, style }) {
  const frameRef = useRef(null);
  const [pos, setPos] = useState(50);
  const [active, setActive] = useState(false);

  const moveTo = (clientX) => {
    const r = frameRef.current.getBoundingClientRect();
    setPos(clamp(((clientX - r.left) / r.width) * 100));
  };

  const onPointerMove = (e) => {
    if (e.pointerType === 'mouse' || active) moveTo(e.clientX);
  };

  const onPointerDown = (e) => {
    setActive(true);
    frameRef.current.setPointerCapture?.(e.pointerId);
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
        onPointerUp={() => setActive(false)}
        onPointerCancel={() => setActive(false)}
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
        <span className="compare__tag compare__tag--left">Clay</span>
        <span className="compare__tag compare__tag--right">Final</span>
        <span className="compare__divider" style={{ left: `${pos}%` }}>
          <span className="compare__knob" aria-hidden="true">
            ‹ ›
          </span>
        </span>
      </div>
      <figcaption>
        <span className="muted">{label}</span> Clay / Final
      </figcaption>
    </motion.figure>
  );
}
