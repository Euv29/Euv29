'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { RiArrowDownSLine, RiArrowUpSLine, RiCloseLine, RiPlayFill } from 'react-icons/ri';

const CustomCursor = () => {
  // Use motion values for smoother animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for the outer circle
  const springConfig = { damping: 25, stiffness: 120 };
  const outerX = useSpring(mouseX, springConfig);
  const outerY = useSpring(mouseY, springConfig);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isIdle, setIsIdle] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const lastScrollTop = useRef(0);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const isScrollingTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize cursor after component mounts
  useEffect(() => {
    // Short delay to avoid flashing during page load
    setTimeout(() => setIsVisible(true), 300);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Update motion values for smoother tracking
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Reset idle state on mouse move
      if (isIdle) setIsIdle(false);
      
      // Clear and restart idle timer
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIsIdle(true), 5000);
    };
    
    // Add event listeners with proper cleanup
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Query all interactive elements once and attach event listeners
    const interactiveElements = document.querySelectorAll(
      'a, button, input[type="submit"], [role="button"], .cursor-pointer'
    );
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    // Hide default cursor
    if (typeof document !== 'undefined') {
      document.documentElement.style.cursor = 'none';
    }
    
    // Clean up all event listeners
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      if (typeof document !== 'undefined') {
        document.documentElement.style.cursor = '';
      }
      
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (isScrollingTimer.current) clearTimeout(isScrollingTimer.current);
    };
  }, [isIdle, mouseX, mouseY]); // Fixed dependency array

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  // Handle scroll events
  const handleScroll = () => {
    const currentScrollTop = window.scrollY;
    
    // Determine scroll direction
    if (currentScrollTop > lastScrollTop.current) {
      setScrollDirection('down');
    } else if (currentScrollTop < lastScrollTop.current) {
      setScrollDirection('up');
    }
    
    // Update last scroll position
    lastScrollTop.current = currentScrollTop;
    
    // Set scrolling state
    setIsScrolling(true);
    
    // Clear any existing timer
    if (isScrollingTimer.current) clearTimeout(isScrollingTimer.current);
    
    // Set timer to detect when scrolling stops
    isScrollingTimer.current = setTimeout(() => {
      setIsScrolling(false);
      setScrollDirection(null);
    }, 150);
  };

  // Determine cursor appearance based on context
  const getCursorContent = () => {
    if (isIdle) {
      return <RiPlayFill className="text-white" size={16} />;
    }
    
    if (isScrolling && scrollDirection === 'down') {
      return <RiArrowDownSLine className="text-white" size={16} />;
    }
    
    if (isScrolling && scrollDirection === 'up') {
      return <RiArrowUpSLine className="text-white" size={16} />;
    }
    
    if (isHovering) {
      return <RiCloseLine className="text-white" size={16} />;
    }
    
    return null;
  };

  // Hide on touch devices - cursor isn't useful there
  if (typeof window !== 'undefined' && ('ontouchstart' in window)) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <>
          {/* Larger outer circle with spring physics for smoother movement */}
          <motion.div
            className="hidden z-50 fixed md:flex rounded-full pointer-events-none"
            style={{
              x: outerX,
              y: outerY,
              translateX: '-50%',
              translateY: '-50%',
              width: isHovering ? 75 : 63, // Increased by 15px (from 60/48 to 75/63)
              height: isHovering ? 75 : 63, // Increased by 15px (from 60/48 to 75/63)
              backgroundColor: isHovering ? 'rgba(0, 87, 255, 0.2)' : 'transparent',
              border: '1.5px solid #0057FF', // Always show border with 3px width
            }}
            animate={{
              opacity: isIdle ? 1 : 0.6,
              scale: isIdle ? [1, 1.1, 1] : 1,
            }}
            transition={{
              scale: isIdle ? {
                repeat: Infinity,
                duration: 1.5,
              } : {
                duration: 0.3
              },
              opacity: { duration: 0.3 }
            }}
          />

          {/* Inner dot - directly follows mouse */}
          <motion.div
            className="hidden z-50 fixed md:flex justify-center items-center bg-primary rounded-full pointer-events-none"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{
              width: isHovering || isScrolling || isIdle ? 28 : 18,
              height: isHovering || isScrolling || isIdle ? 28 : 18,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {/* Icon inside dot based on context */}
            <motion.div
              animate={{
                opacity: isHovering || isScrolling || isIdle ? 1 : 0,
                scale: isHovering || isScrolling || isIdle ? 1 : 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              {getCursorContent()}
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default CustomCursor;