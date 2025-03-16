'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import FallbackCard from './FallbackCard';
import SimpleCard from './SimpleCard';

// Dynamically import the ThreeDCard component to avoid SSR issues
// const ThreeDCard = dynamic(() => import('./ThreeDCard').then(mod => mod.default), {
//   ssr: false,
//   loading: () => <FallbackCard error="Loading 3D card..." />
// });

interface CardWrapperProps {
  className?: string;
  title?: string;
  description?: string;
}

export default function CardWrapper({ 
  className = '', 
  title = 'Interactive 3D Card', 
  description = 'Grab and drag the card to interact with it'
}: CardWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Only render the 3D card on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <FallbackCard error="Initializing 3D environment..." />;
  }

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10">
        <SimpleCard title={title} description={description} />
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
    </motion.div>
  );
} 