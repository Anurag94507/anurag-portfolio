import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees on either axis. */
  maxTilt?: number;
  /** Subtle scale-up while the pointer is inside the card. */
  hoverScale?: number;
  /** Set to false to keep the card flat (e.g. dense content). */
  glare?: boolean;
}

/**
 * Pointer-reactive 3D tilt with spring damping and a moving specular glare.
 * On touch devices and for reduced-motion users it degrades to a static card,
 * so mobile scrolling never fights a transform.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 9,
  hoverScale = 1.012,
  glare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const lift = useMotionValue(0);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setIsInteractive(!motionQuery.matches && pointerQuery.matches);
    sync();
    motionQuery.addEventListener?.('change', sync);
    pointerQuery.addEventListener?.('change', sync);
    return () => {
      motionQuery.removeEventListener?.('change', sync);
      pointerQuery.removeEventListener?.('change', sync);
    };
  }, []);

  const springConfig = { stiffness: 160, damping: 18, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], [maxTilt, -maxTilt]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], [-maxTilt, maxTilt]),
    springConfig
  );
  const scale = useSpring(lift, springConfig);

  const glareX = useTransform(pointerX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(pointerY, [0, 1], ['0%', '100%']);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.06) 38%, transparent 62%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteractive || event.pointerType === 'touch' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointerX.set(Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1));
    pointerY.set(Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1));
  };

  const reset = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
    lift.set(1);
    setIsHovered(false);
  };

  return (
    <div style={{ perspective: '1200px' }} className="w-full h-full">
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={(event) => {
          if (!isInteractive || event.pointerType === 'touch') return;
          setIsHovered(true);
          lift.set(hoverScale);
        }}
        onPointerLeave={reset}
        onBlur={reset}
        style={{
          rotateX: isInteractive ? rotateX : 0,
          rotateY: isInteractive ? rotateY : 0,
          scale: isInteractive ? scale : 1,
          transformStyle: 'preserve-3d',
        }}
        className={`relative overflow-hidden transition-shadow duration-300 h-full ${className}`}
      >
        {glare && isInteractive && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[inherit] z-30 mix-blend-overlay"
            style={{ background: glareBackground, opacity: isHovered ? 1 : 0 }}
            transition={{ opacity: { duration: 0.25 } }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
};
