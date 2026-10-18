import { Link } from 'react-router-dom';
import { Reveal, RevealImage } from './Reveal';

export default function WorkCard({ work }) {
  return (
    <Link to={`/works/${work.slug}`} className="work-card">
      <RevealImage src={work.cover} alt={work.title} className="work-card__image" />
      <Reveal className="work-card__meta" y={16}>
        <h3>{work.title}</h3>
        <h3 className="muted">{work.category}</h3>
        <h3 className="muted">{work.year}</h3>
      </Reveal>
    </Link>
  );
}
