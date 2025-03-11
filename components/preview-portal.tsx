"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import AboutPreview from "@/components/previews/about-preview"
import SkillsPreview from "@/components/previews/skills-preview"
import PortfolioPreview from "@/components/previews/portfolio-preview"
import WorkPreview from "@/components/previews/work-preview"
import ContactPreview from "@/components/previews/contact-preview"

interface PreviewPortalProps {
  activePreview: string | null
  isDarkMode: boolean
}

export default function PreviewPortal({ activePreview, isDarkMode }: PreviewPortalProps) {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Get preview position and animation based on preview type
  const getPreviewProps = (previewId: string) => {
    const { width, height } = dimensions

    switch (previewId) {
      case "about":
        return {
          position: { top: 0, left: 0, width: width * 0.3, height: height },
          initial: { x: -width * 0.3, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -width * 0.3, opacity: 0 },
          transition: { type: "spring", damping: 30, stiffness: 300 },
        }
      case "skills":
        return {
          position: { top: 0, right: 0, width: width * 0.3, height: height },
          initial: { x: width * 0.3, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: width * 0.3, opacity: 0 },
          transition: { type: "spring", damping: 30, stiffness: 300 },
        }
      case "portfolio":
        return {
          position: { bottom: 0, left: 0, width: width, height: height * 0.3 },
          initial: { y: height * 0.3, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: height * 0.3, opacity: 0 },
          transition: { type: "spring", damping: 30, stiffness: 300 },
        }
      case "work":
        return {
          position: { top: 0, left: width * 0.3, width: width * 0.4, height: height * 0.3 },
          initial: { y: -height * 0.3, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -height * 0.3, opacity: 0 },
          transition: { type: "spring", damping: 30, stiffness: 300 },
        }
      case "contact":
        return {
          position: { bottom: height * 0.3, right: 0, width: width * 0.3, height: height * 0.4 },
          initial: { x: width * 0.3, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: width * 0.3, opacity: 0 },
          transition: { type: "spring", damping: 30, stiffness: 300 },
        }
      default:
        return {
          position: { top: 0, left: 0, width: 0, height: 0 },
          initial: { opacity: 0 },
          animate: { opacity: 0 },
          exit: { opacity: 0 },
          transition: {},
        }
    }
  }

  // Render preview content based on active preview
  const renderPreviewContent = (previewId: string) => {
    switch (previewId) {
      case "about":
        return <AboutPreview isDarkMode={isDarkMode} />
      case "skills":
        return <SkillsPreview isDarkMode={isDarkMode} />
      case "portfolio":
        return <PortfolioPreview isDarkMode={isDarkMode} />
      case "work":
        return <WorkPreview isDarkMode={isDarkMode} />
      case "contact":
        return <ContactPreview isDarkMode={isDarkMode} />
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {activePreview && (
        <motion.div
          key={activePreview}
          className="pointer-events-none fixed z-40 overflow-hidden"
          style={{
            ...getPreviewProps(activePreview).position,
          }}
          initial={getPreviewProps(activePreview).initial}
          animate={getPreviewProps(activePreview).animate}
          exit={getPreviewProps(activePreview).exit}
          transition={getPreviewProps(activePreview).transition}
        >
          <div
            className={`h-full w-full overflow-hidden ${
              isDarkMode ? "bg-gray-900/90 backdrop-blur-md" : "bg-white/90 backdrop-blur-md"
            } shadow-2xl`}
          >
            {renderPreviewContent(activePreview)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

