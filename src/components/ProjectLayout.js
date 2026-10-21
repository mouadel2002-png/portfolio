import { useState } from 'react';
import Exhibit, { PATTERNS, Piece, fitScreen } from './Exhibit';
import Compare from './Compare';
import FilmStrip from './FilmStrip';
import Lightbox from './Lightbox';
import { Reveal } from './Reveal';
import { useMediaQuery } from '../hooks';

// Renders a project page from its `layout` (see the comment above projectInfo in data/site.js).

export function SectionHead({ index, title, subtitle, count }) {
  return (
    <Reveal className="work-section__head">
      <span className="work-section__index">{String(index).padStart(2, '0')} —</span>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="muted">{subtitle}</p>}
      {count !== undefined && <span className="muted work-section__count">[{count}]</span>}
    </Reveal>
  );
}

// A short "wall text" block: small label on the left, paragraph on the right.
export function StoryBlock({ label, text, closing }) {
  if (!text) return null;
  return (
    <Reveal className={`story ${closing ? 'story--closing' : ''}`}>
      <h3 className="story__label muted">{label}</h3>
      <p className="story__text">{text}</p>
    </Reveal>
  );
}

// Label / value rows, e.g. Project — Samsung Charger.
function ProjectDetails({ details }) {
  return (
    <dl className="details">
      {details.map(([label, value], i) => (
        <Reveal key={label} className="details__row" delay={i * 0.06}>
          <dt className="muted">{label}</dt>
          <dd>{value}</dd>
        </Reveal>
      ))}
    </dl>
  );
}

// Each piece in a "stagger" line hangs at its own height (px).
const STAGGER_DROPS = [0, 110, 40, 170];

// Pieces side by side on one line ("row": same size and height; "stagger": varied heights).
// On phones the line becomes a sideways-swipe strip so the pieces stay comparable.
function FrameLine({ images, arrange, perRow, start, title, onOpen }) {
  const wide = useMediaQuery('(min-width: 810px)');
  const size = perRow || images.length;
  const lines = [];
  for (let i = 0; i < images.length; i += size) lines.push(images.slice(i, i + size));

  if (!wide) {
    return (
      <div className="frame-line frame-line--swipe">
        {images.map((img, i) => (
          <Piece key={img.src} img={img} n={start + i} title={title} onOpen={() => onOpen(i)} />
        ))}
      </div>
    );
  }

  return lines.map((line, l) => (
    <div key={l} className={`frame-line frame-line--${arrange} ${line.length < size ? 'is-short' : ''}`}>
      {line.map((img, j) => {
        const i = l * size + j;
        const style =
          arrange === 'stagger'
            ? { width: `${84 / size}%`, marginTop: `${STAGGER_DROPS[(j + l) % STAGGER_DROPS.length]}px` }
            : { maxWidth: fitScreen(img) };
        return <Piece key={img.src} img={img} n={start + i} title={title} style={style} onOpen={() => onOpen(i)} />;
      })}
    </div>
  ));
}

function FramesSection({ section, index, work, start }) {
  const [open, setOpen] = useState(null);
  const groups = section.groups.map((g) => ({ ...g, images: g.files.map((f) => work.files[f]).filter(Boolean) }));
  const all = groups.flatMap((g) => g.images);
  let offset = 0;

  return (
    <section className={`work-section ${section.tone === 'light' ? 'work-section--light' : ''}`}>
      <SectionHead index={index} title={section.title} count={all.length} />
      {section.text && <StoryBlock label={section.text[0]} text={work.story?.[section.text[1]]} />}
      {groups.map((g) => {
        const first = offset;
        offset += g.images.length;
        const openAt = (i) => setOpen(first + i);
        return (
          <div key={g.files.join()} className="frame-group">
            {g.label && (
              <Reveal className="frame-group__head">
                <h3 className="story__label">{g.label}</h3>
                {g.note && <p className="muted">{g.note}</p>}
              </Reveal>
            )}
            {g.arrange === 'pairs' ? (
              <Exhibit images={g.images} title={work.title} pattern={PATTERNS.renders} start={start + first} onOpen={openAt} />
            ) : (
              <FrameLine
                images={g.images}
                arrange={g.arrange}
                perRow={g.perRow}
                start={start + first}
                title={work.title}
                onOpen={openAt}
              />
            )}
          </div>
        );
      })}
      <Lightbox images={all} index={open} onChange={setOpen} onClose={() => setOpen(null)} label={work.title} />
    </section>
  );
}

function CompareSection({ section, index, work }) {
  const pairs = section.pairs
    .map(([final, clay]) => ({ final: work.files[final], clay: work.files[clay] }))
    .filter((p) => p.final && p.clay);
  const single = pairs.length === 1;
  return (
    <section className="work-section">
      <SectionHead
        index={index}
        title={section.title}
        subtitle={`Drag across ${single ? 'the image' : 'each image'} to compare`}
        count={pairs.length}
      />
      {section.text && <StoryBlock label={section.text[0]} text={work.story?.[section.text[1]]} />}
      <div className={`plates ${single ? '' : 'plates--row'}`}>
        {pairs.map((p, i) => (
          <Compare
            key={p.final.src + p.clay.src}
            clay={p.clay}
            final={p.final}
            label={single ? work.title : `${work.title} — ${String(i + 1).padStart(2, '0')}`}
            className="plate"
            style={single ? { '--plate-w': '56%', '--plate-left': '22%', maxWidth: fitScreen(p.final) } : { maxWidth: fitScreen(p.final) }}
          />
        ))}
      </div>
    </section>
  );
}

function DetailsSection({ section, index, work }) {
  const shots = (section.screenshots || []).map((f) => work.files[f]).filter(Boolean);
  return (
    <section className="work-section">
      <SectionHead index={index} title="Project Details" />
      {work.details && <ProjectDetails details={work.details} />}
      {shots.length > 0 && <FilmStrip images={shots} title={work.title} centered />}
    </section>
  );
}

export default function ProjectLayout({ work }) {
  let start = 2; // (01) is the film / cover at the top of the page
  return work.layout.map((section, i) => {
    const props = { section, index: i + 1, work };
    if (section.type === 'frames') {
      const first = start;
      start += section.groups.reduce((n, g) => n + g.files.length, 0);
      return <FramesSection key={i} {...props} start={first} />;
    }
    if (section.type === 'compare') return <CompareSection key={i} {...props} />;
    if (section.type === 'details') return <DetailsSection key={i} {...props} />;
    return null;
  });
}
