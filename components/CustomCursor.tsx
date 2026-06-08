'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor-hover]') ||
        target.closest('[role="button"]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);

    const tick = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - (isHovering ? 20 : 12)}px, ${posRef.current.y - (isHovering ? 20 : 12)}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isHovering, isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.15s',
          willChange: 'transform',
        }}
      >
        <svg
          width={isHovering ? 40 : 24}
          height={isHovering ? 40 : 24}
          viewBox="0 0 24 24"
          fill={isHovering ? '#D4657A' : '#E8A838'}
          style={{ transition: 'width 0.2s, height 0.2s' }}
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke={isHovering ? '#E89AAA' : '#F5D89A'}
            strokeWidth={1.5}
          />
        </svg>
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          opacity: isVisible ? 0.5 : 0,
          transition: 'opacity 0.15s',
          willChange: 'transform',
        }}
      >
        <div className={`w-2 h-2 rounded-full ${isHovering ? 'bg-coral' : 'bg-amber-light'} blur-[1px]`} />
      </div>
      <style jsx global>{`
        @media (pointer: fine) {
          body, a, button, input, textarea, select, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
