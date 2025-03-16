'use client';

import { motion } from 'framer-motion';

interface FallbackCardProps {
  className?: string;
  error?: string | null;
}

export default function FallbackCard({ className = '', error = null }: FallbackCardProps) {
  return (
    <div className={`responsive-wrapper flex items-center justify-center ${className}`}>
      <motion.div 
        className="bg-black/80 backdrop-blur-sm p-6 rounded-xl text-white max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-32 h-44 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-4"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
        />
        
        <h3 className="text-xl font-bold text-center mb-2">Interactive 3D Card</h3>
        <p className="text-gray-300 text-center text-sm">
          {error || "Grab and drag the card to interact with it. The physics simulation creates a realistic swinging effect."}
        </p>
        
        <div className="mt-4 text-xs text-gray-400 text-center">
          <p>For the best experience, please ensure the 3D assets are properly loaded.</p>
        </div>
      </motion.div>
    </div>
  );
} 