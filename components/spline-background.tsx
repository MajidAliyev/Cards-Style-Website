'use client';

import { useEffect, useState } from 'react';
import { Application } from '@splinetool/runtime';

interface SplineBackgroundProps {
  isDarkMode: boolean;
}

export default function SplineBackground({ isDarkMode }: SplineBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Create a canvas element
    const canvas = document.getElementById('spline-background') as HTMLCanvasElement;
    
    if (canvas) {
      // Initialize Spline
      const spline = new Application(canvas);
      
      // Load the Spline scene
      spline.load('https://prod.spline.design/804add7875d6af613dcbdd4060758354/scene.splinecode')
        .then(() => {
          setIsLoaded(true);
          console.log('Spline background loaded successfully');
        })
        .catch(error => {
          console.error('Error loading Spline background:', error);
        });
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas 
        id="spline-background" 
        className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
} 