// All site content lives here — edit this file to make the portfolio yours.
import projects from './projects.json';
import portrait from './portrait.json';

const img = (id) => `https://framerusercontent.com/images/${id}`;
// Text shown in both languages: L(english, french). Plain strings are the same in both.
const L = (en, fr) => ({ en, fr });

export const profile = {
  name: 'Mouad Tahri',
  role: L('Digital Designer', 'Designer Numérique'),
  location: L('Casablanca, Morocco', 'Casablanca, Maroc'),
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
//   { type: 'interlude', items: [{ file, left, width, drop }] } -> loose pieces between sections
//   ('wall' = the mixed-size exhibition wall; 'justify' = rows of equal height filling the
//   width, `split: [2, 3]` sets how many per row; inside a frames section a group can also be
//   { arrange: 'interlude', items: [...] }). A project can set hero: 'cover' to show its
//   cover at the top even when it has a film.
// Projects without a layout show all their images as one exhibition wall.
const projectInfo = {
  eden: {
    category: L('Product Rendering', 'Rendu produit'),
    intro: [L("The Idea", "L’idée"), 'idea'],
    outro: [L("The Result", "Le résultat"), 'result'],
    // Wall-text blocks placed along the project page (a list = several paragraphs).
    story: {
      idea: L("Eden was a product visualization project created for a beauty and wellness brand’s website. The work covered a range of products, from oral and injectable semaglutide and tirzepatide treatments to vegan vitamin pills and Ozempic-style injection pens. The goal was to present each product with a sense of realism and precision, while giving the imagery an artistic quality that goes beyond a conventional product photograph.", "Eden est un projet de visualisation produit réalisé pour le site d’une marque de beauté et de bien-être. Le travail couvrait toute une gamme de produits, des traitements à base de sémaglutide et de tirzépatide, oraux ou injectables, aux vitamines véganes en comprimés et aux stylos injecteurs de type Ozempic. L’objectif était de présenter chaque produit avec réalisme et précision, tout en donnant aux images une qualité artistique qui dépasse la photographie produit classique."),
      direction: L(["The challenge was to find the balance between clinical precision and the visual language of beauty and wellness. We wanted the products to feel trustworthy and tangible, while giving them a refined, contemporary presence that would work naturally within Eden’s existing brand identity.","The direction stayed focused on the products themselves: their silhouettes, packaging, materials, and details. Rather than overwhelming the compositions, the visual treatment was designed to let the products speak for themselves, with an elevated finish suited to a modern digital storefront."], ["Le défi était de trouver l’équilibre entre la précision clinique et le langage visuel de la beauté et du bien-être. Nous voulions que les produits inspirent confiance et paraissent tangibles, tout en leur donnant une présence raffinée et contemporaine, en accord naturel avec l’identité de marque d’Eden.","La direction est restée centrée sur les produits eux-mêmes : leurs silhouettes, leurs emballages, leurs matières et leurs détails. Plutôt que de surcharger les compositions, le traitement visuel a été pensé pour laisser les produits parler d’eux-mêmes, avec une finition soignée adaptée à une boutique en ligne moderne."]),
      lookdev: L(["A large part of the process was about translating physical products into convincing digital objects. From the shape and proportions of the bottles and pens to the finishes of their surfaces and the details of the packaging, each element needed to feel believable up close.","Through careful modeling, texturing, material development, and lighting, we worked toward a realistic finish while retaining control over the final image. The aim was to make the renders feel clean and polished without losing the subtle details that give a product its physical presence."], ["Une grande partie du travail a consisté à transformer des produits physiques en objets numériques convaincants. De la forme et des proportions des flacons et des stylos aux finitions de leurs surfaces et aux détails des emballages, chaque élément devait paraître crédible de près.","Grâce à une modélisation, un texturing, un développement des matières et un éclairage soignés, nous avons visé un rendu réaliste tout en gardant la maîtrise de l’image finale. L’objectif était d’obtenir des rendus nets et aboutis sans perdre les détails subtils qui donnent à un produit sa présence physique."]),
      life: L(["The products were built and rendered in 3D, giving us control over every aspect of their presentation, from the smallest packaging detail to the lighting and final composition. Working within Eden’s brand direction, we developed the visuals to maintain consistency across the different product types while allowing each one to be presented clearly and on its own terms.","This approach also made it possible to create website-ready imagery without relying entirely on traditional product photography."], ["Les produits ont été modélisés et rendus en 3D, ce qui nous a permis de maîtriser chaque aspect de leur présentation, du plus petit détail d’emballage jusqu’à l’éclairage et la composition finale. En suivant la direction de marque d’Eden, nous avons développé des visuels cohérents d’un type de produit à l’autre, tout en présentant chacun clairement et selon ses propres codes.","Cette approche a aussi permis de créer des images prêtes pour le site sans dépendre entièrement de la photographie produit traditionnelle."]),
      result: L("A collection of realistic, carefully art-directed product renders designed to bring Eden’s product range to life online. The project explored how 3D visualization can combine technical precision with a more considered visual sensibility, creating imagery that feels tangible, refined, and consistent with the brand.", "Une collection de rendus produits réalistes et soigneusement dirigés, conçus pour donner vie à la gamme Eden en ligne. Le projet a exploré la manière dont la visualisation 3D peut allier précision technique et sensibilité visuelle plus réfléchie, pour des images tangibles, raffinées et fidèles à la marque."),
    },
    details: [
      [L('Project', 'Projet'), 'Eden'],
      [L('Discipline', 'Discipline'), L('3D Product Visualization', 'Visualisation produit 3D')],
      [L('Scope', 'Périmètre'), L('Modeling, Texturing, Lighting, Rendering', 'Modélisation, texturing, éclairage, rendu')],
      [L('Tools', 'Outils'), 'Blender, Cycles, Photoshop'],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        text: [L("The Art Direction", "La direction artistique"), 'direction'],
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
      { type: 'compare', title: L('Clay / Final', 'Clay / Final'), text: [L("Look Development", "Développement du look"), 'lookdev'], pairs: [['cover', 'clay 1'], ['render 05', 'clay 2']] },
      { type: 'details', text: [L("Bringing It to Life", "Donner vie au projet"), 'life'], screenshots: ['screenshot 01', 'screenshot 02'] },
    ],
  },
  globalstar: {
    category: L('3D Animation', 'Animation 3D'),
    intro: [L("The Idea", "L’idée"), 'idea'],
    outro: [L("The Result", "Le résultat"), 'result'],
    // Wall-text blocks placed along the project page (a list = several paragraphs).
    story: {
      idea: L(["Globalstar was a collaborative project developed with the Globalstar team to visualize an automated warehouse system and the technology behind it. The challenge was to turn a complex logistics process into something people could understand visually, showing how robotics, automated sorting, warehouse storage, and satellite connectivity work together as part of one connected system.","Rather than simply presenting the machinery, we wanted to tell the story of how everything moves, communicates, and comes together."], ["Globalstar est un projet collaboratif mené avec l’équipe Globalstar pour visualiser un entrepôt automatisé et la technologie qui le fait fonctionner. Le défi était de rendre compréhensible, visuellement, un processus logistique complexe, en montrant comment la robotique, le tri automatisé, le stockage et la connectivité satellitaire fonctionnent ensemble comme un seul système connecté.","Plutôt que de simplement présenter les machines, nous voulions raconter comment tout bouge, communique et s’assemble."]),
      direction: L(["The visual direction stayed firmly within the world of technology: clean structures, sleek robotic forms, and a warehouse environment with a slightly abstract, futuristic feel. We wanted the system to feel advanced and precise without losing the clarity needed to explain how it works.","The balance was between realism and abstraction. The warehouse had to feel like a functional industrial environment, while the composition, lighting, and overall visual language helped bring attention to the technology at the heart of the project."], ["La direction visuelle est restée ancrée dans l’univers de la technologie : structures épurées, formes robotiques élégantes et un entrepôt à l’atmosphère légèrement abstraite et futuriste. Nous voulions un système avancé et précis, sans perdre la clarté nécessaire pour expliquer son fonctionnement.","L’équilibre se jouait entre réalisme et abstraction. L’entrepôt devait ressembler à un véritable environnement industriel, tandis que la composition, l’éclairage et le langage visuel attiraient l’attention sur la technologie au cœur du projet."]),
      system: L(["The animation follows the journey of a package through the automated warehouse. Robots first collect the boxes and transport them to a dedicated conveyor-belt sorting system, where they are organized before being picked up again by the robots. From there, the boxes are carried to their designated numbered shelves, each identified by a specific number, within the warehouse’s larger storage system, ready to be retrieved by human operators for final delivery.","Each stage was designed to communicate the relationship between the different components, making the workflow easier to follow while showing how automation supports the movement of goods from one point to another."], ["L’animation suit le parcours d’un colis dans l’entrepôt automatisé. Les robots récupèrent d’abord les cartons et les transportent vers un système de tri par convoyeur, où ils sont organisés avant d’être repris par les robots. Les cartons sont ensuite acheminés vers leurs étagères numérotées, chacune identifiée par un numéro précis au sein du grand système de stockage, prêts à être récupérés par les opérateurs pour la livraison finale.","Chaque étape a été pensée pour montrer la relation entre les différents éléments, rendant le processus plus facile à suivre tout en montrant comment l’automatisation accompagne le déplacement des marchandises d’un point à un autre."]),
      connect: L(["An important part of the story was showing how the robotic infrastructure connects with Globalstar’s satellite technology. The project wasn’t only about what happens inside the warehouse, but also about the connectivity that links the system together.","This connection helped frame the warehouse as part of a wider technological network, where robotics, logistics, and satellite communication work together to support a more connected operation."], ["Une part importante du récit consistait à montrer comment l’infrastructure robotique se connecte à la technologie satellitaire de Globalstar. Le projet ne portait pas seulement sur ce qui se passe à l’intérieur de l’entrepôt, mais aussi sur la connectivité qui relie l’ensemble du système.","Ce lien a permis de présenter l’entrepôt comme une partie d’un réseau technologique plus large, où robotique, logistique et communication satellitaire travaillent ensemble pour une activité plus connectée."]),
      life: L(["Working alongside the Globalstar team, we translated the technical workflow into a series of 3D visuals, carefully considering the movement of the robots, the layout of the warehouse, and the sequence of operations. The focus was on making each stage visually understandable while maintaining a consistent, polished technological aesthetic.","Every scene had a purpose: to explain a process, reveal a connection, or help the viewer understand how the different parts of the system interact."], ["Aux côtés de l’équipe Globalstar, nous avons traduit le processus technique en une série de visuels 3D, en réfléchissant avec soin au mouvement des robots, à l’agencement de l’entrepôt et à l’enchaînement des opérations. L’enjeu était de rendre chaque étape visuellement compréhensible tout en gardant une esthétique technologique cohérente et soignée.","Chaque scène avait un but : expliquer un processus, révéler un lien ou aider le spectateur à comprendre comment les différentes parties du système interagissent."]),
      result: L("The project became a visual exploration of connected automation, using 3D visualization to make an intricate industrial process more tangible and accessible. By combining a sleek technological aesthetic with a clear operational narrative, we brought the warehouse system to life as more than a collection of machines — as a coordinated network designed to move, sort, store, and deliver.", "Le projet est devenu une exploration visuelle de l’automatisation connectée, utilisant la visualisation 3D pour rendre un processus industriel complexe plus tangible et accessible. En associant une esthétique technologique épurée à un récit opérationnel clair, nous avons donné vie à l’entrepôt non comme un simple ensemble de machines, mais comme un réseau coordonné conçu pour déplacer, trier, stocker et livrer."),
    },
    details: [
      [L('Project', 'Projet'), 'Globalstar'],
      [L('Discipline', 'Discipline'), L('3D Animation, Storyboarding', 'Animation 3D, storyboard')],
      [L('Scope', 'Périmètre'), L('Storyboard, Modeling, Animation, Lighting, Rendering, Color Grading', 'Storyboard, modélisation, animation, éclairage, rendu, étalonnage')],
      [L('Tools', 'Outils'), 'Blender, Octane'],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        text: [L("The Art Direction", "La direction artistique"), 'direction'],
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
        text: [L("How the System Works", "Le fonctionnement du système"), 'system'],
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
        text: [L("Connecting the System", "Connecter le système"), 'connect'],
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
      { type: 'details', text: [L("Bringing It to Life", "Donner vie au projet"), 'life'] },
    ],
  },
  microsoft: {
    category: L('Motion Design', 'Motion design'),
    intro: [L("The Idea", "L’idée"), 'idea'],
    outro: [L("The Result", "Le résultat"), 'result'],
    // Wall-text blocks placed along the project page (a list = several paragraphs).
    story: {
      idea: L("A 3D motion design commercial exploring the technology behind Microsoft OneDrive. The goal was to make an invisible digital process tangible, showing what happens behind the screen when files are organized, synced, and sent to the cloud.", "Une publicité en motion design 3D qui explore la technologie derrière Microsoft OneDrive. L’objectif était de rendre tangible un processus numérique invisible, en montrant ce qui se passe derrière l’écran lorsque les fichiers sont organisés, synchronisés et envoyés dans le cloud."),
      direction: L("The visual direction drew on Microsoft’s clean, recognizable design language, combining simplified 3D environments, smooth transitions, and clear visual storytelling. The challenge was to translate an abstract system into something intuitive, guiding viewers through the journey of their files without losing the sense of a polished technology commercial.", "La direction visuelle s’appuie sur le langage graphique épuré et reconnaissable de Microsoft, en combinant des environnements 3D simplifiés, des transitions fluides et une narration visuelle claire. Le défi était de traduire un système abstrait en quelque chose d’intuitif, en guidant le spectateur dans le parcours de ses fichiers sans perdre la finition d’une publicité technologique."),
      life: L("Through 3D animation, we visualized how files move through the OneDrive system, from organization on a device to synchronization with the cloud. Each sequence helped break down the technology into understandable visual steps, revealing the process happening behind everyday digital interactions.", "Grâce à l’animation 3D, nous avons visualisé le parcours des fichiers dans OneDrive, de leur organisation sur un appareil jusqu’à leur synchronisation avec le cloud. Chaque séquence décompose la technologie en étapes visuelles compréhensibles, révélant le processus à l’œuvre derrière nos gestes numériques du quotidien."),
      result: L("A technology-focused commercial that turns an invisible digital workflow into a clear, engaging visual experience, making the functionality behind Microsoft OneDrive easier to understand through 3D motion design.", "Une publicité technologique qui transforme un flux de travail numérique invisible en une expérience visuelle claire et engageante, rendant le fonctionnement de Microsoft OneDrive plus facile à comprendre grâce au motion design 3D."),
    },
    details: [
      [L('Project', 'Projet'), 'Microsoft'],
      [L('Discipline', 'Discipline'), L('3D Motion Design', 'Motion design 3D')],
      [L('Scope', 'Périmètre'), L('Modeling, Texturing, Animation, Lighting, Rendering, Compositing', 'Modélisation, texturing, animation, éclairage, rendu, compositing')],
      [L('Tools', 'Outils'), 'Blender, Cycles, After Effects'],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        text: [L("The Art Direction", "La direction artistique"), 'direction'],
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
        text: [L("Bringing It to Life", "Donner vie au projet"), 'life'],
        pairs: [['render 01', 'clay 1'], ['render 07', 'clay 2']],
      },
      { type: 'details' },
    ],
  },
  wilson: {
    category: L('Product Rendering', 'Rendu produit'),
    // One line under "Services" at the top of the project page.
    summary: L(
      'A 3D study of Wilson tennis equipment: rackets, balls and courts in bold, cinematic contrast.',
      'Une étude 3D de l’équipement de tennis Wilson : raquettes, balles et courts en contrastes forts et cinématographiques.'
    ),
    // Wall-text blocks placed along the project page.
    story: {
      overview: L(
        'A 3D product visualization project inspired by Wilson tennis equipment, exploring the textures, materials, and visual identity of the sport. The project brings together tennis rackets, balls, and court environments through a series of detailed renders, creating a visual study that blends product presentation with the atmosphere of the game.',
        'Un projet de visualisation produit 3D inspiré de l’équipement de tennis Wilson, explorant les textures, les matières et l’identité visuelle de ce sport. Raquettes, balles et terrains se rencontrent à travers une série de rendus détaillés, pour une étude visuelle qui mêle présentation produit et atmosphère du jeu.'
      ),
      direction: L(
        'The direction was built around contrast: the vivid fluorescent green of the tennis balls against deep blacks, warm earthy tones, and the cool blue of the court. Rather than relying on straightforward product shots, I explored a mix of macro details, dramatic close-ups, and wider compositions to give each render its own character while maintaining a consistent visual language.',
        'La direction s’est construite autour du contraste : le vert fluorescent éclatant des balles face aux noirs profonds, aux tons terreux chauds et au bleu froid du terrain. Plutôt que de simples prises de vue produit, j’ai exploré un mélange de détails macro, de gros plans dramatiques et de compositions plus larges, pour donner à chaque rendu son propre caractère tout en gardant un langage visuel cohérent.'
      ),
      lookdev: L(
        'Lighting played a central role in shaping the images. Focused highlights reveal the rackets’ glossy frames and intricate string patterns, while softer, directional light brings out the fuzzy texture of the tennis balls and the grain of the wooden surfaces. The balance between shadows, reflections, and saturated colors creates depth and gives the products a tactile, almost cinematic quality.',
        'La lumière a joué un rôle central dans la construction des images. Des reflets précis révèlent les cadres brillants des raquettes et le détail des cordages, tandis qu’une lumière plus douce et directionnelle fait ressortir la texture duveteuse des balles et le grain du bois. L’équilibre entre ombres, reflets et couleurs saturées crée de la profondeur et donne aux produits une qualité tactile, presque cinématographique.'
      ),
      production: L(
        'The process focused on building detailed product scenes, refining materials, and experimenting with camera angles and lighting setups to find the strongest compositions. From the close-up framing of the racket and ball to the overhead view of the blue court, each scene was developed to emphasize a different aspect of the equipment and its relationship to the sport.',
        'Le travail a consisté à construire des scènes produit détaillées, à affiner les matières et à expérimenter angles de caméra et éclairages pour trouver les compositions les plus fortes. Du cadrage serré sur la raquette et la balle à la vue plongeante sur le court bleu, chaque scène a été pensée pour mettre en avant un aspect différent de l’équipement et de son lien avec le sport.'
      ),
      output: L(
        'A collection of polished 3D renders that explores tennis through a product-focused lens. By combining precise details with dramatic lighting and bold color contrasts, the project creates a visual identity that feels energetic, contemporary, and rooted in the performance and design of Wilson tennis equipment.',
        'Une collection de rendus 3D aboutis qui explore le tennis sous l’angle du produit. En combinant détails précis, lumière dramatique et forts contrastes de couleurs, le projet crée une identité visuelle énergique et contemporaine, ancrée dans la performance et le design de l’équipement Wilson.'
      ),
    },
    details: [
      [L('Project', 'Projet'), 'Wilson'],
      [L('Discipline', 'Discipline'), L('3D Product Visualization', 'Visualisation produit 3D')],
      [L('Scope', 'Périmètre'), L('Modeling, Texturing, Lighting, Rendering', 'Modélisation, texturing, éclairage, rendu')],
      [L('Tools', 'Outils'), 'Cinema 4D, Octane'],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        text: [L('Creative Direction', 'Direction créative'), 'direction'],
        groups: [
          { label: L('Ball', 'Balle'), files: ['ball01', 'ball02', 'ball03'], arrange: 'stagger', perRow: 3 },
          { label: L('Bench', 'Banc'), note: L('One shot, three colourways', 'Un plan, trois coloris'), files: ['bench 01', 'bench 02', 'bench 03'], arrange: 'row' },
          { label: L('Court', 'Court'), note: L('One shot, three colourways', 'Un plan, trois coloris'), files: ['court 01', 'court 02', 'court 03'], arrange: 'row' },
        ],
      },
      {
        type: 'compare',
        title: L('Clay / Final', 'Clay / Final'),
        text: [L('Look Development', 'Développement du look'), 'lookdev'],
        pairs: [['ball01', 'clay']],
      },
      {
        type: 'details',
        text: [L('Production & Rendering', 'Production & rendu'), 'production'],
        screenshots: ['screenshot 01', 'screenshot 02', 'screenshot 03'],
      },
    ],
  },
  gummagic: {
    category: L('Branding & Packaging', 'Identité & packaging'),
    // One line under "Services" at the top of the project page.
    summary: L(
      'What if vitamins felt less like a daily routine and more like a little moment of fun?',
      'Et si les vitamines ressemblaient moins à une routine quotidienne qu’à un petit moment de plaisir ?'
    ),
    intro: [L("The Idea", "L’idée"), 'idea'],
    outro: [L("The Result", "Le résultat"), 'result'],
    // Wall-text blocks placed along the project page (a list = several paragraphs).
    story: {
      idea: L("We wanted to build a brand that feels full of life, with a visual identity that speaks through color, playful forms, and a sense of energy. From the very beginning, the project was about more than making a product look good. It was about creating a whole world around it.", "Nous voulions construire une marque pleine de vie, avec une identité visuelle qui s’exprime par la couleur, des formes ludiques et une vraie énergie. Dès le départ, le projet allait au-delà de la simple mise en valeur d’un produit : il s’agissait de créer tout un univers autour de lui."),
      direction: L(["We built the visual language around three flavors, each with its own personality: pink for strawberry, blue for watermelon, and purple for grape. Choosing these colors wasn’t just about matching a flavor to a shade. It was about finding the right balance between appetite, energy, and visual identity, while making the three variations feel like part of the same family.","The direction grew around vivid colors, soft lighting, dreamy effects, and punchy color grading. We wanted the product to feel almost like it belonged in its own little universe: vibrant and playful, but still polished enough to feel like a real brand."], ["Nous avons construit le langage visuel autour de trois saveurs, chacune avec sa propre personnalité : rose pour la fraise, bleu pour la pastèque et violet pour le raisin. Le choix de ces couleurs ne consistait pas seulement à associer une saveur à une teinte. Il fallait trouver le bon équilibre entre gourmandise, énergie et identité visuelle, tout en faisant des trois variantes les membres d’une même famille.","La direction s’est développée autour de couleurs vives, d’une lumière douce, d’effets oniriques et d’un étalonnage percutant. Nous voulions que le produit semble appartenir à son propre petit univers : vibrant et ludique, mais suffisamment abouti pour être une vraie marque."]),
      brand: L(["Everything was developed from scratch. We explored the gummy’s shape and size, the bottle design, the packaging, and the colors that would define each variation. From there, the identity expanded into shopping bags, supporting materials, and the retail experience itself.","The goal was to make Gummagic feel consistent wherever it appeared, whether in someone’s hands, on a shelf, or across a campaign."], ["Tout a été conçu de zéro. Nous avons exploré la forme et la taille des gummies, le design du flacon, le packaging et les couleurs propres à chaque variante. L’identité s’est ensuite étendue aux sacs, aux supports de communication et à l’expérience en point de vente.","L’objectif était que Gummagic reste cohérente partout où elle apparaît, dans les mains de quelqu’un, en rayon ou au fil d’une campagne."]),
      beyond: L(["We wanted the playful side of Gummagic to live beyond the packaging. That’s why we also developed the direction for retail stands designed for shopping malls and parapharmacies, incorporating fun games to encourage interaction and make the display more than just a place to pick up a product.","The stand became another opportunity to express the brand’s personality, turning a simple point of sale into a small experience people could engage with."], ["Nous voulions que le côté ludique de Gummagic vive au-delà du packaging. C’est pourquoi nous avons aussi développé la direction des stands destinés aux centres commerciaux et aux parapharmacies, avec des jeux pour encourager l’interaction et faire du présentoir bien plus qu’un simple endroit où prendre un produit.","Le stand est devenu une autre occasion d’exprimer la personnalité de la marque, transformant un simple point de vente en une petite expérience à vivre."]),
      life: L(["Through 3D modeling, material exploration, lighting, and rendering, we translated the concept into a vivid, tactile visual world. A lot of the work was about finding the right balance: keeping the gummies and packaging believable while pushing the colors, lighting, and atmosphere just enough to give the visuals their own character.","For me, the interesting part was seeing all these decisions come together, from the smallest detail of the product to the larger brand experience."], ["Grâce à la modélisation 3D, à l’exploration des matières, à l’éclairage et au rendu, nous avons traduit le concept en un univers visuel vivant et tactile. Une grande partie du travail consistait à trouver le bon équilibre : garder des gummies et un packaging crédibles tout en poussant juste assez les couleurs, la lumière et l’atmosphère pour donner du caractère aux visuels.","Pour moi, le plus intéressant a été de voir toutes ces décisions se rejoindre, du plus petit détail du produit jusqu’à l’expérience de marque dans son ensemble."]),
      result: L("Gummagic became an exploration of how product design, branding, and visual storytelling can work together. A colorful world built around a simple idea: making vitamins feel a little more alive, a little more playful, and a lot more fun.", "Gummagic est devenu une exploration de la manière dont design produit, identité de marque et narration visuelle peuvent fonctionner ensemble. Un univers coloré construit autour d’une idée simple : rendre les vitamines un peu plus vivantes, un peu plus ludiques et beaucoup plus amusantes."),
    },
    details: [
      [L('Project', 'Projet'), 'Gummagic'],
      [L('Discipline', 'Discipline'), L('Branding, Packaging, 3D Product Visualization', 'Identité, packaging, visualisation produit 3D')],
      [L('Scope', 'Périmètre'), L('3D Modeling, Texturing, Lighting, Rendering, Package Design', 'Modélisation 3D, texturing, éclairage, rendu, design de packaging')],
      [L('Tools', 'Outils'), 'Blender, Cycles, Photoshop, Illustrator'],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        text: [L("The Art Direction", "La direction artistique"), 'direction'],
        // Renders, with the ads and gums tucked small into the empty side of each row.
        groups: [
          {
            files: [
              'render 01', 'gum 01', 'ad1', 'render 02', 'render 03', 'gum 02',
              'ad2', 'render 04', 'render 05', 'gum 03', 'ad3', 'render 06',
            ],
            arrange: 'mix',
            tight: true,
          },
        ],
      },
      {
        type: 'frames',
        title: L('Lifestyle', 'Lifestyle'),
        text: [L("Beyond the Product", "Au-delà du produit"), 'beyond'],
        groups: [
          {
            // Each portrait sits beside the product shot it goes with.
            files: ['agent 1', 'agent 01', 'agent 02', 'agent 2', 'agent 3', 'agent 03'],
            arrange: 'row',
            perRow: 2,
          },
        ],
      },
      {
        type: 'frames',
        title: L('Branding', 'Identité'),
        text: [L("Building the Brand", "Construire la marque"), 'brand'],
        // Justified rows: every image in a row shares one height and the row fills the width.
        groups: [{ files: ['brand 01', 'brand 02', 'brand 03', 'brand 04', 'brand 05'], arrange: 'justify', split: [2, 3] }],
      },
      { type: 'details', text: [L("Bringing It to Life", "Donner vie au projet"), 'life'] },
    ],
  },
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
  sauvage: {
    category: L('Motion Design', 'Motion design'),
    intro: [L("The Idea", "L’idée"), 'idea'],
    outro: [L("The Result", "Le résultat"), 'result'],
    // Wall-text blocks placed along the project page (a list = several paragraphs).
    story: {
      idea: L("A 3D video showcase inspired by Dior Sauvage, built around the perfume’s bold identity and distinctive scent profile. The goal was to create a striking visual experience that highlights the bottle while translating the fragrance’s notes into a dynamic, sensory presentation.", "Une vidéo 3D inspirée de Dior Sauvage, construite autour de l’identité affirmée du parfum et de sa signature olfactive singulière. L’objectif était de créer une expérience visuelle marquante qui met en valeur le flacon tout en traduisant les notes du parfum en une présentation dynamique et sensorielle."),
      direction: L("The direction blends trendy, rhythmic animation with the timeless elegance of luxury perfumery. Through sharp transitions, fluid movement, and carefully composed shots, we wanted to capture the fragrance’s bold character without losing its premium feel. Every visual choice was guided by the balance between energy and sophistication.", "La direction mêle une animation rythmée et actuelle à l’élégance intemporelle de la parfumerie de luxe. À travers des transitions nettes, des mouvements fluides et des plans soigneusement composés, nous voulions saisir le caractère audacieux du parfum sans perdre son aura premium. Chaque choix visuel a été guidé par l’équilibre entre énergie et sophistication."),
      life: L("Through 3D product visualization and rhythm-driven animation, the bottle becomes the centerpiece of the experience. Imagery inspired by the fragrance notes adds atmosphere and depth, while controlled lighting, refined compositions, and precise timing preserve the product’s luxurious presence throughout the sequence.", "Grâce à la visualisation produit 3D et à une animation portée par le rythme, le flacon devient la pièce maîtresse de l’expérience. Des images inspirées des notes du parfum ajoutent atmosphère et profondeur, tandis qu’un éclairage maîtrisé, des compositions raffinées et un timing précis préservent la présence luxueuse du produit tout au long de la séquence."),
      result: L("A contemporary 3D showcase that combines bold motion with understated luxury, bringing together fragrance-inspired storytelling and premium product presentation in a visual experience that feels both energetic and sophisticated.", "Une vitrine 3D contemporaine qui allie mouvement audacieux et luxe discret, réunissant une narration inspirée du parfum et une présentation produit haut de gamme dans une expérience visuelle à la fois énergique et sophistiquée."),
    },
    details: [
      [L('Project', 'Projet'), 'Dior Sauvage'],
      [L('Discipline', 'Discipline'), L('3D Motion Design', 'Motion design 3D')],
      [L('Scope', 'Périmètre'), L('Modeling, Texturing, Animation, Lighting, Rendering, Compositing', 'Modélisation, texturing, animation, éclairage, rendu, compositing')],
      [L('Tools', 'Outils'), 'Blender, Cycles, After Effects'],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        text: [L("The Art Direction", "La direction artistique"), 'direction'],
        groups: [{ files: ['render 01', 'render 02', 'cover', 'render 03', 'render 04', 'render 05', 'render 06', 'render 07', 'render 08'], arrange: 'cinema' }],
      },
      { type: 'details', text: [L("Bringing It to Life", "Donner vie au projet"), 'life'] },
    ],
  },
  oulmess: {
    category: L('Product Animation', 'Animation produit'),
    intro: [L("The Idea", "L’idée"), 'idea'],
    outro: [L("The Result", "Le résultat"), 'result'],
    // Wall-text blocks placed along the project page (a list = several paragraphs).
    story: {
      idea: L("A TV commercial for Oulmès, a Moroccan sparkling water brand, created to introduce its new range of flavored sparkling waters. The goal was to bring the new flavors to life through an energetic, visually engaging commercial that captures attention and makes the product feel fresh and exciting.", "Une publicité TV pour Oulmès, marque marocaine d’eau gazeuse, réalisée pour présenter sa nouvelle gamme d’eaux pétillantes aromatisées. L’objectif était de donner vie aux nouvelles saveurs à travers un spot énergique et visuellement captivant, qui attire l’attention et rend le produit frais et enthousiasmant."),
      direction: L("The direction focused on vibrant visuals, dynamic movement, and a lively commercial rhythm. The idea was to give each flavor a strong visual presence while staying true to the brand’s identity, creating a refreshing, modern look suited to television advertising.", "La direction s’est concentrée sur des visuels éclatants, un mouvement dynamique et un rythme publicitaire vivant. L’idée était de donner à chaque saveur une forte présence visuelle tout en restant fidèle à l’identité de la marque, pour un rendu rafraîchissant et moderne adapté à la publicité télévisée."),
      result: L("An energetic product commercial designed to celebrate Oulmès’ new flavors through bold visuals and a fresh, contemporary feel.", "Une publicité produit énergique, pensée pour célébrer les nouvelles saveurs d’Oulmès à travers des visuels audacieux et un ton frais et contemporain."),
    },
    details: [
      [L('Project', 'Projet'), 'Oulmès'],
      [L('Discipline', 'Discipline'), L('3D Product Animation', 'Animation produit 3D')],
      [L('Scope', 'Périmètre'), L('Modeling, Texturing, Animation, Lighting, Rendering, Compositing', 'Modélisation, texturing, animation, éclairage, rendu, compositing')],
      [L('Tools', 'Outils'), 'Blender, Cycles, After Effects'],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        text: [L("The Art Direction", "La direction artistique"), 'direction'],
        groups: [{ files: ['cover', 'render 02', 'render 03', 'render 04', 'render 05', 'render 06', 'render 07'], arrange: 'cinema' }],
      },
      {
        type: 'compare',
        title: L('Clay / Final', 'Clay / Final'),
        pairs: [['render 06', 'clay 1'], ['render 04', 'clay 2']],
      },
      { type: 'details' },
    ],
  },
  'the-matter': {
    category: L('Short Film', 'Court métrage'),
    intro: [L("The Idea", "L’idée"), 'idea'],
    outro: [L("The Result", "Le résultat"), 'result'],
    // Wall-text blocks placed along the project page (a list = several paragraphs).
    story: {
      idea: L("The Matter is a short-film trailer exploring the idea of human life on Mars. The project imagines a future beyond Earth, using cinematic 3D visuals to introduce an unfamiliar environment and evoke the mystery of living on another planet.", "The Matter est la bande-annonce d’un court métrage qui explore l’idée d’une vie humaine sur Mars. Le projet imagine un futur au-delà de la Terre, à travers des images 3D cinématographiques qui présentent un environnement inconnu et évoquent le mystère de vivre sur une autre planète."),
      direction: L("The visual direction leans into a cinematic, atmospheric approach, built around the scale and isolation of the Martian landscape. The goal was to create a believable yet otherworldly environment, balancing scientific inspiration with artistic interpretation to establish a sense of immersion and anticipation.", "La direction visuelle adopte une approche cinématographique et atmosphérique, construite autour de l’immensité et de l’isolement du paysage martien. L’objectif était de créer un environnement crédible mais d’un autre monde, en équilibrant inspiration scientifique et interprétation artistique pour installer un sentiment d’immersion et d’attente."),
      life: L("Through 3D world-building, environmental composition, lighting, and cinematic framing, the project explores how atmosphere can tell a story. Each shot contributes to the feeling of discovering a distant world, setting the tone for a larger narrative about humanity’s future beyond Earth.", "À travers la création d’un monde en 3D, la composition des environnements, l’éclairage et le cadrage cinématographique, le projet explore la manière dont une atmosphère peut raconter une histoire. Chaque plan participe à la sensation de découvrir un monde lointain et donne le ton d’un récit plus vaste sur l’avenir de l’humanité au-delà de la Terre."),
      result: L("A cinematic 3D trailer that uses visual storytelling to explore life on Mars, blending science-fiction world-building with an atmospheric approach to create a glimpse into a possible future.", "Une bande-annonce 3D cinématographique qui utilise la narration visuelle pour explorer la vie sur Mars, mêlant construction d’univers de science-fiction et approche atmosphérique pour offrir un aperçu d’un futur possible."),
    },
    details: [
      [L('Project', 'Projet'), 'The Matter'],
      [L('Discipline', 'Discipline'), L('Short Film', 'Court métrage')],
      [L('Scope', 'Périmètre'), L('Modeling, Texturing, Animation, Lighting, Rendering, Compositing', 'Modélisation, texturing, animation, éclairage, rendu, compositing')],
      [L('Tools', 'Outils'), 'Blender, Cycles, After Effects'],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        text: [L("The Art Direction", "La direction artistique"), 'direction'],
        groups: [{ files: ['cover', 'render 01', 'render 02', 'render 03', 'render 04', 'render 05'], arrange: 'cinema' }],
      },
      { type: 'details', text: [L("Bringing It to Life", "Donner vie au projet"), 'life'] },
    ],
  },
  'once-cherished-now-forsaken': {
    category: L('Short Film', 'Court métrage'),
    // One line under "Services" at the top of the project page.
    summary: L("Every object has a story to tell.", "Chaque objet a une histoire à raconter."),
    intro: [L("The Idea", "L’idée"), 'idea'],
    outro: [L("The Result", "Le résultat"), 'result'],
    // Wall-text blocks placed along the project page (a list = several paragraphs).
    story: {
      idea: L("A personal 3D art project built around one idea: every object has a story to tell. The scene depicts a researcher’s desk, left untouched and forgotten after their mysterious death. Rather than showing the story directly, I wanted to capture a moment frozen in time, leaving traces of a life, a career, and unanswered questions scattered throughout the space.", "Un projet artistique personnel en 3D construit autour d’une idée : chaque objet a une histoire à raconter. La scène représente le bureau d’un chercheur, laissé intact et oublié après sa mort mystérieuse. Plutôt que de raconter l’histoire directement, j’ai voulu saisir un instant figé dans le temps, laissant les traces d’une vie, d’une carrière et de questions sans réponse éparpillées dans l’espace."),
      direction: L("The direction focused on atmosphere, detail, and visual storytelling. The desk became the center of a quiet mystery, with everyday objects and research materials acting as fragments of a larger narrative. The goal was to make the scene feel lived-in yet abandoned, inviting the viewer to look closer and imagine what might have happened.", "La direction s’est concentrée sur l’atmosphère, le détail et la narration visuelle. Le bureau devient le cœur d’un mystère silencieux, où objets du quotidien et documents de recherche sont autant de fragments d’un récit plus vaste. L’objectif était de rendre la scène à la fois habitée et abandonnée, invitant le spectateur à regarder de plus près et à imaginer ce qui a pu se passer."),
      life: L("Through 3D modeling, texturing, lighting, and composition, I explored how small details can carry meaning. Each element contributes to the history of the space, creating a sense of presence despite the absence of its owner. The scene was designed to reward observation, allowing the viewer to piece together their own interpretation.", "À travers la modélisation 3D, le texturing, l’éclairage et la composition, j’ai exploré la façon dont de petits détails peuvent porter du sens. Chaque élément contribue à l’histoire du lieu, créant une impression de présence malgré l’absence de son propriétaire. La scène a été pensée pour récompenser l’observation, laissant chacun reconstituer sa propre interprétation."),
      result: L("A personal exploration of storytelling through 3D art, built around the idea that a scene doesn’t need to explain everything to say something. Sometimes, what has been left behind is more intriguing than what we can see.", "Une exploration personnelle de la narration par l’art 3D, fondée sur l’idée qu’une scène n’a pas besoin de tout expliquer pour dire quelque chose. Parfois, ce qui a été laissé derrière soi est plus intrigant que ce que l’on voit."),
    },
    details: [
      [L('Project', 'Projet'), 'Once Cherished Now Forsaken'],
      [L('Discipline', 'Discipline'), L('Short Film', 'Court métrage')],
      [L('Scope', 'Périmètre'), L('Modeling, Texturing, Animation, Lighting, Rendering, Compositing', 'Modélisation, texturing, animation, éclairage, rendu, compositing')],
      [L('Tools', 'Outils'), 'Blender, Cycles, After Effects'],
    ],
    layout: [
      {
        type: 'frames',
        title: L('Selected Frames', 'Images choisies'),
        text: [L("The Art Direction", "La direction artistique"), 'direction'],
        groups: [{ files: ['3', '4', '5', '6'], arrange: 'cinema' }],
      },
      { type: 'details', text: [L("Bringing It to Life", "Donner vie au projet"), 'life'] },
    ],
  },
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
