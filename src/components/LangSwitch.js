import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
];

// Small globe button in the header that opens an English / Français choice.
export default function LangSwitch() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lang" ref={ref}>
      <button
        className="lang__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t('language')}: ${LANGS.find((l) => l.code === lang).label}`}
      >
        <GlobeIcon />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="lang__menu"
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {LANGS.map((l) => (
              <li key={l.code} role="none">
                <button
                  role="menuitemradio"
                  aria-checked={lang === l.code}
                  className={`lang__option ${lang === l.code ? 'is-active' : ''}`}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                >
                  <span className="lang__code">{l.code.toUpperCase()}</span> {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5c2.6 2.6 4 6 4 9.5s-1.4 6.9-4 9.5M12 2.5c-2.6 2.6-4 6-4 9.5s1.4 6.9 4 9.5" />
    </svg>
  );
}
