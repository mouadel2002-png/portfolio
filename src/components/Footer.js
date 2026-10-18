import { Link } from 'react-router-dom';
import { navLinks, profile, socials } from '../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__col">
        <p>© {profile.year}</p>
        <p className="muted">All rights reserved</p>
      </div>
      <div className="footer__col footer__links">
        {navLinks.map((l) => (
          <Link key={l.to} to={l.to} className="link-hover">
            {l.label}
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
