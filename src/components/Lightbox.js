import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

// Full-screen image viewer. `index` is the open image (null = closed); arrows and Esc work too.
export default function Lightbox({ images, index, onChange, onClose, label }) {
  const open = index !== null && images[index];

  useEffect(() => {
    if (!open) return undefined;
    const step = (d) => onChange((index + d + images.length) % images.length);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, index, images.length, onChange, onClose]);

  const step = (d) => onChange((index + d + images.length) % images.length);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} — image ${index + 1} of ${images.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          <motion.img
            key={images[index].src}
            src={images[index].src}
            alt={`${label} ${index + 1}`}
            className="lightbox__img"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
            <span>
              {label}{' '}
              <span className="muted">
                ({index + 1}/{images.length})
              </span>
            </span>
            <span className="lightbox__actions">
              {images.length > 1 && <button onClick={() => step(-1)}>Prev</button>}
              {images.length > 1 && <button onClick={() => step(1)}>Next</button>}
              <button onClick={onClose}>Close</button>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
