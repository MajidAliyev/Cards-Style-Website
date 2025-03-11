'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface PortalTransitionProps {
  isOpen: boolean;
  isDarkMode: boolean;
  onAnimationComplete?: () => void;
  children: React.ReactNode;
}

export default function PortalTransition({ 
  isOpen, 
  isDarkMode, 
  onAnimationComplete,
  children 
}: PortalTransitionProps) {
  const [portalComplete, setPortalComplete] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'entering' | 'active' | 'exiting'>(isOpen ? 'entering' : 'exiting');
  const [distortionPoints, setDistortionPoints] = useState<Array<{x: number, y: number, angle: number, speed: number}>>([]);
  const portalRingControls = useAnimation();
  const portalGlowControls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate random distortion points for non-Euclidean effect
  useEffect(() => {
    const points = Array.from({ length: 16 }, () => ({
      x: Math.random(),
      y: Math.random(),
      angle: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.8
    }));
    setDistortionPoints(points);
  }, []);
  
  // Handle animation phases
  useEffect(() => {
    if (isOpen) {
      setAnimationPhase('entering');
      
      // Sequence of animations for entering
      portalRingControls.start({
        opacity: [0, 0.8, 0.6],
        scale: [0, 1.3, 1],
        rotate: [0, 360],
        transition: { 
          duration: 1.5,
          ease: [0.19, 1.0, 0.22, 1.0]
        }
      });
      
      portalGlowControls.start({
        opacity: [0, 0.8, 0.5],
        scale: [0, 1.5, 1.2],
        transition: { 
          duration: 1.8,
          ease: [0.19, 1.0, 0.22, 1.0]
        }
      });
      
      const timer = setTimeout(() => {
        setAnimationPhase('active');
        setPortalComplete(true);
        onAnimationComplete && onAnimationComplete();
        
        // Subtle animation during active state
        portalRingControls.start({
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.7, 0.6],
          transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }
        });
        
        portalGlowControls.start({
          scale: [1.2, 1.25, 1.2],
          opacity: [0.5, 0.6, 0.5],
          transition: {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }
        });
        
      }, 1200);
      
      return () => clearTimeout(timer);
    } else {
      setAnimationPhase('exiting');
      setPortalComplete(false);
      
      // Sequence of animations for exiting
      portalRingControls.start({
        opacity: [0.6, 0.8, 0],
        scale: [1, 1.3, 0],
        rotate: [0, -360],
        transition: { 
          duration: 1.2,
          ease: [0.19, 1.0, 0.22, 1.0]
        }
      });
      
      portalGlowControls.start({
        opacity: [0.5, 0.3, 0],
        scale: [1.2, 0.8, 0],
        transition: { 
          duration: 1,
          ease: [0.19, 1.0, 0.22, 1.0]
        }
      });
    }
  }, [isOpen, onAnimationComplete, portalRingControls, portalGlowControls]);
  
  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Non-Euclidean distortion effect for SVG filter
  const generateTurbulence = () => {
    return distortionPoints.map((point, index) => {
      const baseFrequency = 0.01 + (animationPhase === 'entering' || animationPhase === 'exiting' ? 0.03 : 0.01);
      const seed = index * 10;
      const scale = animationPhase === 'entering' 
        ? 40 + Math.sin(Date.now() / 1000 * point.speed) * 10
        : animationPhase === 'exiting' 
          ? -40 - Math.sin(Date.now() / 1000 * point.speed) * 10
          : 5 + Math.sin(Date.now() / 1000 * point.speed) * 2;
      
      return `
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="${baseFrequency}" 
          numOctaves="4" 
          seed="${seed}" 
          result="turbulence${index}" 
        />
        <feDisplacementMap 
          in="SourceGraphic" 
          in2="turbulence${index}" 
          scale="${scale}" 
          xChannelSelector="R" 
          yChannelSelector="G" 
          result="displace${index}" 
        />
      `;
    }).join('');
  };
  
  // Portal swirl effect for SVG filter
  const generateSwirl = () => {
    const intensity = animationPhase === 'entering' ? 15 : 
                     animationPhase === 'exiting' ? -15 : 0;
    const time = Date.now() / 1000;
    const pulseFactor = Math.sin(time * 2) * 2;
    
    return `
      <feConvolveMatrix order="3" kernelMatrix="0 -1 0 -1 4 -1 0 -1 0" result="sharpen"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="highContrast"/>
      <feMorphology operator="dilate" radius="${animationPhase === 'active' ? 0 : 2 + pulseFactor}" result="dilate"/>
      <feDisplacementMap in="SourceGraphic" in2="dilate" scale="${intensity + pulseFactor}" xChannelSelector="R" yChannelSelector="G"/>
    `;
  };
  
  // Glow effect for SVG filter
  const generateGlow = () => {
    const time = Date.now() / 1000;
    const pulseFactor = Math.sin(time * 1.5) * 3;
    const blurRadius = animationPhase === 'entering' ? 15 + pulseFactor : 
                      animationPhase === 'exiting' ? 20 + pulseFactor : 5 + pulseFactor;
    
    return `
      <feGaussianBlur in="SourceGraphic" stdDeviation="${blurRadius}" result="blur"/>
      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="glow"/>
      <feBlend in="SourceGraphic" in2="glow" mode="screen"/>
    `;
  };

  // Color shift effect
  const generateColorShift = () => {
    const time = Date.now() / 1000;
    const amount = animationPhase === 'entering' ? 0.05 + Math.sin(time) * 0.02 : 
                  animationPhase === 'exiting' ? 0.05 + Math.sin(time) * 0.02 : 0.02 + Math.sin(time) * 0.01;
    
    return `
      <feColorMatrix type="matrix" 
        values="
          1 0 0 0 ${isDarkMode ? 0.1 + Math.sin(time * 0.7) * 0.05 : 0 + Math.sin(time * 0.7) * 0.05}
          0 1 0 0 ${isDarkMode ? 0 + Math.sin(time * 0.8) * 0.05 : 0.1 + Math.sin(time * 0.8) * 0.05}
          0 0 1 0 ${isDarkMode ? 0.2 + Math.sin(time * 0.9) * 0.05 : 0.2 + Math.sin(time * 0.9) * 0.05}
          0 0 0 1 0
        " 
        result="colorShift"
      />
    `;
  };

  // Chromatic aberration effect
  const generateChromaticAberration = () => {
    const time = Date.now() / 1000;
    const pulseFactor = Math.sin(time * 2) * 1;
    const offset = animationPhase === 'entering' || animationPhase === 'exiting' ? 3 + pulseFactor : 1 + pulseFactor * 0.3;
    
    return `
      <feOffset in="SourceGraphic" dx="${offset}" dy="0" result="redShift">
        <feFuncR type="identity"/>
        <feFuncG type="discrete" tableValues="0"/>
        <feFuncB type="discrete" tableValues="0"/>
      </feOffset>
      <feOffset in="SourceGraphic" dx="-${offset}" dy="0" result="blueShift">
        <feFuncR type="discrete" tableValues="0"/>
        <feFuncG type="discrete" tableValues="0"/>
        <feFuncB type="identity"/>
      </feOffset>
      <feBlend in="redShift" in2="blueShift" mode="screen" result="chromaticAberration"/>
      <feBlend in="SourceGraphic" in2="chromaticAberration" mode="normal" result="finalChromaticAberration"/>
    `;
  };
  
  // Vignette effect
  const generateVignette = () => {
    const intensity = animationPhase === 'entering' ? 0.8 : 
                     animationPhase === 'exiting' ? 0.8 : 0.4;
    
    return `
      <feComponentTransfer in="SourceGraphic" result="vignetteSource">
        <feFuncR type="linear" slope="1" intercept="0"/>
        <feFuncG type="linear" slope="1" intercept="0"/>
        <feFuncB type="linear" slope="1" intercept="0"/>
      </feComponentTransfer>
      <feGaussianBlur in="vignetteSource" stdDeviation="50" result="blur"/>
      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${intensity} 0" result="vignette"/>
      <feComposite in="SourceGraphic" in2="vignette" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
    `;
  };
  
  // Liquid distortion effect
  const generateLiquidDistortion = () => {
    const time = Date.now() / 1000;
    const frequency = 0.03 + Math.sin(time * 0.5) * 0.01;
    const scale = animationPhase === 'entering' ? 20 + Math.sin(time) * 5 : 
                 animationPhase === 'exiting' ? -20 - Math.sin(time) * 5 : 5 + Math.sin(time) * 2;
    
    return `
      <feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="2" seed="${Math.floor(time) % 100}" result="liquid"/>
      <feDisplacementMap in="SourceGraphic" in2="liquid" scale="${scale}" xChannelSelector="R" yChannelSelector="G"/>
    `;
  };
  
  // Interactive distortion based on mouse position
  const generateInteractiveDistortion = () => {
    if (animationPhase !== 'active') return '';
    
    const { x, y } = mousePosition;
    const distortionX = (x - 0.5) * 20;
    const distortionY = (y - 0.5) * 20;
    
    return `
      <feOffset in="SourceGraphic" dx="${distortionX}" dy="${distortionY}" result="mouseOffset">
        <feFuncA type="linear" slope="0.3" intercept="0"/>
      </feOffset>
      <feBlend in="SourceGraphic" in2="mouseOffset" mode="normal"/>
    `;
  };
  
  // Combined SVG filter for portal effect
  const portalFilter = `
    <filter id="portalEffect" x="-50%" y="-50%" width="200%" height="200%">
      ${generateLiquidDistortion()}
      ${generateTurbulence()}
      ${generateSwirl()}
      ${generateGlow()}
      ${generateColorShift()}
      ${generateChromaticAberration()}
      ${generateVignette()}
      ${generateInteractiveDistortion()}
    </filter>
  `;
  
  // Animation variants for the portal backdrop
  const backdropVariants = {
    hidden: { 
      opacity: 0,
      scale: 0,
      borderRadius: "100%"
    },
    visible: { 
      opacity: 1,
      scale: 1,
      borderRadius: "0%",
      transition: { 
        duration: 0.8,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0,
      borderRadius: "100%",
      transition: { 
        duration: 0.6,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    }
  };

  // Animation variants for the portal particles
  const particleVariants = {
    hidden: { 
      opacity: 0,
      scale: 0
    },
    visible: (i: number) => ({ 
      opacity: [0, 0.8, 0.4],
      scale: [0, 1.5, 1],
      transition: { 
        delay: i * 0.05,
        duration: 1.0,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    }),
    exit: (i: number) => ({ 
      opacity: [0.4, 0.8, 0],
      scale: [1, 1.5, 0],
      transition: { 
        delay: i * 0.03,
        duration: 0.6,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    })
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* SVG Filters */}
          <svg className="absolute w-0 h-0">
            <defs dangerouslySetInnerHTML={{ __html: portalFilter }} />
          </svg>
          
          {/* Portal backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"
            initial="hidden"
            animate={animationPhase === 'exiting' ? 'exit' : 'visible'}
            exit="exit"
            variants={backdropVariants}
          />
          
          {/* Portal outer glow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={portalGlowControls}
          >
            <div className={`w-[140%] h-[140%] rounded-full ${
              isDarkMode ? 'bg-blue-500/5' : 'bg-purple-500/5'
            }`} style={{ 
              boxShadow: isDarkMode 
                ? '0 0 150px 50px rgba(59, 130, 246, 0.3), inset 0 0 100px 20px rgba(59, 130, 246, 0.2)' 
                : '0 0 150px 50px rgba(168, 85, 247, 0.3), inset 0 0 100px 20px rgba(168, 85, 247, 0.2)'
            }} />
          </motion.div>
          
          {/* Portal ring effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={portalRingControls}
          >
            <div className={`w-[120%] h-[120%] rounded-full border-4 border-opacity-60 ${
              isDarkMode ? 'border-blue-500' : 'border-purple-500'
            }`} style={{ 
              boxShadow: isDarkMode 
                ? '0 0 100px 20px rgba(59, 130, 246, 0.6), inset 0 0 60px 10px rgba(59, 130, 246, 0.4)' 
                : '0 0 100px 20px rgba(168, 85, 247, 0.6), inset 0 0 60px 10px rgba(168, 85, 247, 0.4)'
            }} />
          </motion.div>
          
          {/* Secondary rotating ring */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0.3],
              scale: [0, 1.1, 1.05],
              rotate: [0, -360],
              transition: { 
                duration: 2,
                ease: [0.19, 1.0, 0.22, 1.0],
                repeat: Infinity,
                repeatType: "loop"
              }
            }}
            exit={{ 
              opacity: 0,
              scale: 0,
              transition: { duration: 0.5 }
            }}
          >
            <div className={`w-[130%] h-[130%] rounded-full border-2 border-dashed border-opacity-30 ${
              isDarkMode ? 'border-blue-400' : 'border-purple-400'
            }`} />
          </motion.div>

          {/* Portal particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 8 + 4,
                  height: Math.random() * 8 + 4,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: isDarkMode
                    ? `rgba(${59 + Math.random() * 40}, ${130 + Math.random() * 40}, ${246 + Math.random() * 9}, 0.8)`
                    : `rgba(${168 + Math.random() * 30}, ${85 + Math.random() * 40}, ${247 + Math.random() * 8}, 0.8)`,
                  boxShadow: isDarkMode
                    ? `0 0 10px rgba(59, 130, 246, 0.8)`
                    : `0 0 10px rgba(168, 85, 247, 0.8)`
                }}
                initial="hidden"
                animate={animationPhase === 'exiting' ? 'exit' : 'visible'}
                exit="exit"
                variants={particleVariants}
              />
            ))}
          </div>
          
          {/* Energy tendrils */}
          {animationPhase === 'active' && Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`tendril-${i}`}
              className={`absolute w-0.5 h-40 origin-bottom ${
                isDarkMode ? 'bg-gradient-to-t from-blue-500 to-transparent' : 'bg-gradient-to-t from-purple-500 to-transparent'
              }`}
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: 'center bottom',
                rotate: `${i * 45}deg`,
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ 
                scaleY: [0, 1, 0.8],
                opacity: [0, 0.7, 0.5],
                transition: {
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
          ))}
          
          {/* Content container with proper sizing */}
          <motion.div 
            className={`relative z-10 w-full max-w-[95vw] md:max-w-[85vw] lg:max-w-[1200px] min-h-[300px] max-h-[90vh] ${
              portalComplete ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            style={{ 
              filter: 'url(#portalEffect)',
            }}
          >
            {children}
          </motion.div>
          
          {/* Floating energy orbs */}
          {animationPhase === 'active' && Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                background: isDarkMode
                  ? `rgba(${59 + Math.random() * 40}, ${130 + Math.random() * 40}, ${246 + Math.random() * 9}, 0.8)`
                  : `rgba(${168 + Math.random() * 30}, ${85 + Math.random() * 40}, ${247 + Math.random() * 8}, 0.8)`,
                boxShadow: isDarkMode
                  ? `0 0 15px 5px rgba(59, 130, 246, 0.6)`
                  : `0 0 15px 5px rgba(168, 85, 247, 0.6)`
              }}
              initial={{ 
                x: 0, 
                y: 0,
                opacity: 0 
              }}
              animate={{ 
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 0.8, 0.6],
                scale: [0, 1.2, 1],
                transition: {
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.5
                }
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
} 