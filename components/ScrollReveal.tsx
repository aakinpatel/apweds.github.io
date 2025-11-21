import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-right' | 'slide-left' | 'zoom-in';
  delay?: number; // ms
  duration?: number; // ms
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 1000,
  threshold = 0.15
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold, rootMargin: '0px 0px -50px 0px' });

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [threshold]);

  const getInitialStyle = () => {
    switch(animation) {
      case 'fade-up': return 'translate-y-16 opacity-0';
      case 'slide-right': return '-translate-x-16 opacity-0';
      case 'slide-left': return 'translate-x-16 opacity-0';
      case 'zoom-in': return 'scale-95 opacity-0';
      case 'fade-in': default: return 'opacity-0';
    }
  };

  const getFinalStyle = () => {
    switch(animation) {
      case 'zoom-in': return 'scale-100 opacity-100';
      default: return 'translate-x-0 translate-y-0 opacity-100';
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all ease-out will-change-transform ${className} ${isVisible ? getFinalStyle() : getInitialStyle()}`}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
