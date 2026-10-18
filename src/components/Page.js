import { useEffect } from 'react';
import { motion } from 'framer-motion';

// Wraps each route: sets the tab title and fades between pages.
export default function Page({ title, children }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.main>
  );
}
