'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RiCheckboxBlankCircleLine, RiCloseLine, RiCheckboxBlankLine, RiArrowUpSLine } from 'react-icons/ri';

// Types
type IconType = 'circle' | 'cross' | 'square' | 'triangle';
type IconDirection = 'clockwise' | 'counterclockwise' | 'none';

interface IconProps {
  id: number;
  type: IconType;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  direction: IconDirection;
  speed: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
}

/**
 * CustomBackground creates a dynamic background with floating geometric shapes
 */
const CustomBackground: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [iconArray, setIconArray] = useState<IconProps[]>([]);
  
  // Use refs for animation state that doesn't need to trigger renders
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const iconsRef = useRef<IconProps[]>([]);
  const lastUpdateTimeRef = useRef(0);
  const lastAddTimeRef = useRef(0);
  
  // Generate a new icon with random properties
  const generateIcon = (id: number): IconProps => {
    const types: IconType[] = ['circle', 'cross', 'square', 'triangle'];
    const directions: IconDirection[] = ['clockwise', 'counterclockwise', 'none'];
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    return {
      id,
      type: types[Math.floor(Math.random() * types.length)],
      x: Math.random() * windowWidth,
      y: Math.random() * windowHeight,
      size: Math.random() * 30 + 20,
      opacity: Math.random() * 0.3 + 0.1,
      rotation: Math.random() * 360,
      direction: directions[Math.floor(Math.random() * directions.length)],
      speed: (Math.random() * 0.5 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
      orbitRadius: Math.random() * 100 + 50,
      orbitSpeed: Math.random() * 0.002 + 0.001,
      orbitAngle: Math.random() * Math.PI * 2,
    };
  };
  
  // Initialize icons on mount
  useEffect(() => {
    // Create initial batch of icons
    const initialIcons: IconProps[] = [];
    for (let i = 0; i < 20; i++) {
      initialIcons.push(generateIcon(i));
    }
    
    // Store in both state (for rendering) and ref (for animation updates)
    setIconArray(initialIcons);
    iconsRef.current = initialIcons;
    
    // Show background after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!isVisible) return;
    
    const animate = (timestamp: number) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Only update icons every 30ms for better performance (about 33fps)
      const shouldUpdate = timestamp - lastUpdateTimeRef.current >= 30;
      
      // Add new icon every 3 seconds if less than 50 icons
      const shouldAddIcon = 
        timestamp - lastAddTimeRef.current >= 3000 && 
        iconsRef.current.length < 50;
      
      if (shouldAddIcon) {
        const newIcon = generateIcon(iconsRef.current.length);
        iconsRef.current = [...iconsRef.current, newIcon];
        lastAddTimeRef.current = timestamp;
        
        // Update state for rendering (less frequent)
        setIconArray([...iconsRef.current]);
      }
      
      if (shouldUpdate) {
        lastUpdateTimeRef.current = timestamp;
        
        // Update each icon
        for (const icon of iconsRef.current) {
          // Mouse repulsion
          const dx = mousePositionRef.current.x - icon.x;
          const dy = mousePositionRef.current.y - icon.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only apply repulsion within 150px radius
          let repulsionX = 0;
          let repulsionY = 0;
          
          if (distance < 150 && distance > 0) {
            const repulsionForce = (1 - distance / 150) * 10;
            repulsionX = -(dx / distance) * repulsionForce;
            repulsionY = -(dy / distance) * repulsionForce;
          }
          
          // Update orbit angle
          icon.orbitAngle += icon.orbitSpeed;
          
          // Calculate orbit position
          const orbitX = Math.cos(icon.orbitAngle) * icon.orbitRadius;
          const orbitY = Math.sin(icon.orbitAngle) * icon.orbitRadius;
          
          // Update position
          icon.x += icon.speed + repulsionX + orbitX * 0.01;
          icon.y += icon.speed * 0.5 + repulsionY + orbitY * 0.01;
          
          // Wrap around edges
          if (icon.x < -50) icon.x = windowWidth + 50;
          if (icon.x > windowWidth + 50) icon.x = -50;
          if (icon.y < -50) icon.y = windowHeight + 50;
          if (icon.y > windowHeight + 50) icon.y = -50;
          
          // Update rotation
          if (icon.direction === 'clockwise') {
            icon.rotation += 0.5;
          } else if (icon.direction === 'counterclockwise') {
            icon.rotation -= 0.5;
          }
        }
        
        // Update state for rendering (less frequent)
        setIconArray([...iconsRef.current]);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);
  
  // Render icon based on type
  const renderIcon = (icon: IconProps) => {
    const iconStyle = {
      position: 'absolute' as const,
      left: `${icon.x}px`,
      top: `${icon.y}px`,
      transform: `rotate(${icon.rotation}deg)`,
      opacity: icon.opacity,
      transition: 'opacity 1.5s ease-in',
      pointerEvents: 'none' as const,
    };
    
    switch (icon.type) {
      case 'circle':
        return (
          <RiCheckboxBlankCircleLine 
            key={icon.id} 
            style={iconStyle} 
            size={icon.size} 
            className="fill-transparent stroke-[1.5] stroke-current text-primary"
          />
        );
      case 'cross':
        return (
          <RiCloseLine 
            key={icon.id} 
            style={iconStyle} 
            size={icon.size} 
            className="fill-transparent stroke-[1.5] stroke-current text-primary"
          />
        );
      case 'square':
        return (
          <RiCheckboxBlankLine 
            key={icon.id} 
            style={iconStyle} 
            size={icon.size} 
            className="fill-transparent stroke-[1.5] stroke-current text-primary"
          />
        );
      case 'triangle':
        return (
          <RiArrowUpSLine 
            key={icon.id} 
            style={iconStyle} 
            size={icon.size} 
            className="fill-transparent stroke-[1.5] stroke-current text-primary"
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div 
      className="z-[-1] fixed inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 2s ease-in',
      }}
    >
      {iconArray.map(renderIcon)}
    </div>
  );
};

export default React.memo(CustomBackground);