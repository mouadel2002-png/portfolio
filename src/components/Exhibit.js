import { RevealImage } from './Reveal';
import { useMediaQuery } from '../hooks';

// Hand-tuned "gallery wall" rows that repeat down the page. Widths and offsets are % of
// the page width; `drop` pushes a piece down (px) so pairs never sit on one line.
// Wide pieces use `wide`, square/portrait pieces use `tall`.
const PATTERN = [
  { items: [{ left: 16, wide: 62, tall: 38 }] },
  { items: [{ left: 0, wide: 44, tall: 30 }, { wide: 36, tall: 26, drop: 180 }] },
  { items: [{ left: 50, wide: 50, tall: 34 }] },
  { items: [{ left: 7, wide: 34, tall: 24, drop: 120 }, { wide: 48, tall: 32 }] },
  { items: [{ left: 0, wide: 70, tall: 42 }] },
  { items: [{ left: 30, wide: 40, tall: 28 }, { wide: 26, tall: 22, drop: 220 }] },
];

const isWide = (img) => img.w / img.h > 1.15;

// Mobile: a single column that still leans left and right.
function mobileStyle(img, i) {
  const wide = isWide(img);
  const width = wide ? (i % 3 === 2 ? 86 : 100) : 76;
  return { width: `${width}%`, marginLeft: i % 2 ? 'auto' : 0 };
}

export default function Exhibit({ images, title }) {
  const isWideScreen = useMediaQuery('(min-width: 810px)');

  if (!isWideScreen) {
    return (
      <div className="exhibit exhibit--stack">
        {images.map((img, i) => (
          <Piece key={img.src} img={img} n={i + 2} title={title} style={mobileStyle(img, i)} />
        ))}
      </div>
    );
  }

  // Deal images into the repeating rows.
  const rows = [];
  for (let i = 0, r = 0; i < images.length; r++) {
    const items = [];
    for (const slot of PATTERN[r % PATTERN.length].items) {
      if (i >= images.length) break;
      items.push({ img: images[i], n: i + 2, slot });
      i += 1;
    }
    rows.push(items);
  }

  return (
    <div className="exhibit">
      {rows.map((items, r) => (
        <div key={r} className={`exhibit__row ${items.length > 1 ? 'is-pair' : ''}`}>
          {items.map(({ img, n, slot }) => (
            <Piece
              key={img.src}
              img={img}
              n={n}
              title={title}
              style={{
                width: `${isWide(img) ? slot.wide : slot.tall}%`,
                marginLeft: slot.left !== undefined ? `${slot.left}%` : undefined,
                marginTop: slot.drop ? `${slot.drop}px` : undefined,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Piece({ img, n, title, style }) {
  return (
    <figure className="exhibit__piece" style={style}>
      <RevealImage src={img.src} alt={`${title} ${n}`} ratio={`${img.w} / ${img.h}`} />
      <figcaption>
        <span className="muted">({String(n).padStart(2, '0')})</span> {title}
      </figcaption>
    </figure>
  );
}
