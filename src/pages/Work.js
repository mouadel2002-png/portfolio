import { Link, useParams } from 'react-router-dom';
import Page from '../components/Page';
import { MaskLine, Reveal, RevealImage } from '../components/Reveal';
import { works } from '../data/site';
import NotFound from './NotFound';
import './pages.css';

// Desktop layout for gallery shots: the first two sit alone on alternating
// sides with the caption beside them, the rest pair up two per row.
function shotLayout(i) {
  if (i === 0) return 'solo-left';
  if (i === 1) return 'solo-right';
  return 'pair';
}

export default function Work() {
  const { slug } = useParams();
  const index = works.findIndex((w) => w.slug === slug);
  if (index === -1) return <NotFound />;

  const work = works[index];
  const next = works[(index + 1) % works.length];
  const [lead, ...shots] = work.gallery;

  return (
    <Page title={`${work.title} — Projects`}>
      <section className="work container">
        <div className="work__head">
          <h1 className="work__title">
            <MaskLine>{work.title}</MaskLine>
          </h1>
          <Reveal className="work__fact" delay={0.2}>
            <h3 className="label">Client</h3>
            <p className="muted">{work.client}</p>
          </Reveal>
          <Reveal className="work__fact work__fact--wide" delay={0.28}>
            <h3 className="label">Services</h3>
            <p className="muted">{work.services}</p>
          </Reveal>
        </div>

        <div className="work__cover">
          <RevealImage src={work.cover} alt={work.title} className="work__cover-img" />
          {lead && <RevealImage src={lead} alt={`${work.title} detail`} className="work__cover-img" />}
        </div>
        <Reveal className="work__caption">
          <span className="muted">(1)</span>
          <p className="work__summary">{work.summary}</p>
        </Reveal>

        <div className="grid work__about">
          <Reveal className="work__about-title">
            <h2 className="section-title">About the project</h2>
          </Reveal>
          <Reveal className="work__about-text" delay={0.1}>
            <p className="work__lead">{work.about}</p>
          </Reveal>
        </div>

        <div className="work__gallery">
          {shots.map((src, i) => (
            <figure key={src + i} className={`work__shot work__shot--${shotLayout(i)}`}>
              <RevealImage src={src} alt={`${work.title} ${i + 2}`} />
              <figcaption className="muted">({i + 2})</figcaption>
            </figure>
          ))}
        </div>

        <Link to={`/works/${next.slug}`} className="next-work">
          <span className="muted">Next project</span>
          <span className="next-work__title">{next.title}</span>
        </Link>
      </section>
    </Page>
  );
}
