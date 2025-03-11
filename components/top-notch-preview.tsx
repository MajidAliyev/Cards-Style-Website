"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import AboutPreviewCard from "@/components/preview-cards/about-preview-card"
import SkillsPreviewCard from "@/components/preview-cards/skills-preview-card"
import PortfolioPreviewCard from "@/components/preview-cards/portfolio-preview-card"
import WorkPreviewCard from "@/components/preview-cards/work-preview-card"
import ContactPreviewCard from "@/components/preview-cards/contact-preview-card"

interface TopNotchPreviewProps {
  isVisible: boolean
  preview: string | null
  isDarkMode: boolean
}

export default function TopNotchPreview({ isVisible, preview, isDarkMode }: TopNotchPreviewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getPreviewContent = () => {
    switch (preview?.toLowerCase()) {
      case "about":
        return <AboutPreviewCard isDarkMode={isDarkMode} />
      case "skills":
        return <SkillsPreviewCard isDarkMode={isDarkMode} />
      case "portfolio":
        return <PortfolioPreviewCard isDarkMode={isDarkMode} />
      case "work":
        return <WorkPreviewCard isDarkMode={isDarkMode} />
      case "contact":
        return <ContactPreviewCard isDarkMode={isDarkMode} />
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 flex justify-center"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
        >
          <motion.div
            className={`relative mt-4 w-full max-w-4xl overflow-hidden rounded-2xl ${
              isDarkMode ? "bg-gray-800/90" : "bg-white/90"
            } backdrop-blur-xl shadow-2xl mx-4`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
            style={{
              boxShadow: isDarkMode
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 50px 10px rgba(59, 130, 246, 0.1)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 50px 10px rgba(168, 85, 247, 0.1)",
            }}
          >
            {/* Gradient border */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                padding: "1px",
                background: isDarkMode
                  ? "linear-gradient(to right, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5))"
                  : "linear-gradient(to right, rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  isDarkMode
                    ? "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
                    : "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
                  isDarkMode
                    ? "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.25) 0%, transparent 70%)"
                    : "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.25) 0%, transparent 70%)",
                  isDarkMode
                    ? "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
                    : "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            {/* Content */}
            <motion.div
              className="relative p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {getPreviewContent()}
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1"
              style={{
                background: isDarkMode
                  ? "linear-gradient(to right, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5))"
                  : "linear-gradient(to right, rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5))",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.1, 0],
                backgroundPosition: ["200% 50%", "-50% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              style={{
                background: isDarkMode
                  ? "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)"
                  : "linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.3) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

