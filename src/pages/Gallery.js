import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Page from '../components/Page';
import FitText from '../components/FitText';
import { MaskLine, Reveal } from '../components/Reveal';
import { gallery, profile } from '../data/site';
import { DESKTOP, useMediaQuery } from '../hooks';
import { useLang } from '../i18n';
import './pages.css';

const ease = [0.22, 1, 0.36, 1];
const projects = ['All', ...new Set(gallery.map((g) => g.project))];

export default function Gallery() {
  const isDesktop = useMediaQuery(DESKTOP);
  const { t } = useLang();
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);

  const items = filter === 'All' ? gallery : gallery.filter((g) => g.project === filter);

  const step = useCallback(
    (dir) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, step]);

  return (
    <Page title={`Gallery — ${profile.name}`}>
      <section className="gallery container">
        <h1 className="display">
          {isDesktop ? (
            <MaskLine>
              <FitText>{t('gallery')}</FitText>
            </MaskLine>
          ) : (
            <MaskLine>{t('gallery')}</MaskLine>
          )}
        </h1>

        <Reveal className="gallery__bar" delay={0.3}>
          <div className="gallery__filters" role="tablist" aria-label="Filter by project">
            {projects.map((p) => (
              <button
                key={p}
                role="tab"
                aria-selected={filter === p}
                className={`gallery__filter ${filter === p ? 'is-active' : ''}`}
                onClick={() => setFilter(p)}
              >
                {p === 'All' ? t('all') : p}
              </button>
            ))}
          </div>
          <span className="muted">[{items.length}]</span>
        </Reveal>

        <motion.div layout className="gallery__grid">
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.button
                layout
                key={g.image}
                className="gallery__item"
                onClick={() => setOpen(i)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7, ease }}
                aria-label={`Open ${g.project} image`}
              >
                <span className="img-frame">
                  <img src={g.image} alt={`${g.project} render`} width={g.w} height={g.h} loading="lazy" />
                </span>
                <span className="gallery__caption muted">{g.project}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {open !== null && items[open] && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${items[open].project} image`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(null)}
          >
            <motion.img
              key={items[open].image}
              src={items[open].image}
              alt={`${items[open].project} render`}
              className="lightbox__img"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
              <span>
                {items[open].project} <span className="muted">({open + 1}/{items.length})</span>
              </span>
              <span className="lightbox__actions">
                <button onClick={() => step(-1)}>{t('prev')}</button>
                <button onClick={() => step(1)}>{t('next')}</button>
                <button onClick={() => setOpen(null)}>{t('close')}</button>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Page>
  );
}
