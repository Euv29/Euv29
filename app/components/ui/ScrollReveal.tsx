'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  className?: string;
}

/**
 * ScrollReveal component that animates children when they enter the viewport
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}) => {
  const controls = useAnimation();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Memoize position functions to prevent recreating on every render
  const getInitialPosition = useCallback(() => {
    switch(direction) {
      case 'up': return { y: 50, opacity: 0 };
      case 'down': return { y: -50, opacity: 0 };
      case 'left': return { x: 50, opacity: 0 };
      case 'right': return { x: -50, opacity: 0 };
      case 'none': return { opacity: 0 };
      default: return { y: 50, opacity: 0 };
    }
  }, [direction]);

  const getFinalPosition = useCallback(() => {
    switch(direction) {
      case 'up': 
      case 'down': 
        return { y: 0, opacity: 1 };
      case 'left': 
      case 'right': 
        return { x: 0, opacity: 1 };
      case 'none': 
        return { opacity: 1 };
      default: 
        return { y: 0, opacity: 1 };
    }
  }, [direction]);

  useEffect(() => {
    // Set initial position
    controls.start(getInitialPosition());
    
    // If in view, animate to final position with delay
    if (isInView) {
      const timer = setTimeout(() => {
        controls.start(getFinalPosition());
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
    
    return undefined;
  }, [controls, isInView, getInitialPosition, getFinalPosition, delay]);
  
  return (
    <motion.div
      ref={ref}
      initial={false} // Let useEffect handle the initial animation
      animate={controls}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        duration: 0.6,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default React.memo(ScrollReveal);