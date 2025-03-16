'use client';

import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';

interface SplineBackgroundProps {
  isDarkMode: boolean;
}

export default function SplineBackground({ isDarkMode }: SplineBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const splineContainerRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle mouse movement for the fallback animation
  useEffect(() => {
    if (!fallbackRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
      
      if (fallbackRef.current) {
        const { x, y } = mousePosition.current;
        fallbackRef.current.style.setProperty('--mouse-x', x.toString());
        fallbackRef.current.style.setProperty('--mouse-y', y.toString());
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Set up Spline background with timeout for fallback
  useEffect(() => {
    if (isMobile) {
      setShowFallback(true);
      return;
    }

    // Set a timeout to show fallback if loading takes too long
    loadingTimeoutRef.current = setTimeout(() => {
      if (!isLoaded) {
        console.log('Spline background loading timeout - showing fallback');
        setShowFallback(true);
      }
    }, 8000); // 8 seconds timeout

    // Create iframe for Spline scene
    const splineContainer = splineContainerRef.current;
    if (splineContainer) {
      // Remove any existing iframe
      while (splineContainer.firstChild) {
        splineContainer.removeChild(splineContainer.firstChild);
      }

      // Create new iframe
      const iframe = document.createElement('iframe');
      iframe.src = 'https://my.spline.design/backgroundhoverinteraction-75e2f19860b0c6ca3fcfd140aaa73b9c/';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.pointerEvents = 'auto';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.id = 'spline-iframe';
      
      // Handle iframe load event
      iframe.onload = () => {
        console.log('Spline iframe loaded successfully');
        setIsLoaded(true);
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
      };

      // Handle iframe error
      iframe.onerror = () => {
        console.error('Error loading Spline iframe');
        setShowFallback(true);
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
      };

      splineContainer.appendChild(iframe);
    }

    return () => {
      // Clean up timeout on unmount
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [isMobile, isDarkMode]);

  // Apply dark/light mode styles to iframe
  useEffect(() => {
    const iframe = document.getElementById('spline-iframe') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      try {
        // Attempt to communicate with iframe to update theme
        // Note: This may not work due to CORS restrictions
        iframe.contentWindow.postMessage(
          { type: 'THEME_CHANGE', isDarkMode }, 
          'https://my.spline.design'
        );
      } catch (error) {
        console.warn('Could not communicate with Spline iframe:', error);
      }
    }
  }, [isDarkMode]);

  return (
    <>
      {/* Spline Background Container */}
      <div 
        ref={splineContainerRef}
        className={`fixed inset-0 w-full h-full z-0 transition-opacity duration-1000 ${
          isLoaded && !showFallback ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Fallback Background */}
      <div 
        ref={fallbackRef}
        className={`fixed inset-0 w-full h-full z-0 transition-opacity duration-1000 ${
          showFallback ? 'opacity-100' : 'opacity-0'
        } ${isDarkMode ? 'bg-gradient-dark' : 'bg-gradient-light'}`}
        style={{
          background: isDarkMode 
            ? 'radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(59, 130, 246, 0.3), rgba(16, 24, 39, 0.8) 50%)'
            : 'radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(59, 130, 246, 0.2), rgba(243, 244, 246, 0.8) 50%)',
          '--mouse-x': '0.5',
          '--mouse-y': '0.5',
        } as React.CSSProperties}
        aria-hidden="true"
      >
        {/* Animated shapes for fallback */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${
                isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/5'
              }`}
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Indicator */}
      {!isLoaded && !showFallback && (
        <div className="fixed inset-0 flex items-center justify-center z-0">
          <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -50px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
} 