import { RevealImage } from './Reveal';
import { useMediaQuery } from '../hooks';

// Hand-tuned "gallery wall" rows that repeat down the page. Widths and offsets are % of
// the page width; `drop` pushes a piece down (px) so neighbours never sit on one line.
// Wide pieces use `wide`, square/portrait pieces use `tall`. Rows with several pieces
// spread them across the full width.
export const PATTERNS = {
  // Default wall for a project's loose images.
  wall: [
    { items: [{ left: 16, wide: 62, tall: 38 }] },
    { items: [{ left: 0, wide: 44, tall: 30 }, { wide: 36, tall: 26, drop: 120 }] },
    { items: [{ left: 50, wide: 50, tall: 34 }] },
    { items: [{ left: 7, wide: 34, tall: 24, drop: 80 }, { wide: 48, tall: 32 }] },
    { items: [{ left: 0, wide: 70, tall: 42 }] },
    { items: [{ left: 30, wide: 40, tall: 28 }, { wide: 26, tall: 22, drop: 140 }] },
  ],
  // Final renders: all the same size, a loose two-column grid whose right column hangs lower
  // and whose rows shift sideways, so it never reads as a strict grid.
  renders: [
    { items: [{ left: 6, wide: 40, tall: 40 }, { wide: 40, tall: 40, drop: 96 }] },
    { items: [{ left: 14, wide: 40, tall: 40 }, { wide: 40, tall: 40, drop: 96 }] },
  ],
  // Wide film stills: big single frames alternating sides, with offset pairs between them.
  cinema: [
    { items: [{ left: 0, wide: 74, tall: 44 }] },
    { items: [{ left: 8, wide: 46, tall: 30 }, { wide: 40, tall: 26, drop: 120 }] },
    { items: [{ left: 26, wide: 74, tall: 44 }] },
    { items: [{ left: 0, wide: 40, tall: 26, drop: 80 }, { wide: 52, tall: 32 }] },
  ],
  // Wide renders with small loose pieces tucked into the empty side of each row
  // (files go render, piece, piece, render, …). `bare` pieces have no caption.
  mix: [
    { items: [{ left: 0, wide: 66, tall: 12 }, { wide: 12, tall: 12, drop: 200, bare: true }] },
    { items: [{ left: 5, wide: 14, tall: 14, drop: 40, bare: true }, { wide: 62, tall: 14 }] },
    { items: [{ left: 10, wide: 58, tall: 11 }, { wide: 11, tall: 11, drop: 280, bare: true }] },
    { items: [{ left: 0, wide: 14, tall: 14, drop: 140, bare: true }, { wide: 66, tall: 14 }] },
    { items: [{ left: 0, wide: 64, tall: 12 }, { wide: 12, tall: 12, drop: 60, bare: true }] },
    { items: [{ left: 18, wide: 14, tall: 14, drop: 220, bare: true }, { wide: 58, tall: 14 }] },
  ],
};

// Never taller than the screen (minus header and caption), so a piece is seen whole.
export const fitScreen = (img) => `calc((100vh - 170px) * ${(img.w / img.h).toFixed(4)})`;

const isWide = (img) => img.w / img.h > 1.15;

// Mobile: a single column that still leans left and right.
function mobileStyle(img, i) {
  const wide = isWide(img);
  const width = wide ? (i % 3 === 2 ? 86 : 100) : 76;
  return { width: `${width}%`, marginLeft: i % 2 ? 'auto' : 0 };
}

// Pass `onOpen` to make pieces clickable (called with the image's index in `images`).
// `offset` starts the pattern at a later row, so consecutive groups don't repeat one another.
export default function Exhibit({ images, title, pattern = PATTERNS.wall, start = 2, className = '', onOpen, offset = 0 }) {
  const isWideScreen = useMediaQuery('(min-width: 810px)');

  if (!isWideScreen) {
    return (
      <div className={`exhibit exhibit--stack ${className}`}>
        {images.map((img, i) => (
          <Piece key={img.src} img={img} n={start + i} title={title} style={mobileStyle(img, i)} onOpen={onOpen && (() => onOpen(i))} />
        ))}
      </div>
    );
  }

  // Deal images into the repeating rows.
  const rows = [];
  for (let i = 0, r = 0; i < images.length; r++) {
    const items = [];
    for (const slot of pattern[(r + offset) % pattern.length].items) {
      if (i >= images.length) break;
      items.push({ img: images[i], n: start + i, slot });
      i += 1;
    }
    rows.push(items);
  }

  return (
    <div className={`exhibit ${className}`}>
      {rows.map((items, r) => (
        <div key={r} className={`exhibit__row ${items.length > 1 ? 'is-pair' : ''}`}>
          {items.map(({ img, n, slot }) => (
            <Piece
              key={img.src}
              img={img}
              n={n}
              title={title}
              bare={slot.bare}
              onOpen={onOpen && (() => onOpen(n - start))}
              style={{
                width: `${isWide(img) ? slot.wide : slot.tall}%`,
                maxWidth: fitScreen(img),
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

export function Piece({ img, n, title, style, onOpen, caption, bare }) {
  const clickable = onOpen
    ? {
        role: 'button',
        tabIndex: 0,
        'aria-label': `View ${title} ${n} full screen`,
        onClick: onOpen,
        onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen()),
      }
    : {};
  return (
    <figure className={`exhibit__piece ${onOpen ? 'is-clickable' : ''}`} style={style} {...clickable}>
      <RevealImage src={img.src} alt={`${title} ${n}`} ratio={`${img.w} / ${img.h}`} />
      {!bare && (
      <figcaption>
        {caption ? (
          caption
        ) : (
          <>
            <span className="muted">({String(n).padStart(2, '0')})</span> {title}
          </>
        )}
      </figcaption>
      )}
    </figure>
  );
}
