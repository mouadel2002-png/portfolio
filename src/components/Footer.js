import { Link } from 'react-router-dom';
import { navLinks, profile, socials } from '../data/site';
import { useLang } from '../i18n';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer__col">
        <p>© {profile.year}</p>
        <p className="muted">{t('allRights')}</p>
      </div>
      <div className="footer__col footer__links">
        {navLinks.map((l) => (
          <Link key={l.to} to={l.to} className="link-hover">
            {t(l.label)}
          </Link>
        ))}
      </div>
      <div className="footer__col footer__links">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-hover">
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
