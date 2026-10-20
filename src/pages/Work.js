import { Link, useParams } from 'react-router-dom';
import Page from '../components/Page';
import HeroMedia from '../components/HeroMedia';
import Exhibit, { PATTERNS } from '../components/Exhibit';
import { MaskLine, Reveal } from '../components/Reveal';
import { works } from '../data/site';
import NotFound from './NotFound';
import './pages.css';

// Each named section hangs its images in its own arrangement.
const SECTION_PATTERN = { renders: PATTERNS.renders, process: PATTERNS.process };

function Sections({ sections, title }) {
  let start = 2;
  return sections.map((sec, i) => {
    const first = start;
    start += sec.images.length;
    return (
      <section key={sec.key} className="work-section">
        <Reveal className="work-section__head">
          <span className="work-section__index">{String(i + 1).padStart(2, '0')} —</span>
          <h2 className="section-title">{sec.title}</h2>
          <p className="muted">{sec.subtitle}</p>
          <span className="muted work-section__count">[{sec.images.length}]</span>
        </Reveal>
        <Exhibit
          images={sec.images}
          title={title}
          start={first}
          pattern={SECTION_PATTERN[sec.key] || PATTERNS.wall}
          className={`exhibit--${sec.key}`}
        />
      </section>
    );
  });
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

        {work.sections ? (
          <Sections sections={work.sections} title={work.title} />
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
