import { Link, useParams } from 'react-router-dom';
import Page from '../components/Page';
import HeroMedia from '../components/HeroMedia';
import Exhibit from '../components/Exhibit';
import Compare from '../components/Compare';
import FilmStrip from '../components/FilmStrip';
import { MaskLine, Reveal } from '../components/Reveal';
import { works } from '../data/site';
import NotFound from './NotFound';
import './pages.css';

// Clay/final plates hang at alternating sizes and offsets (% of the page width).
const PLATE_LAYOUT = [
  { width: 56, left: 0 },
  { width: 42, left: 58 },
  { width: 50, left: 22 },
  { width: 40, left: 4 },
];

function SectionHead({ index, title, subtitle, count }) {
  return (
    <Reveal className="work-section__head">
      <span className="work-section__index">{String(index).padStart(2, '0')} —</span>
      <h2 className="section-title">{title}</h2>
      <p className="muted">{subtitle}</p>
      <span className="muted work-section__count">[{count}]</span>
    </Reveal>
  );
}

function Plates({ work }) {
  const { plates, behind = [] } = work;
  return (
    <>
      <section className="work-section">
        <SectionHead index={1} title="Clay / Final" subtitle="Drag across each plate to compare" count={plates.length} />
        <div className="plates">
          {plates.map((pl, i) => {
            const at = PLATE_LAYOUT[i % PLATE_LAYOUT.length];
            return (
              <Compare
                key={pl.final.src}
                clay={pl.clay}
                final={pl.final}
                label={`Plate ${String(i + 1).padStart(2, '0')}`}
                className="plate"
                style={{ '--plate-w': `${at.width}%`, '--plate-left': `${at.left}%` }}
              />
            );
          })}
        </div>
      </section>
      {behind.length > 0 && (
        <section className="work-section">
          <SectionHead index={2} title="Behind the Scenes" subtitle="Viewport & render setup" count={behind.length} />
          <FilmStrip images={behind} title={work.title} />
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
            </Reveal>
          )}
        </div>

        <div className="work__hero">
          <HeroMedia work={work} />
        </div>
        <Reveal className="work__caption">
          <span className="muted">(01)</span>
          {work.summary ? (
            <p className="work__summary">{work.summary}</p>
          ) : (
            <p className="muted">{work.video ? 'Film' : 'Cover'}</p>
          )}
        </Reveal>

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

        {work.plates ? (
          <Plates work={work} />
        ) : (
          <Exhibit images={work.images} title={work.title} />
        )}

        <Link to={`/works/${next.slug}`} className="next-work">
          <span className="muted">Next project</span>
          <span className="next-work__title">{next.title}</span>
        </Link>
      </section>
    </Page>
  );
}
