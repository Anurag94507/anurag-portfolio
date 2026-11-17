import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover (not a touch phone/tablet)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Outer trailing aura */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-neon-cyan/50 pointer-events-none -transtone-x-1/2 -transtone-y-1/2"
        style={{
          x: trailX,
          y: trailY,
          width: isHovered ? 54 : 32,
          height: isHovered ? 54 : 32,
          backgroundColor: isHovered ? 'rgba(255, 122, 69, 0.08)' : 'rgba(255, 122, 69, 0.03)',
          borderColor: isHovered ? '#E7C79A' : '#FF7A45',
          boxShadow: isHovered
            ? '0 0 20px rgba(240, 162, 75, 0.4)'
            : '0 0 10px rgba(255, 122, 69, 0.25)',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        }}
        animate={{
          scale: isClicked ? 0.8 : 1,
        }}
      />

      {/* Center pinpoint */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-neon-cyan pointer-events-none -transtone-x-1/2 -transtone-y-1/2 shadow-[0_0_8px_#FF7A45]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 0 : isClicked ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
