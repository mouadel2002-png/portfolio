import { Link, useParams } from 'react-router-dom';
import Page from '../components/Page';
import { MaskLine, Reveal, RevealImage } from '../components/Reveal';
import { works } from '../data/site';
import NotFound from './NotFound';
import './pages.css';

export default function Work() {
  const { slug } = useParams();
  const index = works.findIndex((w) => w.slug === slug);
  if (index === -1) return <NotFound />;

  const work = works[index];
  const next = works[(index + 1) % works.length];

  return (
    <Page title={`${work.title} — Projects`}>
      <section className="work container">
        <h1 className="work__title">
          <MaskLine>{work.title}</MaskLine>
        </h1>

        <Reveal className="work__facts" delay={0.2}>
          <div>
            <h3 className="label">Client</h3>
            <p className="muted">{work.client}</p>
          </div>
          <div>
            <h3 className="label">Services</h3>
            <p className="muted">{work.services}</p>
          </div>
        </Reveal>

        <RevealImage src={work.cover} alt={work.title} className="work__cover" ratio="949 / 586" />
        <Reveal className="work__caption">
          <span className="muted">(1)</span>
          <p className="muted">{work.summary}</p>
        </Reveal>

        <div className="grid work__about">
          <Reveal>
            <h2 className="section-title">About the project</h2>
          </Reveal>
          <Reveal className="work__about-text" delay={0.1}>
            <p className="body-text">{work.about}</p>
          </Reveal>
        </div>

        <div className="work__gallery">
          {work.gallery.map((src, i) => (
            <figure key={src} className="work__shot">
              <RevealImage src={src} alt={`${work.title} ${i + 2}`} />
              <figcaption className={`muted ${i % 2 ? 'is-right' : ''}`}>({i + 2})</figcaption>
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
