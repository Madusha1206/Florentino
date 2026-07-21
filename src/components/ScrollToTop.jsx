import { useEffect, useLayoutEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 500);

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('.site-footer');
    if (!footer) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo(0, 0);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const shouldShow = isVisible && !isFooterVisible;

  return (
    <button
      type="button"
      className={`back-to-top${shouldShow ? ' back-to-top--visible' : ''}`}
      onClick={handleScrollToTop}
      aria-label="Back to top"
      title="Back to top"
      aria-hidden={!shouldShow}
      tabIndex={shouldShow ? 0 : -1}
    >
      <span className="back-to-top__text" aria-hidden="true">
        <span>Back</span>
        <span>to</span>
        <span>top</span>
      </span>
      <span className="back-to-top__clone" aria-hidden="true">
        <span>Back</span>
        <span>to</span>
        <span>top</span>
      </span>
      <ChevronUp className="back-to-top__icon" aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
