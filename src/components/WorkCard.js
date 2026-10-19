import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

const ease = [0.22, 1, 0.36, 1];

export default function WorkCard({ work }) {
  const { cover } = work;
  return (
    <Link to={`/works/${work.slug}`} className="work-card">
      {/* Every card shares one frame ratio; the cover is shown whole (never cropped)
          over a blurred copy of itself that fills any leftover space. */}
      <motion.div
        className="img-frame work-card__image"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1, ease }}
      >
        <img className="work-card__backdrop" src={cover.src} alt="" aria-hidden="true" loading="lazy" />
        <img
          className="work-card__cover"
          src={cover.src}
          width={cover.w}
          height={cover.h}
          alt={work.title}
          loading="lazy"
        />
      </motion.div>
      <Reveal className="work-card__meta" y={16}>
        <h3>{work.title}</h3>
        {work.category && <h3 className="muted">{work.category}</h3>}
        {work.year && <h3 className="muted">{work.year}</h3>}
      </Reveal>
    </Link>
  );
}
