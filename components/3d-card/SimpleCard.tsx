'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './index.css';

interface SimpleCardProps {
  className?: string;
  title?: string;
  description?: string;
}

export default function SimpleCard({ 
  className = '', 
  title = 'Interactive 3D Card', 
  description = 'Move your cursor over the card to interact with it'
}: SimpleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isDragging) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position relative to card center
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15; // Max 15 degrees
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 15; // Max 15 degrees
    
    setRotation({ x: rotateX, y: rotateY });
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPosition({ 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    });
  };

  // Handle mouse move for dragging
  const handleDragMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y
      });
    }
  };

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
    } else {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isHovered ? 'grab' : 'auto';
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [isDragging, isHovered]);

  return (
    <div className={`responsive-wrapper ${className}`}>
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          ref={cardRef}
          className="w-64 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-xl cursor-grab active:cursor-grabbing"
          style={{
            x: position.x,
            y: position.y,
            rotateX: rotation.x,
            rotateY: rotation.y,
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
            boxShadow: isHovered 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px 2px rgba(79, 70, 229, 0.4)' 
              : '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out, box-shadow 0.3s ease-out'
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setRotation({ x: 0, y: 0 });
          }}
          onMouseDown={handleMouseDown}
          whileTap={{ scale: 0.98 }}
        >
          <div 
            className="absolute inset-0 rounded-xl"
            style={{ 
              backgroundImage: 'url(/assets/bandd.png)', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.7,
              transform: 'translateZ(2px)'
            }}
          />
          
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white"
            style={{ transform: 'translateZ(20px)' }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm flex items-center justify-center">
              <span className="text-3xl">🎴</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Interactive Card</h3>
            <p className="text-sm text-center opacity-80">Drag me around or hover to see the 3D effect</p>
          </div>
        </motion.div>
      </div>
      
      {(title || description) && (
        <motion.div 
          className="absolute bottom-4 left-4 right-4 z-20 bg-black/70 backdrop-blur-sm p-4 rounded-lg text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          {description && <p className="text-sm text-gray-300">{description}</p>}
        </motion.div>
      )}
    </div>
  );
} 