import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Interface text in both languages. Content text lives in data/site.js as { en, fr } pairs.
const UI = {
  home: { en: 'Home', fr: 'Accueil' },
  about: { en: 'About', fr: 'À propos' },
  playground: { en: 'Playground', fr: 'Laboratoire' },
  gallery: { en: 'Gallery', fr: 'Galerie' },
  menu: { en: 'Menu', fr: 'Menu' },
  close: { en: 'Close', fr: 'Fermer' },
  darkMode: { en: 'Dark mode', fr: 'Mode sombre' },
  lightMode: { en: 'Light mode', fr: 'Mode clair' },
  language: { en: 'Language', fr: 'Langue' },
  selectedWorks: { en: 'Selected Works', fr: 'Projets choisis' },
  viewAll: { en: 'view all', fr: 'tout voir' },
  info: { en: 'Info', fr: 'Info' },
  playgroundArchive: { en: 'Playground/Archive', fr: 'Laboratoire/Archives' },
  archiveWork: { en: 'Archive Work', fr: 'Archives' },
  archive: { en: 'Archive', fr: 'Archives' },
  work: { en: 'Work', fr: 'Projets' },
  contact: { en: 'Contact', fr: 'Contact' },
  contactLine1: { en: 'Have a project in mind?', fr: 'Un projet en tête ?' },
  contactLine2: { en: 'Let’s create it.', fr: 'Créons-le ensemble.' },
  experience: { en: 'Experience', fr: 'Expérience' },
  allRights: { en: 'All rights reserved', fr: 'Tous droits réservés' },
  nextProject: { en: 'Next project', fr: 'Projet suivant' },
  client: { en: 'Client', fr: 'Client' },
  services: { en: 'Services', fr: 'Services' },
  film: { en: 'Film', fr: 'Film' },
  cover: { en: 'Cover', fr: 'Couverture' },
  soundOn: { en: 'Sound on', fr: 'Son activé' },
  soundOff: { en: 'Sound off', fr: 'Son coupé' },
  fullscreen: { en: 'Fullscreen', fr: 'Plein écran' },
  projectOverview: { en: 'Project Overview', fr: 'Présentation du projet' },
  finalOutput: { en: 'Final Output', fr: 'Résultat final' },
  projectDetails: { en: 'Project Details', fr: 'Détails du projet' },
  aboutProject: { en: 'About the project', fr: 'À propos du projet' },
  clickDrag: { en: 'Click and drag to compare', fr: 'Cliquez et faites glisser pour comparer' },
  fromSketch: { en: 'From sketch to final frame', fr: 'Du croquis à l’image finale' },
  sketch: { en: 'Sketch', fr: 'Croquis' },
  clay: { en: 'Clay', fr: 'Clay' },
  final: { en: 'Final', fr: 'Final' },
  prev: { en: 'Prev', fr: 'Préc.' },
  next: { en: 'Next', fr: 'Suiv.' },
  all: { en: 'All', fr: 'Tous' },
  notFound: { en: 'This page doesn’t exist.', fr: 'Cette page n’existe pas.' },
  backHome: { en: 'Back home', fr: 'Retour à l’accueil' },
  projects: { en: 'Projects', fr: 'Projets' },
};

const LangContext = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'fr') return saved;
  } catch {}
  return (navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {}
  }, [lang]);

  // tr: picks the current language from an { en, fr } value; plain strings pass through.
  const tr = useCallback(
    (value) => (value && typeof value === 'object' && 'en' in value ? value[lang] ?? value.en : value),
    [lang]
  );
  // t: interface text by key.
  const t = useCallback((key) => tr(UI[key]) ?? key, [tr]);

  const value = useMemo(() => ({ lang, setLang, t, tr }), [lang, t, tr]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
