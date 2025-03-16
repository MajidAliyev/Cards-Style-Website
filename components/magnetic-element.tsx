"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How strong the magnetic effect is (1-10)
  distance?: number; // How far away the effect starts working (in pixels)
  scale?: number; // How much the element scales on hover (1.0 = no scale)
  onClick?: React.MouseEventHandler<Element> | (() => void);
}

export default function MagneticElement({
  children,
  className = "",
  strength = 5,
  distance = 100,
  scale = 1.05,
  onClick
}: MagneticElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to center of element
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distanceFromCenter = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Only apply the effect if the mouse is within the specified distance
      if (distanceFromCenter < distance) {
        // Calculate the magnetic pull (stronger when closer)
        const pull = 1 - distanceFromCenter / distance;
        const moveX = distanceX * pull * (strength / 10);
        const moveY = distanceY * pull * (strength / 10);
        
        setPosition({ x: moveX, y: moveY });
        setIsHovered(true);
      } else if (isHovered) {
        // Reset position when mouse moves away
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      // Smoothly animate back to original position
      setPosition({ x: 0, y: 0 });
      setIsHovered(false);
    };

    // Add event listeners to document to track mouse movement
    document.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (element) {
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [distance, strength, isHovered]);

  // Handle click events with the appropriate type
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      if (typeof onClick === 'function' && onClick.length === 0) {
        // It's a function with no parameters
        (onClick as () => void)();
      } else {
        // It's a function expecting an event
        // Use type assertion to handle the event type mismatch
        (onClick as Function)(e);
      }
    }
  };

  return (
    <motion.div
      ref={elementRef}
      className={className}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      onClick={handleClick}
    >
      {children}
    </motion.div>
  );
} 