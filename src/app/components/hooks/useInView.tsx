import { useEffect, useRef, useState } from 'react';

export function useInView(options = { threshold: 0.1, triggerOnce: false }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      } else if (!options.triggerOnce) {
        setIsInView(false);
      }
    }, {
      threshold: options.threshold,
      rootMargin: '0px 0px -100px 0px', // Trigger earlier for better scroll experience
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isInView };
}
