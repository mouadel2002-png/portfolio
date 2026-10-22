import { Link, useParams } from 'react-router-dom';
import Page from '../components/Page';
import HeroMedia from '../components/HeroMedia';
import Exhibit from '../components/Exhibit';
import ProjectLayout, { StoryBlock } from '../components/ProjectLayout';
import { MaskLine, Reveal } from '../components/Reveal';
import { works } from '../data/site';
import { useLang } from '../i18n';
import NotFound from './NotFound';
import './pages.css';

export default function Work() {
  const { slug } = useParams();
  const { t, tr } = useLang();
  const work = works.find((w) => w.slug === slug);
  if (!work) return <NotFound />;

  const index = works.indexOf(work);
  const next = works[(index + 1) % works.length];

  return (
    <Page title={`${work.title} — ${t('projects')}`}>
      <section className="work container">
        <div className="work__head">
          <h1 className="work__title">
            <MaskLine>{work.title}</MaskLine>
          </h1>
          {work.client && (
            <Reveal className="work__fact" delay={0.2}>
              <h3 className="label">{t('client')}</h3>
              <p className="muted">{work.client}</p>
            </Reveal>
          )}
          {(work.services || work.category) && (
            <Reveal className="work__fact work__fact--wide" delay={0.28}>
              <h3 className="label">{t('services')}</h3>
              <p className="muted">{tr(work.services) || tr(work.category)}</p>
              {work.summary && <p className="work__tagline">{tr(work.summary)}</p>}
            </Reveal>
          )}
        </div>

        <div className="work__hero">
          <HeroMedia work={work} />
        </div>
        <Reveal className="work__caption">
          <span className="muted">(01)</span>
          <p className="muted">{work.video && work.hero !== 'cover' ? t('film') : t('cover')}</p>
        </Reveal>

        <StoryBlock label={t('projectOverview')} text={work.story?.overview} />

        {work.about && (
          <div className="grid work__about">
            <Reveal className="work__about-title">
              <h2 className="section-title">{t('aboutProject')}</h2>
            </Reveal>
            <Reveal className="work__about-text" delay={0.1}>
              <p className="work__lead">{work.about}</p>
            </Reveal>
          </div>
        )}

        {work.layout ? (
          <ProjectLayout work={work} />
        ) : (
          <Exhibit images={work.images} title={work.title} />
        )}

        <StoryBlock label={t('finalOutput')} text={work.story?.output} closing />

        <Link to={`/works/${next.slug}`} className="next-work">
          <span className="muted">{t('nextProject')}</span>
          <span className="next-work__title">{next.title}</span>
        </Link>
      </section>
    </Page>
  );
}
