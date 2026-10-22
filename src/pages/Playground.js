import Page from '../components/Page';
import FitText from '../components/FitText';
import { MaskLine, Reveal, RevealImage } from '../components/Reveal';
import { playground, profile } from '../data/site';
import { DESKTOP, useMediaQuery } from '../hooks';
import { useLang } from '../i18n';
import './pages.css';

export default function Playground() {
  const isDesktop = useMediaQuery(DESKTOP);
  const { t } = useLang();

  return (
    <Page title={`Playground — ${profile.name}`}>
      <section className="playground container">
        <h1 className="display playground__title" aria-label={t('archiveWork')}>
          {isDesktop ? (
            <MaskLine>
              <FitText>{t('archiveWork')}</FitText>
            </MaskLine>
          ) : (
            <>
              <MaskLine>{t('archive')}</MaskLine>
              {t('work') !== t('archive') && <MaskLine delay={0.12}>{t('work')}</MaskLine>}
            </>
          )}
        </h1>
        <div className="playground__list">
          {playground.map((p, i) => (
            <figure key={i} className={`playground__item is-${p.side || (i % 2 ? 'left' : 'right')}`}>
              <RevealImage
                src={p.image}
                alt={p.title}
                className="img-frame--fill img-frame--contain playground__frame"
              />
              <Reveal as="figcaption" className="muted" y={10}>
                {p.title}
              </Reveal>
            </figure>
          ))}
        </div>
      </section>
    </Page>
  );
}
