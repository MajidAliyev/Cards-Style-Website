'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PortalTransitionProps {
  isOpen: boolean;
  isDarkMode: boolean;
  onAnimationComplete?: () => void;
  children: React.ReactNode;
  originPosition?: { x: number; y: number } | null;
}

export default function PortalTransition({ 
  isOpen, 
  isDarkMode, 
  onAnimationComplete,
  children,
  originPosition = null
}: PortalTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  // State to control content visibility
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setIsMobile(window.innerWidth < 640);
    };
    
    // Set initial dimensions
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Reset content visibility when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay to ensure the exit animation completes
      const timer = setTimeout(() => {
        setShowContent(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  // Animation variants for the zoom effect
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };
  
  // Animation variants for the container
  const containerVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // If we have an origin position, use it for the zoom effect
  const getScaleVariants = () => {
    // For mobile, use a simpler animation
    if (isMobile) {
      return {
        hidden: { 
          scale: 0.9,
          y: 50
        },
        visible: { 
          scale: 1, 
          y: 0,
          transition: { 
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.5
          }
        },
        exit: { 
          scale: 0.9, 
          y: 50,
          opacity: 0,
          transition: { 
            duration: 0.3
          }
        }
      };
    }
    
    // Desktop animation with origin position
    if (originPosition) {
      return {
        hidden: { 
          scale: 0.1, 
          x: originPosition.x - windowDimensions.width / 2,
          y: originPosition.y - windowDimensions.height / 2,
        },
        visible: { 
          scale: 1, 
          x: 0,
          y: 0,
          transition: { 
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.5
          }
        },
        exit: { 
          scale: 0.8, 
          y: -50,
          transition: { 
            duration: 0.3
          }
        }
      };
    }
    
    // Default variants if no origin position (desktop)
    return {
      hidden: { 
        scale: 0.5, 
        y: 100
      },
      visible: { 
        scale: 1, 
        y: 0,
        transition: { 
          type: "spring",
          damping: 25,
          stiffness: 300,
          duration: 0.5
        }
      },
      exit: { 
        scale: 0.8, 
        y: -50,
        transition: { 
          duration: 0.3
        }
      }
    };
  };
  
  const scaleVariants = getScaleVariants();
  
  // Handle animation complete to show content
  const handleAnimationComplete = (definition: string) => {
    if (definition === "visible") {
      setShowContent(true);
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          ref={containerRef} 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8"
        >
          {/* Backdrop with conditional styling based on dark mode */}
          <motion.div 
            className={`absolute inset-0 backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gray-900 bg-opacity-50' 
                : 'bg-gray-100 bg-opacity-50'
            }`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
          />
          
          {/* Outer container with opacity animation */}
          <motion.div
            className="relative z-10"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            style={{
              width: isMobile ? '100%' : 'min(95vw, 1200px)',
              height: isMobile ? 'min(95vh, 800px)' : 'min(90vh, 800px)',
              maxWidth: '1200px',
              maxHeight: isMobile ? '95vh' : '90vh'
            }}
          >
            {/* Middle container with scale animation */}
            <motion.div
              className="w-full h-full"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={scaleVariants}
              onAnimationComplete={handleAnimationComplete}
              style={{
                transformOrigin: 'center'
              }}
            >
              {/* Content container */}
              <div className="w-full h-full overflow-hidden rounded-2xl">
                {/* Placeholder or actual content */}
                {showContent ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full overflow-auto"
                  >
                    {children}
                  </motion.div>
                ) : (
                  <div 
                    className={`w-full h-full rounded-2xl ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
                    style={{ 
                      boxShadow: isDarkMode 
                        ? '0 0 30px 10px rgba(59, 130, 246, 0.3)' 
                        : '0 0 30px 10px rgba(168, 85, 247, 0.2)'
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 