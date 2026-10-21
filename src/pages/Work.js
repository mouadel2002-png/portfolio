import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Page from '../components/Page';
import HeroMedia from '../components/HeroMedia';
import Exhibit, { PATTERNS, fitScreen } from '../components/Exhibit';
import Compare from '../components/Compare';
import FilmStrip from '../components/FilmStrip';
import Lightbox from '../components/Lightbox';
import { MaskLine, Reveal } from '../components/Reveal';
import { works } from '../data/site';
import NotFound from './NotFound';
import './pages.css';

function SectionHead({ index, title, subtitle, count }) {
  return (
    <Reveal className="work-section__head">
      <span className="work-section__index">{String(index).padStart(2, '0')} —</span>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="muted">{subtitle}</p>}
      {count !== undefined && <span className="muted work-section__count">[{count}]</span>}
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

// A short "wall text" block: small label on the left, paragraph on the right.
function StoryBlock({ label, text, closing }) {
  if (!text) return null;
  return (
    <Reveal className={`story ${closing ? 'story--closing' : ''}`}>
      <h3 className="story__label muted">{label}</h3>
      <p className="story__text">{text}</p>
    </Reveal>
  );
}

// Projects with clay renders: selected frames, one clay/final compare plate, then the
// project details with the screenshots in a centred strip below.
function ProcessStory({ work }) {
  const { compare, finals = [], behind = [], story = {} } = work;
  const [open, setOpen] = useState(null);
  let index = 0;
  return (
    <>
      {finals.length > 0 && (
        <section className="work-section">
          <SectionHead index={++index} title="Selected Frames" count={finals.length} />
          <StoryBlock label="Creative Direction" text={story.direction} />
          <Exhibit images={finals} title={work.title} pattern={PATTERNS.renders} onOpen={setOpen} />
          <Lightbox images={finals} index={open} onChange={setOpen} onClose={() => setOpen(null)} label={work.title} />
        </section>
      )}
      <section className="work-section">
        <SectionHead index={++index} title="Clay / Final" subtitle="Drag across the image to compare" count={1} />
        <StoryBlock label="Look Development" text={story.lookdev} />
        <div className="plates">
          <Compare
            clay={compare.clay}
            final={compare.final}
            label={work.title}
            className="plate"
            style={{ '--plate-w': '56%', '--plate-left': '22%', maxWidth: fitScreen(compare.final) }}
          />
        </div>
      </section>
      {(work.details || behind.length > 0) && (
        <section className="work-section">
          <SectionHead index={++index} title="Project Details" />
          {work.details && <ProjectDetails details={work.details} />}
          {behind.length > 0 && <FilmStrip images={behind} title={work.title} centered />}
        </section>
      )}
    </>
  );
}

export default function Work() {
  const { slug } = useParams();
  const work = works.find((w) => w.slug === slug);
  if (!work) return <NotFound />;

  const index = works.indexOf(work);
  const next = works[(index + 1) % works.length];

  return (
    <Page title={`${work.title} — Projects`}>
      <section className="work container">
        <div className="work__head">
          <h1 className="work__title">
            <MaskLine>{work.title}</MaskLine>
          </h1>
          {work.client && (
            <Reveal className="work__fact" delay={0.2}>
              <h3 className="label">Client</h3>
              <p className="muted">{work.client}</p>
            </Reveal>
          )}
          {(work.services || work.category) && (
            <Reveal className="work__fact work__fact--wide" delay={0.28}>
              <h3 className="label">Services</h3>
              <p className="muted">{work.services || work.category}</p>
              {work.summary && <p className="work__tagline">{work.summary}</p>}
            </Reveal>
          )}
        </div>

        <div className="work__hero">
          <HeroMedia work={work} />
        </div>
        <Reveal className="work__caption">
          <span className="muted">(01)</span>
          <p className="muted">{work.video ? 'Film' : 'Cover'}</p>
        </Reveal>

        <StoryBlock label="Project Overview" text={work.story?.overview} />

        {work.about && (
          <div className="grid work__about">
            <Reveal className="work__about-title">
              <h2 className="section-title">About the project</h2>
            </Reveal>
            <Reveal className="work__about-text" delay={0.1}>
              <p className="work__lead">{work.about}</p>
            </Reveal>
          </div>
        )}

        {work.compare ? (
          <ProcessStory work={work} />
        ) : (
          <Exhibit images={work.images} title={work.title} />
        )}

        <StoryBlock label="Final Output" text={work.story?.output} closing />

        <Link to={`/works/${next.slug}`} className="next-work">
          <span className="muted">Next project</span>
          <span className="next-work__title">{next.title}</span>
        </Link>
      </section>
    </Page>
  );
}
