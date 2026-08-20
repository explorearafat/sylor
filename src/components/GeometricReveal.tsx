import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface GeometricRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distancePx?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  as?: React.ElementType;
  id?: string;
}

export const GeometricReveal: React.FC<GeometricRevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  durationMs = 700,
  direction = 'up',
  distancePx = 24,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true,
  as: Component = 'div',
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold,
    rootMargin,
    triggerOnce,
  });

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distancePx}px, 0)`;
      case 'down':
        return `translate3d(0, -${distancePx}px, 0)`;
      case 'left':
        return `translate3d(${distancePx}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distancePx}px, 0, 0)`;
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${durationMs}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delayMs}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <Component
      ref={ref}
      id={id}
      style={style}
      className={`transition-all ${className}`}
    >
      {children}
    </Component>
  );
};
