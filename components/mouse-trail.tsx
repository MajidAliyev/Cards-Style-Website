"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface MouseTrailProps {
  isDarkMode: boolean
  mousePosition: { x: number; y: number }
}

interface TrailDot {
  id: number
  x: number
  y: number
  size: number
  color: { r: number; g: number; b: number }
  opacity: number
  delay: number
  lifespan: number
  createdAt: number
}

export default function MouseTrail({ isDarkMode, mousePosition }: MouseTrailProps) {
  const [mouseTrailDots, setMouseTrailDots] = useState<TrailDot[]>([])
  const lastDotTime = useRef<number>(0)
  const dotIdCounter = useRef<number>(0)
  const requestRef = useRef<number | null>(null)
  const previousTimeRef = useRef<number | null>(null)
  
  // Spring animation for smoother mouse following
  const springConfig = { damping: 25, stiffness: 300 }
  const mouseX = useSpring(mousePosition.x, springConfig)
  const mouseY = useSpring(mousePosition.y, springConfig)

  // Update spring values when mouse position changes
  useEffect(() => {
    mouseX.set(mousePosition.x)
    mouseY.set(mousePosition.y)
  }, [mousePosition, mouseX, mouseY])

  // Animation loop
  const animate = (time: number) => {
    if (previousTimeRef.current === null) {
      previousTimeRef.current = time
    }
    
    const deltaTime = time - (previousTimeRef.current || 0)
    previousTimeRef.current = time
    
    // Add new dots based on time and movement
    const currentTime = Date.now()
    const timeSinceLastDot = currentTime - lastDotTime.current
    const currentMouseX = mouseX.get()
    const currentMouseY = mouseY.get()
    
    if (timeSinceLastDot > 40 && (currentMouseX !== 0 || currentMouseY !== 0)) {
      const newDot: TrailDot = {
        id: dotIdCounter.current++,
        x: currentMouseX,
        y: currentMouseY,
        size: Math.random() * 8 + 4,
        color: {
          r: isDarkMode ? Math.random() * 100 + 100 : Math.random() * 100 + 50,
          g: isDarkMode ? Math.random() * 100 + 100 : Math.random() * 100 + 50,
          b: isDarkMode ? Math.random() * 255 : Math.random() * 255,
        },
        opacity: Math.random() * 0.4 + 0.2,
        delay: Math.random() * 0.2,
        lifespan: Math.random() * 800 + 600, // Lifespan in milliseconds
        createdAt: currentTime,
      }
      
      setMouseTrailDots(prev => [...prev, newDot])
      lastDotTime.current = currentTime
    }
    
    // Remove expired dots
    setMouseTrailDots(prev => 
      prev.filter(dot => currentTime - dot.createdAt < dot.lifespan)
        .slice(-30) // Limit to 30 dots for performance
    )
    
    requestRef.current = requestAnimationFrame(animate)
  }
  
  // Start and stop animation loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isDarkMode])
  
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      {mouseTrailDots.map((dot) => {
        // Calculate remaining life percentage
        const currentTime = Date.now()
        const elapsedTime = currentTime - dot.createdAt
        const remainingLifePercent = 1 - Math.min(elapsedTime / dot.lifespan, 1)
        
        return (
          <motion.div
            key={dot.id}
            className="absolute rounded-full"
            style={{
              width: dot.size,
              height: dot.size,
              x: dot.x - dot.size / 2,
              y: dot.y - dot.size / 2,
              opacity: dot.opacity * remainingLifePercent,
              background: isDarkMode 
                ? `rgba(${dot.color.r}, ${dot.color.g}, ${dot.color.b}, ${dot.opacity * remainingLifePercent})`
                : `rgba(${dot.color.r}, ${dot.color.g}, ${dot.color.b}, ${dot.opacity * remainingLifePercent})`,
              boxShadow: isDarkMode
                ? `0 0 ${dot.size * 2}px rgba(${dot.color.r}, ${dot.color.g}, ${dot.color.b}, ${0.3 * remainingLifePercent})`
                : `0 0 ${dot.size * 2}px rgba(${dot.color.r}, ${dot.color.g}, ${dot.color.b}, ${0.2 * remainingLifePercent})`
            }}
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1, 0.5 * remainingLifePercent],
              x: dot.x - dot.size / 2 + (Math.random() * 20 - 10) * (1 - remainingLifePercent),
              y: dot.y - dot.size / 2 + (Math.random() * 20 - 10) * (1 - remainingLifePercent) + 10 * (1 - remainingLifePercent), // Slight downward drift
            }}
            transition={{
              scale: { 
                delay: dot.delay,
                duration: dot.lifespan / 1000, 
                ease: "easeOut" 
              },
              x: { 
                delay: dot.delay + 0.1,
                duration: dot.lifespan / 1000 * 0.9, 
                ease: "easeOut" 
              },
              y: { 
                delay: dot.delay + 0.1,
                duration: dot.lifespan / 1000 * 0.9, 
                ease: "easeOut" 
              }
            }}
          />
        )
      })}
    </div>
  )
}

