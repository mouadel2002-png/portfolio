import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../data/site';
import { useTheme } from '../theme';

const ease = [0.22, 1, 0.36, 1];

export default function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Hide the bar while scrolling down, show it again when scrolling up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`header ${hidden && !open ? 'header--hidden' : ''}`}>
        <nav className="header__nav" aria-label="Main">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end className="header__link">
              <span className="header__link-dot" />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button className="header__theme" onClick={toggle} aria-label="Toggle color theme">
          {theme === 'dark' ? 'DARK MODE' : 'LIGHT MODE'}
          <span className="header__dot" />
        </button>
        <button
          className="header__menu"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease }}
          >
            <ul className="menu__list">
              {navLinks.map((link, i) => (
                <li key={link.to} className="mask-line">
                  <motion.span
                    className="mask-line__inner"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.08 }}
                  >
                    <NavLink to={link.to} end className="menu__link">
                      <span className="menu__index">0{i + 1}</span>
                      {link.label}
                    </NavLink>
                  </motion.span>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
