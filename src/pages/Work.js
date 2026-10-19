import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Page from '../components/Page';
import { MaskLine, Reveal, RevealImage } from '../components/Reveal';
import { works } from '../data/site';
import { DESKTOP, useMediaQuery } from '../hooks';
import NotFound from './NotFound';
import './pages.css';

// Splits images into two columns, always adding to the shorter one, so a
// masonry layout stays balanced. Each image keeps its original number.
function balance(images) {
  const cols = [[], []];
  const heights = [0, 0];
  images.forEach((img, i) => {
    const c = heights[0] <= heights[1] ? 0 : 1;
    cols[c].push({ ...img, n: i + 2 });
    heights[c] += img.h / img.w;
  });
  return cols;
}

function Shot({ img, title }) {
  return (
    <figure className="work__shot">
      <RevealImage src={img.src} alt={`${title} ${img.n}`} ratio={`${img.w} / ${img.h}`} />
      <figcaption className="muted">({img.n})</figcaption>
    </figure>
  );
}

export default function Work() {
  const { slug } = useParams();
  const isDesktop = useMediaQuery(DESKTOP);
  const work = works.find((w) => w.slug === slug);
  const columns = useMemo(() => (work ? balance(work.images) : [[], []]), [work]);

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

        <RevealImage
          src={work.cover.src}
          alt={work.title}
          className="work__cover"
          ratio={`${work.cover.w} / ${work.cover.h}`}
        />
        <Reveal className="work__caption">
          <span className="muted">(1)</span>
          {work.summary && <p className="work__summary">{work.summary}</p>}
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

        {isDesktop ? (
          <div className="work__gallery">
            {columns.map((col, c) => (
              <div key={c} className="work__col">
                {col.map((img) => (
                  <Shot key={img.src} img={img} title={work.title} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="work__gallery">
            {work.images.map((img, i) => (
              <Shot key={img.src} img={{ ...img, n: i + 2 }} title={work.title} />
            ))}
          </div>
        )}

        <Link to={`/works/${next.slug}`} className="next-work">
          <span className="muted">Next project</span>
          <span className="next-work__title">{next.title}</span>
        </Link>
      </section>
    </Page>
  );
}
