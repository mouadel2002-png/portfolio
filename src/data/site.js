// All site content lives here — edit this file to make the portfolio yours.
import projects from './projects.json';
import portrait from './portrait.json';

const img = (id) => `https://framerusercontent.com/images/${id}`;

export const profile = {
  name: 'Mouad Tahri',
  role: 'Digital Designer',
  location: 'Houston, TX',
  year: new Date().getFullYear(),
  services: ['Branding', 'Creative Direction', 'UI/UX Design'],
  intro:
    "I bring a dynamic and impactful approach to brand design, focusing on creating identities that vividly communicate a business's essence to its intended audience.",
  aboutHeadline: ['Unforgettable', 'Digital Experiences'],
  // One string per paragraph.
  aboutText: [
    'I’ve always seen art as a way of looking at the world differently. A space for questioning, experimenting, and giving form to ideas that don’t always have words.',
    'My practice lives somewhere between design and art, combining visual communication, 3D, and motion to create work that goes beyond appearance. I’m interested in the balance between simplicity and expression, where even the smallest detail can change the way something is perceived.',
  ],
  portrait,
};

export const experiences = [
  { year: '2026', title: '3D Generalist', company: 'IMAGE FACTORY Maroc' },
  { year: '2025', title: '3D Motion Designer', company: 'Freelance' },
  { year: '2023 – 2024', title: '3D Designer', company: 'IMAGE FACTORY Maroc' },
  { year: '2022', title: 'Graphic Designer', company: 'FAAR-PRONERGY' },
];

export const socials = [
  { label: 'Linkedin', href: 'https://www.linkedin.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Behance', href: 'https://www.behance.net/' },
];

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Playground', to: '/playground' },
  { label: 'Gallery', to: '/gallery' },
];

// Project images come from src/data/projects.json, generated from each project folder
// (cover = the folder's COVER image, images = every other picture in the folder).
// Fill in the text fields below; empty ones are simply hidden on the site.
const projectInfo = {
  eden: { category: 'Product Rendering' },
  globalstar: { category: '3D Animation' },
  microsoft: { category: 'Motion Design' },
  wilson: { category: 'Product Rendering' },
  gummagic: { category: 'Branding & Packaging' },
  samsung: { category: 'Product Rendering' },
  sauvage: { category: 'Motion Design' },
  oulmess: { category: 'Product Animation' },
  'the-matter': { category: 'Short Film' },
  'once-cherished-now-forsaken': { category: 'Short Film' },
};

export const works = projects.map((p) => ({
  year: '',
  client: '',
  services: '',
  summary: '',
  about: '',
  ...projectInfo[p.slug],
  ...p,
}));

// `side` places the image in the left or right half of the page on the Playground page.
export const playground = [
  { title: 'Personal Photography', image: img('6JAFxzqSYxPBhrztwhAWAXuO4s.jpg'), side: 'right' },
  { title: 'Puke Logo', image: img('it0kUZYjd8ViYJAHLowAx4csOEY.png'), side: 'left' },
  { title: 'Personal Photography', image: img('TAP9dayZQH6bpFyDmbSsgQbPVbc.jpg'), side: 'left' },
  { title: 'Renders 02', image: img('WpWKgwy66uh6uY0OuKSSncrq0.jpg'), side: 'right' },
  { title: 'Type Exploration', image: img('OEuU07NI7FNxRfaD6RfSwe6vbc.jpg'), side: 'left' },
  { title: 'Renders 01', image: img('3PeEhcaMDNujnUJz86bWxo80w.jpg'), side: 'right' },
  { title: 'Studio Cool 3D Rendering', image: img('lN6ni95OOxhK0IzABcCdd0s4.jpg'), side: 'left' },
  { title: 'Personal Photography', image: img('PrnTkbZ3iHIVDxBqF6xIGv8FLKI.jpg'), side: 'right' },
  { title: 'Oscar Olsson / Disco Volante', image: img('3PeEhcaMDNujnUJz86bWxo80w.jpg'), side: 'left' },
];

// Gallery page: renders from each project, stored in public/images/gallery.
const galleryCounts = { eden: 8, globalstar: 7, microsoft: 7, wilson: 7 };
const galleryTitles = { eden: 'Eden', globalstar: 'Globalstar', microsoft: 'Microsoft', wilson: 'Wilson' };

export const gallery = Object.entries(galleryCounts).flatMap(([project, count]) =>
  Array.from({ length: count }, (_, i) => ({
    project: galleryTitles[project],
    image: `/images/gallery/${project}-${String(i + 1).padStart(2, '0')}.webp`,
  }))
);
