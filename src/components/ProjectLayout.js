import { useState } from 'react';
import Exhibit, { PATTERNS, Piece, fitScreen } from './Exhibit';
import Compare from './Compare';
import Stages from './Stages';
import FilmStrip from './FilmStrip';
import Lightbox from './Lightbox';
import { Reveal } from './Reveal';
import { useMediaQuery } from '../hooks';
import { useLang } from '../i18n';

// Renders a project page from its `layout` (see the comment above projectInfo in data/site.js).

export function SectionHead({ index, title, subtitle, count }) {
  const { tr } = useLang();
  return (
    <Reveal className="work-section__head">
      <span className="work-section__index">{String(index).padStart(2, '0')} —</span>
      <h2 className="section-title">{tr(title)}</h2>
      {subtitle && <p className="muted">{tr(subtitle)}</p>}
      {count !== undefined && <span className="muted work-section__count">[{count}]</span>}
    </Reveal>
  );
}

// A short "wall text" block: small label on the left, paragraph on the right.
export function StoryBlock({ label, text, closing }) {
  const { tr } = useLang();
  if (!text) return null;
  return (
    <Reveal className={`story ${closing ? 'story--closing' : ''}`}>
      <h3 className="story__label muted">{tr(label)}</h3>
      <p className="story__text">{tr(text)}</p>
    </Reveal>
  );
}

// Label / value rows, e.g. Project — Samsung Charger.
function ProjectDetails({ details }) {
  const { tr } = useLang();
  return (
    <dl className="details">
      {details.map(([label, value], i) => (
        <Reveal key={i} className="details__row" delay={i * 0.06}>
          <dt className="muted">{tr(label)}</dt>
          <dd>{tr(value)}</dd>
        </Reveal>
      ))}
    </dl>
  );
}

// Each piece in a "stagger" line hangs at its own height (px).
const STAGGER_DROPS = [0, 110, 40, 170];

// Pieces side by side on one line ("row": same size and height; "stagger": varied heights).
// On phones the line becomes a sideways-swipe strip so the pieces stay comparable.
function FrameLine({ images, arrange, perRow, start, title, onOpen, captions }) {
  const wide = useMediaQuery('(min-width: 810px)');
  const { tr } = useLang();
  const size = perRow || images.length;
  const lines = [];
  for (let i = 0; i < images.length; i += size) lines.push(images.slice(i, i + size));

  if (!wide) {
    return (
      <div className="frame-line frame-line--swipe">
        {images.map((img, i) => (
          <Piece key={img.src} img={img} n={start + i} title={title} caption={tr(captions?.[i])} onOpen={() => onOpen(i)} />
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
        return (
          <Piece key={img.src} img={img} n={start + i} title={title} caption={tr(captions?.[i])} style={style} onOpen={() => onOpen(i)} />
        );
      })}
    </div>
  ));
}

function FramesSection({ section, index, work, start }) {
  const [open, setOpen] = useState(null);
  const { tr } = useLang();
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
                <h3 className="story__label">{tr(g.label)}</h3>
                {g.note && <p className="muted">{tr(g.note)}</p>}
              </Reveal>
            )}
            {g.arrange === 'pairs' || PATTERNS[g.arrange] ? (
              <Exhibit
                images={g.images}
                title={work.title}
                pattern={g.arrange === 'pairs' ? PATTERNS.renders : PATTERNS[g.arrange]}
                start={start + first}
                onOpen={openAt}
              />
            ) : (
              <FrameLine
                images={g.images}
                arrange={g.arrange}
                perRow={g.perRow}
                start={start + first}
                title={work.title}
                captions={g.captions}
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
  const { t } = useLang();
  const pairs = section.pairs
    .map(([final, clay]) => ({ final: work.files[final], clay: work.files[clay] }))
    .filter((p) => p.final && p.clay);
  const single = pairs.length === 1;
  return (
    <section className="work-section">
      <SectionHead
        index={index}
        title={section.title}
        subtitle={t('clickDrag')}
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

// Shot Breakdown: one featured shot as a three-stage frame, the rest as triptychs.
function ShotsSection({ section, index, work }) {
  const [open, setOpen] = useState(null);
  const { t, tr } = useLang();
  const shots = section.shots
    .map((s) => ({ ...s, sketch: work.files[s.sketch], clay: work.files[s.clay], final: work.files[s.final] }))
    .filter((s) => s.sketch && s.final);
  const featured = shots[section.featured ?? -1];
  const rest = shots.filter((s) => s !== featured);
  const stages = (s) => [s.sketch, s.clay, s.final].filter(Boolean);
  const all = rest.flatMap(stages);
  let offset = 0;

  return (
    <section className="work-section">
      <SectionHead index={index} title={section.title} subtitle={t('fromSketch')} count={shots.length} />
      {featured && (
        <div className="plates">
          <Stages
            sketch={featured.sketch}
            clay={featured.clay || featured.final}
            final={featured.final}
            label={tr(featured.label)}
            className="plate plate--wide"
            style={{ maxWidth: fitScreen(featured.final) }}
          />
        </div>
      )}
      <div className="shots">
        <Reveal className="shots__legend muted" aria-hidden="true">
          <div className="shots__legend-cols">
            <span>{t('sketch')}</span>
            <span>{t('clay')}</span>
            <span>{t('final')}</span>
          </div>
        </Reveal>
        {rest.map((s) => {
          const first = offset;
          const imgs = stages(s);
          offset += imgs.length;
          return (
            <div key={s.sketch.src} className="shots__row">
              <Reveal className="shots__label">{tr(s.label)}</Reveal>
              <div className="frame-line frame-line--row shots__frames">
                {imgs.map((img, i) => (
                  <Piece
                    key={img.src}
                    img={img}
                    n={0}
                    title={work.title}
                    caption={<span className="muted">{[t('sketch'), s.clay ? t('clay') : t('final'), t('final')][i]}</span>}
                    onOpen={() => setOpen(first + i)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Lightbox images={all} index={open} onChange={setOpen} onClose={() => setOpen(null)} label={work.title} />
    </section>
  );
}

function DetailsSection({ section, index, work }) {
  const { t } = useLang();
  const shots = (section.screenshots || []).map((f) => work.files[f]).filter(Boolean);
  return (
    <section className="work-section">
      <SectionHead index={index} title={t('projectDetails')} />
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
    if (section.type === 'shots') return <ShotsSection key={i} {...props} />;
    if (section.type === 'details') return <DetailsSection key={i} {...props} />;
    return null;
  });
}
