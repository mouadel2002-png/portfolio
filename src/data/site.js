// All site content lives here — edit this file to make the portfolio yours.
import projects from './projects.json';
import portrait from './portrait.json';

const img = (id) => `https://framerusercontent.com/images/${id}`;
// Text shown in both languages: L(english, french). Plain strings are the same in both.
const L = (en, fr) => ({ en, fr });

export const profile = {
  name: 'Mouad Tahri',
  role: L('Digital Designer', 'Designer Numérique'),
  location: 'Houston, TX',
  // Placeholder: replace with your real address.
  email: 'hello@mouadtahri.com',
  year: new Date().getFullYear(),
  services: [
    L('Branding', 'Identité de marque'),
    L('Creative Direction', 'Direction créative'),
    L('UI/UX Design', 'Design UI/UX'),
  ],
  intro: L(
    "I bring a dynamic and impactful approach to brand design, focusing on creating identities that vividly communicate a business's essence to its intended audience.",
    "J’apporte une approche dynamique et percutante du design de marque, avec des identités qui traduisent clairement l’essence d’une entreprise auprès de son public."
  ),
  aboutHeadline: [L('Unforgettable', 'Des expériences'), L('Digital Experiences', 'numériques inoubliables')],
  // One entry per paragraph.
  aboutText: [
    L(
      'I’ve always seen art as a way of looking at the world differently. A space for questioning, experimenting, and giving form to ideas that don’t always have words.',
      'J’ai toujours vu l’art comme une façon de regarder le monde autrement. Un espace pour questionner, expérimenter et donner forme à des idées qui n’ont pas toujours de mots.'
    ),
    L(
      'My practice lives somewhere between design and art, combining visual communication, 3D, and motion to create work that goes beyond appearance. I’m interested in the balance between simplicity and expression, where even the smallest detail can change the way something is perceived.',
      'Ma pratique se situe entre le design et l’art, mêlant communication visuelle, 3D et motion pour créer un travail qui va au-delà de l’apparence. Je m’intéresse à l’équilibre entre simplicité et expression, là où le moindre détail peut changer la façon dont une chose est perçue.'
    ),
  ],
  portrait,
};

export const experiences = [
  { year: '2026', title: L('3D Generalist', 'Généraliste 3D'), company: 'IMAGE FACTORY Maroc' },
  { year: '2025', title: L('3D Motion Designer', 'Motion designer 3D'), company: L('Freelance', 'Indépendant') },
  { year: '2023 – 2024', title: L('3D Designer', 'Designer 3D'), company: 'IMAGE FACTORY Maroc' },
  { year: '2022', title: L('Graphic Designer', 'Graphiste'), company: 'FAAR-PRONERGY' },
];

export const socials = [
  { label: 'Linkedin', href: 'https://www.linkedin.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Behance', href: 'https://www.behance.net/' },
];

export const navLinks = [
  // label = key in the interface dictionary (src/i18n.js)
  { label: 'home', to: '/' },
  { label: 'about', to: '/about' },
  { label: 'playground', to: '/playground' },
  { label: 'gallery', to: '/gallery' },
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
//   ('cinema' = wide stills at alternating sizes; a group can also set `captions: [...]`)
//   { type: 'compare', title, text: [label, storyKey], pairs: [[final, clay], ...] }
//   { type: 'shots', title, featured: index, shots: [{ label, sketch, clay, final }, ...] }
//     -> the featured shot is one frame with Sketch | Clay | Final dividers to drag,
//        the others are Sketch / Clay / Final triptychs
//   { type: 'details', screenshots: [...] }   -> uses `details` rows below
// Projects without a layout show all their images as one exhibition wall.
const projectInfo = {
  eden: {
    category: L('Product Rendering', 'Rendu produit'),
    // DRAFT details, inferred from the files (Blender screenshots): please confirm.
    details: [
      [L('Project', 'Projet'), 'Eden'],
      [L('Discipline', 'Discipline'), L('3D Product Visualization, Packaging', 'Visualisation produit 3D, packaging')],
      [L('Scope', 'Périmètre'), L('Modeling, Texturing, Lighting, Rendering', 'Modélisation, texturing, éclairage, rendu')],
      [L('Tools', 'Outils'), 'Blender'],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        groups: [{ files: ['render 02', 'render 03', 'render 04', 'render 05', 'render 06', 'render 07', 'render 08', 'render 09'], arrange: 'pairs' }],
      },
      {
        type: 'frames',
        title: L('Pens & Pills', 'Stylos & comprimés'),
        tone: 'light',
        groups: [
          { label: L('Pens', 'Stylos'), files: ['pen 01', 'pen 02', 'pen 03', 'pen 04', 'pen 05', 'pen 06', 'pen 07'], arrange: 'stagger', perRow: 4 },
          { label: L('Pills', 'Comprimés'), files: ['pills 01', 'pills 02', 'pills 03', 'pills 04'], arrange: 'stagger', perRow: 4 },
        ],
      },
      { type: 'compare', title: L('Clay / Final', 'Clay / Final'), pairs: [['cover', 'clay 1'], ['render 05', 'clay 2']] },
      { type: 'details', screenshots: ['screenshot 01', 'screenshot 02'] },
    ],
  },
  globalstar: {
    category: L('3D Animation', 'Animation 3D'),
    // DRAFT details, inferred from the files: please confirm (and add Tools).
    details: [
      [L('Project', 'Projet'), 'Globalstar'],
      [L('Discipline', 'Discipline'), L('3D Animation, Storyboarding', 'Animation 3D, storyboard')],
      [
        L('Scope', 'Périmètre'),
        L('Storyboard, Modeling, Animation, Lighting, Rendering', 'Storyboard, modélisation, animation, éclairage, rendu'),
      ],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        groups: [
          {
            files: ['render 01', 'render 02', 'render 03', 'render 04', 'render 05', 'render 06', 'render 08', 'render 09'],
            arrange: 'cinema',
          },
        ],
      },
      {
        type: 'shots',
        title: L('Shot Breakdown', 'Découpage des plans'),
        featured: 3,
        shots: [
          { label: L('Shot 01', 'Plan 01'), sketch: 'gs-storyboardartboard-1', clay: 'clay 01', final: 'render 01' },
          { label: L('Shot 02', 'Plan 02'), sketch: 'gs-storyboardartboard-2', clay: 'clay 02', final: 'cover' },
          { label: L('Shot 03', 'Plan 03'), sketch: 'gs-storyboardartboard-3', clay: 'clay 03', final: 'render 02' },
          { label: L('Shot 04', 'Plan 04'), sketch: 'gs-storyboardartboard-4', clay: 'clay 04', final: 'render 03' },
          { label: L('Shot 07', 'Plan 07'), sketch: 'gs-storyboardartboard-9', clay: 'clay 05', final: 'render 06' },
          { label: L('Shot 09', 'Plan 09'), sketch: 'gs-storyboardartboard-11', clay: 'clay 06', final: 'render 09' },
        ],
      },
      {
        type: 'frames',
        title: L('Storyboard', 'Storyboard'),
        tone: 'light',
        groups: [
          {
            files: [
              'gs-storyboardartboard-1', 'gs-storyboardartboard-2', 'gs-storyboardartboard-3',
              'gs-storyboardartboard-4', 'gs-storyboardartboard-7', 'gs-storyboardartboard-8',
              'gs-storyboardartboard-9', 'gs-storyboardartboard-10', 'gs-storyboardartboard-11',
            ],
            captions: [L('Shot 01', 'Plan 01'), L('Shot 02', 'Plan 02'), L('Shot 03', 'Plan 03'), L('Shot 04', 'Plan 04'), L('Shot 05', 'Plan 05'), L('Shot 06', 'Plan 06'), L('Shot 07', 'Plan 07'), L('Shot 08', 'Plan 08'), L('Shot 09', 'Plan 09')],
            arrange: 'row',
            perRow: 3,
          },
        ],
      },
      { type: 'details' },
    ],
  },
  microsoft: {
    category: L('Motion Design', 'Motion design'),
    // DRAFT details, inferred from the files: please confirm (and add Tools).
    details: [
      [L('Project', 'Projet'), 'Microsoft'],
      [L('Discipline', 'Discipline'), L('3D Motion Design', 'Motion design 3D')],
      [
        L('Scope', 'Périmètre'),
        L('Modeling, Texturing, Animation, Lighting, Rendering, Compositing', 'Modélisation, texturing, animation, éclairage, rendu, compositing'),
      ],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        groups: [
          {
            files: [
              'cover', 'render 01', 'render 02', 'render 03', 'render 04', 'render 05', 'render 06',
              'render 07', 'render 08', 'render 10', 'render 11', 'render 12', 'render 13',
            ],
            arrange: 'cinema',
          },
        ],
      },
      {
        type: 'compare',
        title: L('Clay / Final', 'Clay / Final'),
        pairs: [['render 01', 'clay 1'], ['render 07', 'clay 2']],
      },
      { type: 'details' },
    ],
  },
  wilson: {
    category: L('Product Rendering', 'Rendu produit'),
    // DRAFT details, inferred from the files (Cinema 4D screenshots): please confirm.
    details: [
      [L('Project', 'Projet'), 'Wilson'],
      [L('Discipline', 'Discipline'), L('3D Product Visualization', 'Visualisation produit 3D')],
      [L('Scope', 'Périmètre'), L('Modeling, Texturing, Lighting, Rendering', 'Modélisation, texturing, éclairage, rendu')],
      [L('Tools', 'Outils'), 'Cinema 4D'],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        groups: [
          { label: L('Ball', 'Balle'), files: ['ball01', 'ball02', 'ball03'], arrange: 'stagger', perRow: 3 },
          { label: L('Bench', 'Banc'), note: L('One shot, three colourways', 'Un plan, trois coloris'), files: ['bench 01', 'bench 02', 'bench 03'], arrange: 'row' },
          { label: L('Court', 'Court'), note: L('One shot, three colourways', 'Un plan, trois coloris'), files: ['court 01', 'court 02', 'court 03'], arrange: 'row' },
        ],
      },
      { type: 'compare', title: L('Clay / Final', 'Clay / Final'), pairs: [['ball01', 'clay']] },
      { type: 'details', screenshots: ['screenshot 01', 'screenshot 02', 'screenshot 03'] },
    ],
  },
  gummagic: { category: L('Branding & Packaging', 'Identité & packaging') },
  samsung: {
    category: L('Product Rendering', 'Rendu produit'),
    // One line under "Services" at the top of the project page.
    summary: L(
      'A minimal, futuristic product film giving an everyday charger a premium presence.',
      'Un film produit minimal et futuriste qui donne à un chargeur du quotidien une présence premium.'
    ),
    // Wall-text blocks placed along the project page (each is optional).
    story: {
      overview: L(
        'A product-focused commercial created for an e-commerce technology website, exploring a clean, minimal, and futuristic visual language. The goal was to give an everyday tech product a premium presence through smooth motion, refined details, and carefully crafted imagery.',
        'Une publicité centrée sur le produit, réalisée pour un site e-commerce de technologie, explorant un langage visuel épuré, minimal et futuriste. L’objectif était de donner à un produit tech du quotidien une présence premium grâce à un mouvement fluide, des détails soignés et des images travaillées avec précision.'
      ),
      direction: L(
        'The vision was to present the charger in an artistic, slightly abstract way — moving beyond a straightforward product showcase to create something that feels modern, distinctive, and visually engaging. Every movement and composition was designed to draw the eye back to the product.',
        'L’idée était de présenter le chargeur de manière artistique, légèrement abstraite — au-delà d’une simple mise en valeur du produit — pour créer quelque chose de moderne, singulier et visuellement captivant. Chaque mouvement et chaque composition ramènent le regard vers le produit.'
      ),
      lookdev: L(
        'Finding the right look was a process of observation, experimentation, and refinement. Textures, lighting, colors, and reflections were tested and adjusted until they came together in a balanced visual identity. The focus was on keeping the product clean and readable while building a futuristic atmosphere around it.',
        'Trouver le bon rendu a été un travail d’observation, d’expérimentation et d’affinage. Textures, lumières, couleurs et reflets ont été testés et ajustés jusqu’à former une identité visuelle équilibrée. L’enjeu était de garder le produit net et lisible tout en construisant autour de lui une atmosphère futuriste.'
      ),
      output: L(
        'A sleek, technology-driven product animation that combines minimalism with a cinematic touch, designed to capture attention and give the product a more elevated visual presence.',
        'Une animation produit élégante et technologique, qui allie minimalisme et touche cinématographique, pensée pour capter l’attention et offrir au produit une présence visuelle plus affirmée.'
      ),
    },
    // Shown in the "Project Details" section, one row per entry.
    details: [
      [L('Project', 'Projet'), L('Samsung Charger', 'Chargeur Samsung')],
      [L('Discipline', 'Discipline'), L('3D Motion Design, Product Visualization', 'Motion design 3D, visualisation produit')],
      [L('Scope', 'Périmètre'), L('Modeling, Texturing, Animation, Lighting, Rendering, Compositing & Sound Design', 'Modélisation, texturing, animation, éclairage, rendu, compositing & sound design')],
      [L('Tools', 'Outils'), 'Cinema 4D, Octane, After Effects'],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        text: [L('Creative Direction', 'Direction créative'), 'direction'],
        groups: [{ files: ['cover', 'cover 2', 'cover 3', 'cover 4'], arrange: 'pairs' }],
      },
      {
        type: 'compare',
        title: L('Clay / Final', 'Clay / Final'),
        text: [L('Look Development', 'Développement du look'), 'lookdev'],
        pairs: [['cover', 'clay 01']],
      },
      { type: 'details', screenshots: ['screen 01', 'screen 02', 'screen 03'] },
    ],
  },
  sauvage: { category: L('Motion Design', 'Motion design') },
  oulmess: { category: L('Product Animation', 'Animation produit') },
  'the-matter': { category: L('Short Film', 'Court métrage') },
  'once-cherished-now-forsaken': { category: L('Short Film', 'Court métrage') },
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
