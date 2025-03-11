"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingShapesProps {
  isDarkMode: boolean
}

export default function FloatingShapes({ isDarkMode }: FloatingShapesProps) {
  const [shapes, setShapes] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      duration: number
      delay: number
      type: string
      color: string
    }>
  >([])

  useEffect(() => {
    // Generate random shapes
    const newShapes = []
    const shapeTypes = ["circle", "square", "triangle"]
    const colors = ["blue", "purple", "pink", "indigo", "cyan"]

    for (let i = 0; i < 15; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * 5,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    setShapes(newShapes)
  }, [])

  const getShapeStyle = (shape: any) => {
    const baseStyle = {
      position: "absolute" as const,
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      opacity: isDarkMode ? 0.05 : 0.03,
    }

    const colorMap: Record<string, string> = {
      blue: isDarkMode ? "bg-blue-500" : "bg-blue-500",
      purple: isDarkMode ? "bg-purple-500" : "bg-purple-500",
      pink: isDarkMode ? "bg-pink-500" : "bg-pink-500",
      indigo: isDarkMode ? "bg-indigo-500" : "bg-indigo-500",
      cyan: isDarkMode ? "bg-cyan-500" : "bg-cyan-500",
    }

    if (shape.type === "circle") {
      return <div className={`rounded-full ${colorMap[shape.color]}`} style={baseStyle} />
    } else if (shape.type === "square") {
      return <div className={`rounded-md ${colorMap[shape.color]}`} style={baseStyle} />
    } else if (shape.type === "triangle") {
      return (
        <div
          className={colorMap[shape.color]}
          style={{
            ...baseStyle,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
      )
    }
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ x: `${shape.x}%`, y: `${shape.y}%` }}
          animate={{
            x: [`${shape.x}%`, `${(shape.x + 20) % 100}%`, `${(shape.x - 10) % 100}%`, `${shape.x}%`],
            y: [`${shape.y}%`, `${(shape.y - 15) % 100}%`, `${(shape.y + 10) % 100}%`, `${shape.y}%`],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {getShapeStyle(shape)}
        </motion.div>
      ))}
    </div>
  )
}

