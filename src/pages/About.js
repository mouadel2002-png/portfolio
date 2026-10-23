import Page from '../components/Page';
import FitText from '../components/FitText';
import Contact from '../components/Contact';
import { MaskLine, Reveal, RevealImage } from '../components/Reveal';
import { experiences, profile } from '../data/site';
import { useLang } from '../i18n';
import { DESKTOP, useMediaQuery } from '../hooks';
import './pages.css';

export default function About() {
  const isDesktop = useMediaQuery(DESKTOP);
  const { t, tr } = useLang();
  const headline = profile.aboutHeadline.map(tr);

  return (
    <Page title={`About — ${profile.name}`}>
      <section className="about-hero container">
        {isDesktop ? (
          <h1 className="display">
            <MaskLine>
              <FitText>{headline.join(' ')}</FitText>
            </MaskLine>
          </h1>
        ) : (
          <h1 className="display display--sm">
            {headline.map((line, i) => (
              <MaskLine key={line} delay={i * 0.12} className={i ? 'display__indent' : ''}>
                {line}
              </MaskLine>
            ))}
          </h1>
        )}
      </section>

      <section className="about-intro container">
        <RevealImage
          src={profile.portrait.src}
          alt={profile.name}
          className="about-intro__img"
          ratio={`${profile.portrait.w} / ${profile.portrait.h}`}
        />
        <Reveal className="about-intro__text" delay={0.15}>
          {profile.aboutText.map((para) => (
            <p key={para.en.slice(0, 20)} className="body-text">
              {tr(para)}
            </p>
          ))}
        </Reveal>
      </section>

      <section className="experiences container">
        <Reveal className="experiences__title">
          <h2 className="section-title">{t('experience')}</h2>
        </Reveal>
        <div className="grid experiences__list">
          {experiences.map((e, i) => (
            <Reveal key={e.year + tr(e.title)} className="experience" delay={(i % 4) * 0.08}>
              <h3 className="experience__year">{e.year}</h3>
              <p>{tr(e.title)}</p>
              <p className="muted">{tr(e.company)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Contact />
    </Page>
  );
}
