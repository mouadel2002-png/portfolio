import { Link } from 'react-router-dom';
import Page from '../components/Page';
import FitText from '../components/FitText';
import { DESKTOP, useMediaQuery } from '../hooks';
import WorkCard from '../components/WorkCard';
import { MaskLine, Reveal, RevealImage } from '../components/Reveal';
import { playground, profile, works } from '../data/site';
import './pages.css';

export default function Home() {
  const isDesktop = useMediaQuery(DESKTOP);

  return (
    <Page title={`${profile.name} Portfolio`}>
      <section className="hero container">
        {/* Showreel loops silently behind the landing block only (between header and divider). */}
        <video
          className="hero__video"
          src="/videos/showreel.mp4"
          poster="/images/showreel-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {isDesktop ? (
          <h1 className="display">
            <MaskLine>
              <FitText>
                {profile.name} <span className="display__mark">©</span> {profile.role}
              </FitText>
            </MaskLine>
          </h1>
        ) : (
          <h1 className="display">
            <MaskLine>
              {profile.name} <span className="display__mark">©</span>
            </MaskLine>
            <MaskLine className="display__indent" delay={0.12}>
              {profile.role}
            </MaskLine>
          </h1>
        )}
        <ul className="hero__services">
          {profile.services.map((s, i) => (
            <Reveal as="li" key={s} y={12} delay={0.5 + i * 0.08}>
              {s}
            </Reveal>
          ))}
        </ul>
      </section>

      <hr className="divider" />

      <section className="works container">
        {/* Sits at the very bottom of the first screen, so reveal as soon as any of it shows. */}
        <Reveal className="grid works__head" delay={0.6} viewport={{ once: true, amount: 'some' }}>
          <h2 className="section-title works__title">Selected Works</h2>
          <span className="muted">[{works.length}]</span>
        </Reveal>
        <div className="works__list">
          {works.map((w) => (
            <WorkCard key={w.slug} work={w} />
          ))}
        </div>
      </section>

      <section className="info container">
        <Reveal className="info__left">
          <h3>{profile.location}</h3>
          <h3 className="muted">© {profile.year}</h3>
        </Reveal>
        <Reveal className="info__right" delay={0.1}>
          <h3 className="muted">INFO</h3>
          <p className="body-text">{profile.intro}</p>
        </Reveal>
      </section>

      <section className="pg-preview container">
        <Reveal className="grid pg-preview__head">
          <Link to="/playground" className="section-title">
            Playground/Archive
          </Link>
          <Link to="/playground" className="link-hover pg-preview__all">
            view all
          </Link>
        </Reveal>
        <div className="pg-preview__list">
          {playground.slice(0, 3).map((p, i) => (
            <Link to="/playground" key={i} className="pg-preview__item">
              <RevealImage src={p.image} alt={p.title} className="img-frame--fill img-frame--contain pg-preview__frame" />
            </Link>
          ))}
        </div>
      </section>
    </Page>
  );
}
