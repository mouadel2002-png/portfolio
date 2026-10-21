import { useRef } from 'react';
import { Reveal } from './Reveal';

// A sideways-scrolling strip of small frames (behind-the-scenes screenshots).
// Scrolls with a trackpad/shift+wheel, swipe on touch, or click-and-drag with a mouse.
export default function FilmStrip({ images, title, start = 1, centered = false }) {
  const ref = useRef(null);
  const drag = useRef(null);

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft };
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    ref.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const end = () => {
    drag.current = null;
  };

  return (
    <Reveal>
      <div
        ref={ref}
        className={`filmstrip ${centered ? 'filmstrip--centered' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerLeave={end}
      >
        {images.map((img, i) => (
          <figure key={img.src} className="filmstrip__frame">
            <img
              src={img.src}
              alt={`${title} behind the scenes ${i + 1}`}
              style={{ aspectRatio: `${img.w} / ${img.h}` }}
              loading="lazy"
              draggable="false"
            />
            <figcaption className="muted">({String(start + i).padStart(2, '0')})</figcaption>
          </figure>
        ))}
      </div>
    </Reveal>
  );
}
