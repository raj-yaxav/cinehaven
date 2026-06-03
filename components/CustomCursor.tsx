'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const dotSpringConfig = { damping: 30, stiffness: 500 };
  const dotXSpring = useSpring(dotX, dotSpringConfig);
  const dotYSpring = useSpring(dotY, dotSpringConfig);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
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

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);
  
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }
  
  return (
    <>
      {/* Main Heart Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.svg
          width={isHovering ? 40 : 24}
          height={isHovering ? 40 : 24}
          viewBox="0 0 24 24"
          fill="none"
          animate={{ 
            scale: isClicking ? 0.8 : 1,
            rotate: isHovering ? [0, -10, 10, 0] : 0
          }}
          transition={{ 
            scale: { duration: 0.15 },
            rotate: { duration: 0.5 }
          }}
        >
          <motion.path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={isHovering ? '#D4657A' : '#E8A838'}
            stroke={isHovering ? '#E89AAA' : '#F5D89A'}
            strokeWidth={1.5}
            animate={{
              fill: isHovering ? '#D4657A' : '#E8A838'
            }}
          />
          {/* Pulse ring on hover */}
          {isHovering && (
            <motion.circle
              cx="12"
              cy="12"
              r="14"
              fill="none"
              stroke="#D4657A"
              strokeWidth="1"
              initial={{ opacity: 0.6, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.svg>
      </motion.div>
      
      {/* Trailing sparkle dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 0.5 : 0,
        }}
      >
        <div className={`w-2 h-2 rounded-full ${isHovering ? 'bg-coral' : 'bg-amber-light'} blur-[1px]`} />
      </motion.div>
      
      {/* Glow effect */}
      {isHovering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 pointer-events-none z-[99997]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <div className="w-16 h-16 rounded-full bg-coral/20 blur-xl" />
        </motion.div>
      )}
      
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