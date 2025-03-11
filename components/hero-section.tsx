"use client"

import { motion, useTransform, AnimatePresence, type MotionValue } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Sparkles, Code, Palette, Zap } from "lucide-react"
import { translations } from "@/lib/translations"

interface HeroSectionProps {
  isDarkMode: boolean
  setCursorVariant: (variant: string) => void
  setCursorText: (text: string) => void
  isPreviewActive: boolean
  language: string
  scrollYProgress: MotionValue<number>
}

export default function HeroSection({
  isDarkMode,
  setCursorVariant,
  setCursorText,
  isPreviewActive,
  language,
  scrollYProgress,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Enhanced parallax effects - define all transforms at the top level
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -10])

  // Floating elements with enhanced animations
  const floatingElements = [
    { icon: <Code size={24} />, delay: 0, offsetX: -80, offsetY: -60, color: "blue" },
    { icon: <Palette size={24} />, delay: 0.1, offsetX: 80, offsetY: -40, color: "purple" },
    { icon: <Zap size={24} />, delay: 0.2, offsetX: -60, offsetY: 60, color: "yellow" },
    { icon: <Sparkles size={24} />, delay: 0.3, offsetX: 60, offsetY: 80, color: "pink" },
  ]

  return (
    <motion.div
      ref={containerRef}
      className="relative mb-16 flex w-full flex-col items-center justify-center"
      style={{
        opacity,
        scale,
      }}
      animate={{
        opacity: isPreviewActive ? 0.5 : 1,
        scale: isPreviewActive ? 0.95 : 1,
        y: isPreviewActive ? 50 : 0,
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Enhanced background gradient with animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-gradient-radial from-blue-900/20 via-transparent to-transparent"
              : "bg-gradient-radial from-blue-100 via-transparent to-transparent"
          }`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Additional animated background elements */}
        <motion.div
          className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full opacity-10"
          style={{
            background: isDarkMode
              ? "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 70%)"
              : "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute -right-20 top-20 h-60 w-60 rounded-full opacity-10"
          style={{
            background: isDarkMode
              ? "radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(139, 92, 246, 0) 70%)"
              : "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)",
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Profile image with enhanced creative frame */}
      <motion.div
        className="relative mb-8 h-40 w-40"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        style={{ rotate }}
        onMouseEnter={() => {
          setIsHovered(true)
          setCursorVariant("hover")
          setCursorText("👋")
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          setCursorVariant("default")
          setCursorText("")
        }}
      >
        {/* Enhanced animated border */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full"
          animate={{
            boxShadow: [
              `0 0 0 4px ${isDarkMode ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.3)"}`,
              `0 0 0 12px ${isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"}`,
              `0 0 0 4px ${isDarkMode ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.3)"}`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />

        {/* Enhanced rotating gradient border */}
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute inset-[-5px] bg-gradient-conic from-blue-500 via-purple-500 to-blue-500" />
        </motion.div>

        {/* Profile image with hover effect */}
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src="/placeholder.svg?height=160&width=160&text=Profile"
            alt="Profile"
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Overlay effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0"
            animate={{ opacity: isHovered ? 0.6 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Enhanced floating elements with 3D perspective */}
        <AnimatePresence>
          {isHovered &&
            floatingElements.map((element, index) => (
              <motion.div
                key={index}
                className={`absolute flex h-10 w-10 items-center justify-center rounded-full ${
                  isDarkMode ? "bg-gray-800 text-blue-400" : "bg-white text-blue-500"
                } shadow-lg`}
                initial={{ scale: 0, x: 0, y: 0, z: 0 }}
                animate={{
                  scale: 1,
                  x: element.offsetX,
                  y: element.offsetY,
                  z: 30,
                  rotateX: [0, 10, 0, -10, 0],
                  rotateY: [0, -10, 0, 10, 0],
                }}
                exit={{
                  scale: 0,
                  transition: { duration: 0.2 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: element.delay,
                  rotateX: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                  },
                  rotateY: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  boxShadow: isDarkMode
                    ? `0 10px 25px -5px rgba(59, 130, 246, 0.3)`
                    : `0 10px 25px -5px rgba(59, 130, 246, 0.2)`,
                }}
              >
                {element.icon}
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      {/* Name and title with enhanced parallax */}
      <motion.div className="text-center" style={{ y }}>
        <motion.h1
          className={`mb-2 text-4xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onMouseEnter={() => {
            setCursorVariant("hover")
            setCursorText("👋")
          }}
          onMouseLeave={() => {
            setCursorVariant("default")
            setCursorText("")
          }}
        >
          {translations[language].hero.title}
        </motion.h1>
        <motion.h2
          className={`text-4xl font-normal ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onMouseEnter={() => {
            setCursorVariant("hover")
            setCursorText("✨")
          }}
          onMouseLeave={() => {
            setCursorVariant("default")
            setCursorText("")
          }}
        >
          {translations[language].hero.subtitle}
        </motion.h2>

        {/* Animated underline */}
        <motion.div
          className={`mx-auto mt-2 h-1 w-0 rounded-full ${
            isDarkMode ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-500 to-purple-500"
          }`}
          animate={{ width: "150px" }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  )
}

