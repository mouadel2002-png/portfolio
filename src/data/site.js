// All site content lives here — edit this file to make the portfolio yours.
const img = (id) => `https://framerusercontent.com/images/${id}`;

export const profile = {
  name: 'Helena Diasek',
  role: 'Digital Designer',
  location: 'Houston, TX',
  year: new Date().getFullYear(),
  services: ['Branding', 'Creative Direction', 'UI/UX Design'],
  intro:
    "I bring a dynamic and impactful approach to brand design, focusing on creating identities that vividly communicate a business's essence to its intended audience.",
  aboutHeadline: ['Unforgettable', 'Digital Experiences'],
  aboutText:
    'My style is marked by a preference for clean, minimalist aesthetics, enriched with vibrant colors and textures to forge unforgettable brand experiences.',
  portrait: img('wzCfApozCAsVIoyOWoT8ezO55c.jpg'),
};

export const experiences = [
  { year: '2019', title: 'Design Intern', company: 'Luxe Brands' },
  { year: '2020', title: 'Junior Brand Designer', company: 'Creativio Agency' },
  { year: '2021', title: 'Brand Consultant', company: 'Freelance' },
  { year: '2023', title: 'Creative Director', company: 'Fisga' },
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
];

export const works = [
  {
    slug: 'r1-gradients',
    title: 'R1 Gradient',
    category: 'Product Design',
    year: '2024',
    client: 'Pulse Agency',
    services: 'Brand Design/Product Rendering',
    cover: img('8lWHRMjdd11kJUyyLWev5bfglg.png?scale-down-to=2048'),
    summary:
      '"R1 Gradients" stands as a testament to the power of vibrant color and seamless transitions in branding and product rendering services.',
    about:
      '"R1 Gradients" stands as a testament to the power of vibrant color and seamless transitions in branding and product rendering services. This fictional project showcases the expertise in creating visually striking designs that capture attention and convey the essence of innovation and creativity.',
    gallery: [
      img('OTCQKqThNwyhfINKgIF9etnnybE.png'),
      img('GmumJFr7h5RJQQoDk7kUh9bw.png'),
      img('pje3Up26nbPfLuPIk7XUFN7bC4.png'),
      img('8lWHRMjdd11kJUyyLWev5bfglg.png'),
    ],
  },
  {
    slug: 'hunt',
    title: 'HUNT',
    category: 'UI/UX',
    year: '2021',
    client: 'Hunt Agency',
    services: 'Visual Concept Development',
    cover: img('CgRnNsqdF21sd0QjGGchMmih9c.png'),
    summary:
      '"Hunt" dives into the realm of 3D abstract art, offering a collection of mesmerizing render backgrounds and visuals.',
    about:
      'The "Hunt" project aspires to redefine the boundaries of digital art through the creation of 3D abstract renders that evoke a sense of depth, movement, and emotion. Focusing on the interplay of light, texture, and color within a three-dimensional space, "Hunt" pushes the envelope of visual storytelling.',
    gallery: [
      img('zEqBeKokQGARrUpfXnxKwkTJrA.jpg'),
      img('GnvCaZrA0q0I2DhBX1lHyIWvb8.jpg'),
      img('go9BRXX3OzpmilFCj8fkTjKk.jpg'),
      img('zjS0jfvwqwmXRvgahtXLkNFLe0k.jpg'),
    ],
  },
  {
    slug: 'pz',
    title: 'Pz Stills',
    category: 'Branding',
    year: '2023',
    client: 'Multipz Studio',
    services: 'Exhibition Curation/Photographic Art Direction',
    cover: img('9G3a9gC3QgONGDacoBMlyqGU5i0.jpg'),
    summary:
      '"Pz Stills" encapsulates the essence of modern aesthetics through the timeless lens of black and white photography combined with sleek graphic design.',
    about:
      'The "Pz Stills" project was born out of a desire to explore the depth and emotion conveyed through black and white imagery, enhanced by contemporary graphic design elements. By stripping away color, the project focuses on the raw power of contrast, texture, and composition to tell stories and evoke feelings.',
    gallery: [
      img('RbHF1xPy5mrGNvJdpv4WyGMpQos.jpg'),
      img('6JAFxzqSYxPBhrztwhAWAXuO4s.jpg'),
      img('mO657LAIL0NlnyKxoHKEzJNRlT8.jpg'),
    ],
  },
  {
    slug: 'h23',
    title: 'H23',
    category: 'Visual Identity',
    year: '2022',
    client: 'Multpz Studio',
    services: 'Branding and Creative Direction',
    cover: img('1lKgMSMncdtxxIdtfOz62GUU8.png?scale-down-to=2048'),
    summary: 'You can write a quick overview about the project and the process.',
    about:
      'H23\'s visual identity is a fusion of strength and sophistication. Clean typography communicates professionalism, while bold imagery reflects a strategic vision. Subtle brand elements, inspired by architecture, add uniqueness. Overall, the visual identity evokes confidence and reliability.',
    gallery: [
      img('fNao0NwVxKOIkaq7bHLgD1iQ.png'),
      img('S7biBYXVCqErjuVtiK9XwU3rxtE.png'),
      img('R0FxCbdS7santdkEDGaDOdNRbUw.jpg'),
      img('4oUHahz5PGc5KIDpj5COgHTs16A.png'),
    ],
  },
];

export const playground = [
  { title: 'Personal Photography', image: img('6JAFxzqSYxPBhrztwhAWAXuO4s.jpg') },
  { title: 'Puke Logo', image: img('it0kUZYjd8ViYJAHLowAx4csOEY.png') },
  { title: 'Personal Photography', image: img('TAP9dayZQH6bpFyDmbSsgQbPVbc.jpg') },
  { title: 'Renders 02', image: img('WpWKgwy66uh6uY0OuKSSncrq0.jpg') },
  { title: 'Type Exploration', image: img('OEuU07NI7FNxRfaD6RfSwe6vbc.jpg') },
  { title: 'Renders 01', image: img('3PeEhcaMDNujnUJz86bWxo80w.jpg') },
  { title: 'Studio Cool 3D Rendering', image: img('lN6ni95OOxhK0IzABcCdd0s4.jpg') },
  { title: 'Personal Photography', image: img('PrnTkbZ3iHIVDxBqF6xIGv8FLKI.jpg') },
];
