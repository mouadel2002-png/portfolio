import Page from '../components/Page';
import { MaskLine, Reveal, RevealImage } from '../components/Reveal';
import { playground, profile } from '../data/site';
import './pages.css';

export default function Playground() {
  return (
    <Page title={`Playground — ${profile.name}`}>
      <section className="playground container">
        <h1 className="display playground__title" aria-label="Archive Work">
          <MaskLine>Archive</MaskLine>
          <MaskLine delay={0.12}>Work</MaskLine>
        </h1>
        <div className="playground__list">
          {playground.map((p, i) => (
            <figure key={i} className={`playground__item ${i % 2 === 0 ? 'is-right' : 'is-left'}`}>
              <RevealImage src={p.image} alt={p.title} ratio="626 / 305" />
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
