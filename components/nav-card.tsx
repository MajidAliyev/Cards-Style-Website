"use client"

import type React from "react"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

interface NavCardProps {
  label: string
  emoji: string
  images: string[]
  onClick: (e: React.MouseEvent) => void
  index: number
  isDarkMode: boolean
  onHoverStart?: () => void
  onHoverEnd?: () => void
}

export default function NavCard({
  label,
  emoji,
  images,
  onClick,
  index,
  isDarkMode,
  onHoverStart,
  onHoverEnd
}: NavCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [shaderTime, setShaderTime] = useState(0)

  // Motion values for 3D card effect with springs for smoother animation
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring configuration for smoother transitions
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }

  // Use springs for smoother rotation
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Transform motion values for rotation
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15])

  // Transform for parallax effect on card content
  const contentX = useTransform(springX, [-0.5, 0.5], [10, -10])
  const contentY = useTransform(springY, [-0.5, 0.5], [10, -10])

  // Transform for image scale on hover with spring
  const imageScale = useTransform(
    springY, 
    [-0.5, 0, 0.5], 
    [1.1, isHovered ? 1.15 : 1, 1.1]
  )

  // Shadow based on tilt
  const shadowX = useTransform(springX, [-0.5, 0.5], [-20, 20])
  const shadowY = useTransform(springY, [-0.5, 0.5], [-20, 20])

  // Update card size on mount and resize
  useEffect(() => {
    if (cardRef.current) {
      const updateSize = () => {
        if (cardRef.current) {
          const { width, height } = cardRef.current.getBoundingClientRect()
          setCardSize({ width, height })
        }
      }
      
      updateSize()
      window.addEventListener('resize', updateSize)
      
      return () => window.removeEventListener('resize', updateSize)
    }
  }, [])
  
  // Animation loop for shader effect
  useEffect(() => {
    let animationFrameId: number
    let startTime = Date.now()
    
    const animate = () => {
      const currentTime = (Date.now() - startTime) / 1000
      setShaderTime(currentTime)
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      
      // Calculate mouse position relative to card center (range: -0.5 to 0.5)
      const xPos = (e.clientX - rect.left) / rect.width - 0.5
      const yPos = (e.clientY - rect.top) / rect.height - 0.5
      
      // Update motion values
      x.set(xPos)
      y.set(yPos)
      
      // Update mouse position for shader effect
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      })
    }
  }
  
  // Reset position on mouse leave
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
    onHoverEnd && onHoverEnd()
  }
  
  // Set hovered state on mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true)
    onHoverStart && onHoverStart()
  }
  
  // Generate CSS for WebGL-like shader effect
  const generateShaderEffect = () => {
    if (!isHovered) return {}
    
    const { x, y } = mousePosition
    const time = shaderTime
    
    // Create a radial gradient that follows the mouse
    const gradientX = x * 100
    const gradientY = y * 100
    const gradientSize = 120 + Math.sin(time * 2) * 20
    
    // Create animated noise pattern
    const noiseFrequency = 0.8
    const noiseSpeed = time * 0.5
    const noiseScale = 0.15
    
    return {
      backgroundImage: `
        radial-gradient(
          circle at ${gradientX}% ${gradientY}%, 
          ${isDarkMode ? 'rgba(59, 130, 246, 0.7)' : 'rgba(168, 85, 247, 0.7)'} 0%, 
          transparent ${gradientSize}%
        ),
        repeating-conic-gradient(
          ${isDarkMode ? 'rgba(30, 64, 175, 0.2)' : 'rgba(126, 34, 206, 0.2)'} 0%, 
          ${isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(168, 85, 247, 0.3)'} ${noiseScale * 100}%, 
          ${isDarkMode ? 'rgba(30, 64, 175, 0.2)' : 'rgba(126, 34, 206, 0.2)'} ${noiseScale * 200}%,
          ${isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(168, 85, 247, 0.3)'} ${noiseScale * 300}%
        )`,
      backgroundSize: `100% 100%, ${noiseFrequency * 100}% ${noiseFrequency * 100}%`,
      backgroundPosition: `0 0, ${noiseSpeed * 100}px ${noiseSpeed * 50}px`
    }
  }

  // Generate SVG filter for non-Euclidean distortion
  const generateDistortionFilter = () => {
    if (!isHovered) return ''
    
    const turbulenceFreq = 0.01 + Math.sin(shaderTime) * 0.005
    const displacementScale = 5 + Math.sin(shaderTime * 2) * 2
    
    return `
      <filter id="distortion-${index}" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="${turbulenceFreq}" numOctaves="2" result="turbulence" />
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="${displacementScale}" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    `
  }

  return (
    <>
      {/* SVG Filters */}
      <svg className="absolute w-0 h-0">
        <defs dangerouslySetInnerHTML={{ __html: generateDistortionFilter() }} />
      </svg>
      
      <motion.div
        ref={cardRef}
        className={`relative overflow-hidden rounded-2xl ${
          isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
        } transition-colors duration-300 cursor-pointer`}
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? isDarkMode
              ? `0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4), 0 0 20px 5px rgba(59, 130, 246, 0.3), ${shadowX.get()}px ${shadowY.get()}px 30px rgba(59, 130, 246, 0.2)`
              : `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 20px 5px rgba(168, 85, 247, 0.2), ${shadowX.get()}px ${shadowY.get()}px 30px rgba(168, 85, 247, 0.15)`
            : isDarkMode
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { type: "spring", stiffness: 300, damping: 15 }
        }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            delay: index * 0.1,
            duration: 0.5,
            ease: [0.19, 1.0, 0.22, 1.0]
          }
        }}
      >
        {/* Background shader effect */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            ...generateShaderEffect(),
            filter: isHovered ? `url(#distortion-${index})` : 'none'
          }}
        />
        
        {/* Card content with parallax effect */}
        <motion.div 
          className="relative z-10 h-full flex flex-col p-4"
          style={{ 
            x: contentX,
            y: contentY,
            transformStyle: 'preserve-3d',
            transform: 'translateZ(20px)'
          }}
        >
          {/* Large centered emoji instead of image */}
          <div className="flex items-center justify-center w-full h-32 mb-4">
              <motion.div
              className="text-8xl md:text-9xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              whileHover={{ 
                scale: 1.2,
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.5 }
              }}
                style={{
                filter: isHovered ? 
                  `drop-shadow(0 0 8px ${isDarkMode ? 'rgba(59, 130, 246, 0.7)' : 'rgba(168, 85, 247, 0.5)'})` : 
                  'none',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(40px)'
              }}
            >
              {emoji}
              </motion.div>
        </div>

          {/* Label with 3D effect */}
        <motion.div
            className="mt-auto"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: 'translateZ(30px)'
            }}
          >
            <motion.h3 
              className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              animate={{ 
                textShadow: isHovered 
                  ? isDarkMode 
                    ? '0 0 8px rgba(59, 130, 246, 0.7)' 
                    : '0 0 8px rgba(168, 85, 247, 0.5)'
                  : 'none'
              }}
            >
              {label}
            </motion.h3>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

