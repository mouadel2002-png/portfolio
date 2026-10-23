import clients from '../data/clients.json';
import { useLang } from '../i18n';

// Every logo gets roughly the same visual weight: equal area, so wide wordmarks and
// compact marks read at a similar size (in px², scaled down on phones by CSS).
const AREA = 5200;
const size = (c) => {
  const h = Math.round(Math.sqrt(AREA / (c.w / c.h)));
  return { height: h, width: Math.round(h * (c.w / c.h)) };
};

// Client logos scrolling in a continuous loop on a white band (pauses on hover).
// The list is rendered twice so the loop joins seamlessly.
export default function Clients() {
  const { t } = useLang();
  if (!clients.length) return null;
  return (
    <section className="clients" aria-label={t('clients')}>
      <p className="clients__label">{t('clients')}</p>
      <div className="clients__viewport">
        <ul className="clients__track">
          {[...clients, ...clients].map((c, i) => (
            <li key={i} className="clients__item" aria-hidden={i >= clients.length}>
              <img src={c.src} alt={i < clients.length ? c.name : ''} style={size(c)} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
