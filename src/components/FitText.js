import { useLayoutEffect, useRef } from 'react';

const BASE = 100;

// Scales a single line of text so it exactly fills its container's width.
export default function FitText({ children, className }) {
  const boxRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;

    const fit = () => {
      text.style.fontSize = `${BASE}px`;
      const ratio = box.getBoundingClientRect().width / text.getBoundingClientRect().width;
      text.style.fontSize = `${BASE * ratio}px`;
    };

    fit();
    // Re-fit once the web font arrives; the fallback font has different widths.
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener?.('loadingdone', fit);
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => {
      ro.disconnect();
      document.fonts?.removeEventListener?.('loadingdone', fit);
    };
  }, [children]);

  return (
    <div ref={boxRef} className={`fit-text ${className || ''}`}>
      <span ref={textRef} className="fit-text__inner">
        {children}
      </span>
    </div>
  );
}
