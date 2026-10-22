import { useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

// Fades + lifts content in when it enters the viewport.
export function Reveal({ children, delay = 0, y = 30, as = 'div', className, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Slides a line of text up from behind a mask.
export function MaskLine({ children, delay = 0, className }) {
  return (
    <span className={`mask-line ${className || ''}`}>
      <motion.span
        className="mask-line__inner"
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Image that fades in once, when it has scrolled into view and finished loading
// (no zoom on reveal, so it never appears to settle twice).
export function RevealImage({ src, alt = '', className, ratio }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.div
      className={`img-frame ${ratio ? 'img-frame--fill' : ''} ${className || ''}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`reveal-img ${loaded ? 'is-loaded' : ''}`}
        onLoad={() => setLoaded(true)}
        ref={(el) => el && el.complete && el.naturalWidth && !loaded && setLoaded(true)}
      />
    </motion.div>
  );
}
