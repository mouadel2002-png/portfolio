import { MaskLine, Reveal } from './Reveal';
import { profile, socials } from '../data/site';
import { useLang } from '../i18n';

// "Have a project in mind?" block with the email and social links (Home and About).
export default function Contact() {
  const { t } = useLang();
  return (
    <section className="contact container" id="contact">
      <Reveal className="contact__label muted">{t('contact')}</Reveal>
      <h2 className="contact__title">
        <MaskLine>{t('contactLine1')}</MaskLine>
        <MaskLine delay={0.1}>{t('contactLine2')}</MaskLine>
      </h2>
      <Reveal delay={0.2}>
        <a href={`mailto:${profile.email}`} className="contact__email">
          {profile.email}
          <span className="contact__arrow" aria-hidden="true">
            →
          </span>
        </a>
      </Reveal>
      <Reveal delay={0.3} className="contact__socials">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-hover">
            {s.label} ↗
          </a>
        ))}
      </Reveal>
    </section>
  );
}
