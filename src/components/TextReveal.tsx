import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delayMs?: number;
  wordStaggerMs?: number;
  id?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  as: Component = 'p',
  delayMs = 0,
  wordStaggerMs = 25,
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px',
    triggerOnce: true,
  });

  const words = text.split(' ');

  return (
    <Component id={id} ref={ref as any} className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden mr-[0.25em] align-top last:mr-0"
        >
          <span
            className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(0, 40%, 0)',
              transitionDelay: `${delayMs + index * wordStaggerMs}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
  delayMs?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerMs = 80,
  delayMs = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        return (
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(0, 20px, 0)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '650ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${delayMs + index * staggerMs}ms`,
              willChange: 'opacity, transform',
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};
