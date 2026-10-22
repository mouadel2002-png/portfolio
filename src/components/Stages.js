import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../i18n';

const ease = [0.22, 1, 0.36, 1];
const GAP = 4; // minimum distance (%) kept between the two dividers

// One shot shown at three stages in a single frame: Sketch | Clay | Final, split by two
// dividers. Press and drag (mouse or touch) moves the nearest divider; with the keyboard,
// arrow keys move the left one and Shift + arrows the right one.
export default function Stages({ sketch, clay, final, label, className, style }) {
  const frameRef = useRef(null);
  const [cuts, setCuts] = useState([33.3, 66.6]);
  const cutsRef = useRef(cuts);
  cutsRef.current = cuts;
  // Index of the divider being dragged; a ref so every pointer event sees the latest value.
  const dragRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const { t } = useLang();

  const pct = (clientX) => {
    const r = frameRef.current.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
  };

  const place = (which, value) =>
    setCuts(([a, b]) =>
      which === 0 ? [Math.min(value, b - GAP), b] : [a, Math.max(value, a + GAP)]
    );

  const onPointerDown = (e) => {
    const x = pct(e.clientX);
    const [a, b] = cutsRef.current;
    const which = Math.abs(x - a) <= Math.abs(x - b) ? 0 : 1;
    dragRef.current = which;
    setDragging(true);
    try {
      frameRef.current.setPointerCapture(e.pointerId);
    } catch {}
    place(which, x);
  };

  const onPointerMove = (e) => {
    if (dragRef.current !== null) place(dragRef.current, pct(e.clientX));
  };

  const endDrag = () => {
    dragRef.current = null;
    setDragging(false);
  };

  const onKeyDown = (e) => {
    const which = e.shiftKey ? 1 : 0;
    if (e.key === 'ArrowLeft') place(which, cuts[which] - 4);
    if (e.key === 'ArrowRight') place(which, cuts[which] + 4);
  };

  const [a, b] = cuts;
  return (
    <motion.figure
      className={`compare stages ${className || ''}`}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease }}
    >
      <div
        ref={frameRef}
        className={`compare__frame ${dragging ? 'is-active' : ''}`}
        style={{ aspectRatio: `${final.w} / ${final.h}` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="group"
        tabIndex={0}
        aria-label={`${label}: sketch, clay and final. Drag the dividers to compare.`}
        onKeyDown={onKeyDown}
      >
        <img className="compare__img" src={final.src} alt={`${label} final render`} loading="lazy" draggable="false" />
        <img
          className="compare__img"
          src={clay.src}
          alt={`${label} clay render`}
          loading="lazy"
          draggable="false"
          style={{ clipPath: `inset(0 ${100 - b}% 0 0)` }}
        />
        <img
          className="compare__img stages__sketch"
          src={sketch.src}
          alt={`${label} storyboard sketch`}
          loading="lazy"
          draggable="false"
          style={{ clipPath: `inset(0 ${100 - a}% 0 0)` }}
        />
        <span className="compare__tag" style={{ left: `${a / 2}%`, transform: 'translateX(-50%)' }}>
          {t('sketch')}
        </span>
        <span className="compare__tag" style={{ left: `${(a + b) / 2}%`, transform: 'translateX(-50%)' }}>
          {t('clay')}
        </span>
        <span className="compare__tag" style={{ left: `${(b + 100) / 2}%`, transform: 'translateX(-50%)' }}>
          {t('final')}
        </span>
        {[a, b].map((x, i) => (
          <span key={i} className="compare__divider" style={{ left: `${x}%` }}>
            <span className="compare__knob" aria-hidden="true">
              ‹ ›
            </span>
          </span>
        ))}
      </div>
      <figcaption>
        <span className="muted">{label}</span> {t('sketch')} / {t('clay')} / {t('final')}
      </figcaption>
    </motion.figure>
  );
}
