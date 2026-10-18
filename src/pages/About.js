import Page from '../components/Page';
import { MaskLine, Reveal, RevealImage } from '../components/Reveal';
import { experiences, profile } from '../data/site';
import './pages.css';

export default function About() {
  return (
    <Page title={`About — ${profile.name}`}>
      <section className="about-hero container">
        <h1 className="display display--sm">
          {profile.aboutHeadline.map((line, i) => (
            <MaskLine key={line} delay={i * 0.12} className={i ? 'display__indent' : ''}>
              {line}
            </MaskLine>
          ))}
        </h1>
      </section>

      <section className="about-intro container">
        <RevealImage src={profile.portrait} alt={profile.name} className="about-intro__img" ratio="303 / 205" />
        <Reveal className="about-intro__text" delay={0.15}>
          <p className="body-text">{profile.aboutText}</p>
        </Reveal>
      </section>

      <section className="experiences container">
        <Reveal>
          <h2 className="section-title">Experiences</h2>
        </Reveal>
        <div className="grid experiences__list">
          {experiences.map((e, i) => (
            <Reveal key={e.year + e.title} className="experience" delay={(i % 3) * 0.08}>
              <h3 className="experience__year">{e.year}</h3>
              <p>{e.title}</p>
              <p className="muted">{e.company}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  );
}
