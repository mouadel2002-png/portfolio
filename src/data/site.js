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
//
// `layout` describes a project page section by section, using image file names from the
// project folder (lower case, no extension, e.g. 'bench 01'; 'cover' is the COVER image):
//   { type: 'frames', title, text: [label, storyKey], tone: 'light', groups: [
//       { label, note, files: [...], arrange: 'pairs' | 'row' | 'stagger', perRow } ] }
//     pairs   = equal-size staggered two-column wall
//     row     = side by side on one line, same size and height (e.g. one shot in three colours)
//     stagger = side by side, each hung at its own height (perRow pieces per line)
//   { type: 'compare', title, text: [label, storyKey], pairs: [[final, clay], ...] }
//   { type: 'details', screenshots: [...] }   -> uses `details` rows below
// Projects without a layout show all their images as one exhibition wall.
const projectInfo = {
  eden: {
    category: 'Product Rendering',
    // DRAFT details, inferred from the files (Blender screenshots): please confirm.
    details: [
      ['Project', 'Eden'],
      ['Discipline', '3D Product Visualization, Packaging'],
      ['Scope', 'Modeling, Texturing, Lighting, Rendering'],
      ['Tools', 'Blender'],
    ],
    layout: [
      {
        type: 'frames',
        title: 'Selected Frames',
        groups: [{ files: ['render 02', 'render 03', 'render 04', 'render 05', 'render 06', 'render 07', 'render 08', 'render 09'], arrange: 'pairs' }],
      },
      {
        type: 'frames',
        title: 'Pens & Pills',
        tone: 'light',
        groups: [
          { label: 'Pens', files: ['pen 01', 'pen 02', 'pen 03', 'pen 04', 'pen 05', 'pen 06', 'pen 07'], arrange: 'stagger', perRow: 4 },
          { label: 'Pills', files: ['pills 01', 'pills 02', 'pills 03', 'pills 04'], arrange: 'stagger', perRow: 4 },
        ],
      },
      { type: 'compare', title: 'Clay / Final', pairs: [['cover', 'clay 1'], ['render 05', 'clay 2']] },
      { type: 'details', screenshots: ['screenshot 01', 'screenshot 02'] },
    ],
  },
  globalstar: { category: '3D Animation' },
  microsoft: { category: 'Motion Design' },
  wilson: {
    category: 'Product Rendering',
    // DRAFT details, inferred from the files (Cinema 4D screenshots): please confirm.
    details: [
      ['Project', 'Wilson'],
      ['Discipline', '3D Product Visualization'],
      ['Scope', 'Modeling, Texturing, Lighting, Rendering'],
      ['Tools', 'Cinema 4D'],
    ],
    layout: [
      {
        type: 'frames',
        title: 'Selected Frames',
        groups: [
          { label: 'Ball', files: ['ball01', 'ball02', 'ball03'], arrange: 'stagger', perRow: 3 },
          { label: 'Bench', note: 'One shot, three colourways', files: ['bench 01', 'bench 02', 'bench 03'], arrange: 'row' },
          { label: 'Court', note: 'One shot, three colourways', files: ['court 01', 'court 02', 'court 03'], arrange: 'row' },
        ],
      },
      { type: 'compare', title: 'Clay / Final', pairs: [['ball01', 'clay']] },
      { type: 'details', screenshots: ['screenshot 01', 'screenshot 02', 'screenshot 03'] },
    ],
  },
  gummagic: { category: 'Branding & Packaging' },
  samsung: {
    category: 'Product Rendering',
    // One line under "Services" at the top of the project page.
    summary: 'A minimal, futuristic product film giving an everyday charger a premium presence.',
    // Wall-text blocks placed along the project page (each is optional).
    story: {
      overview:
        'A product-focused commercial created for an e-commerce technology website, exploring a clean, minimal, and futuristic visual language. The goal was to give an everyday tech product a premium presence through smooth motion, refined details, and carefully crafted imagery.',
      direction:
        'The vision was to present the charger in an artistic, slightly abstract way — moving beyond a straightforward product showcase to create something that feels modern, distinctive, and visually engaging. Every movement and composition was designed to draw the eye back to the product.',
      lookdev:
        'Finding the right look was a process of observation, experimentation, and refinement. Textures, lighting, colors, and reflections were tested and adjusted until they came together in a balanced visual identity. The focus was on keeping the product clean and readable while building a futuristic atmosphere around it.',
      output:
        'A sleek, technology-driven product animation that combines minimalism with a cinematic touch, designed to capture attention and give the product a more elevated visual presence.',
    },
    // Shown in the "Project Details" section, one row per entry.
    details: [
      ['Project', 'Samsung Charger'],
      ['Discipline', '3D Motion Design, Product Visualization'],
      ['Scope', 'Modeling, Texturing, Animation, Lighting, Rendering, Compositing & Sound Design'],
      ['Tools', 'Cinema 4D, Octane, After Effects'],
    ],
    layout: [
      {
        type: 'frames',
        title: 'Selected Frames',
        text: ['Creative Direction', 'direction'],
        groups: [{ files: ['cover', 'cover 2', 'cover 3', 'cover 4'], arrange: 'pairs' }],
      },
      {
        type: 'compare',
        title: 'Clay / Final',
        text: ['Look Development', 'lookdev'],
        pairs: [['cover', 'clay 01']],
      },
      { type: 'details', screenshots: ['screen 01', 'screen 02', 'screen 03'] },
    ],
  },
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
