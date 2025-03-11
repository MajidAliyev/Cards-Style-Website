"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowRight, Star, Zap, Sparkles, Layers, Code, Palette, Mail } from "lucide-react"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"

interface PreviewPanelProps {
  title: string
  emoji: string
  direction: "left" | "top" | "right" | "bottom"
  cardRef: React.RefObject<HTMLElement>
  isDarkMode: boolean
}

export default function PreviewPanel({ title, emoji, direction, cardRef, isDarkMode }: PreviewPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })

  // Calculate panel position based on card position and direction
  useEffect(() => {
    if (!cardRef.current || !panelRef.current) return

    const cardRect = cardRef.current.getBoundingClientRect()
    const panelRect = panelRef.current.getBoundingClientRect()

    let top = 0
    let left = 0

    switch (direction) {
      case "left":
        top = cardRect.top
        left = cardRect.left - panelRect.width - 20
        break
      case "right":
        top = cardRect.top
        left = cardRect.right + 20
        break
      case "top":
        top = cardRect.top - panelRect.height - 20
        left = cardRect.left
        break
      case "bottom":
        top = cardRect.bottom + 20
        left = cardRect.left
        break
    }

    setPosition({
      top,
      left,
      width: direction === "left" || direction === "right" ? 300 : cardRect.width,
      height: direction === "top" || direction === "bottom" ? 300 : cardRect.height,
    })
  }, [cardRef, direction])

  // Animation variants based on direction
  const variants = {
    hidden: {
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "top" ? -50 : direction === "bottom" ? 50 : 0,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.4,
      },
    },
    exit: {
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
      y: direction === "top" ? -30 : direction === "bottom" ? 30 : 0,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  }

  // Content based on title
  const getContent = () => {
    switch (title) {
      case "About Me":
        return <AboutPreview isDarkMode={isDarkMode} />
      case "Skills":
        return <SkillsPreview isDarkMode={isDarkMode} />
      case "Portfolio":
        return <PortfolioPreview isDarkMode={isDarkMode} />
      case "Work Experience":
        return <WorkPreview isDarkMode={isDarkMode} />
      case "Contact":
        return <ContactPreview isDarkMode={isDarkMode} />
      default:
        return <DefaultPreview title={title} emoji={emoji} isDarkMode={isDarkMode} />
    }
  }

  return (
    <motion.div
      ref={panelRef}
      className={`fixed z-50 overflow-hidden rounded-2xl ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } shadow-2xl`}
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        height: position.height,
        boxShadow: isDarkMode ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)" : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
    >
      {getContent()}
    </motion.div>
  )
}

// Preview components for each section
function AboutPreview({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden p-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center">
          <motion.div
            className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${
              isDarkMode ? "bg-blue-500" : "bg-blue-100"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 8 }}
          >
            <span className="text-2xl">👤</span>
          </motion.div>
          <div>
            <motion.h3
              className="text-xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              About Me
            </motion.h3>
            <motion.p
              className={`text-sm ${isDarkMode ? "text-blue-300" : "text-blue-600"}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Get to know me better
            </motion.p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { icon: <Star size={16} />, text: "Background" },
            { icon: <Zap size={16} />, text: "Interests" },
            { icon: <Sparkles size={16} />, text: "Fun Facts" },
            { icon: <Layers size={16} />, text: "Philosophy" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`flex items-center rounded-lg p-2 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: isDarkMode ? "#2d3748" : "#f3f4f6" }}
            >
              <div className={`mr-2 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}>{item.icon}</div>
              <span className="text-sm font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-8 w-8 rounded-full border-2 ${
                  isDarkMode ? "border-gray-900 bg-gray-700" : "border-white bg-gray-200"
                }`}
              />
            ))}
          </div>
          <motion.button
            className={`flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              isDarkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Profile <ArrowRight size={14} className="ml-1" />
          </motion.button>
        </motion.div>
      </div>

      {/* Animated shapes */}
      <div className="absolute bottom-0 right-0 opacity-20">
        <motion.div
          className="h-32 w-32 rounded-full bg-blue-500"
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 4,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}

function SkillsPreview({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden p-6">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={`h-full w-full ${
            isDarkMode
              ? "bg-[linear-gradient(rgba(59,130,246,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.2)_1px,transparent_1px)]"
              : "bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)]"
          } bg-[size:20px_20px]`}
        />
      </div>

      <div className="relative z-10">
        <div className="mb-4 flex items-center">
          <motion.div
            className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${
              isDarkMode ? "bg-purple-500" : "bg-purple-100"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 8 }}
          >
            <span className="text-2xl">🛠️</span>
          </motion.div>
          <div>
            <motion.h3
              className="text-xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Skills
            </motion.h3>
            <motion.p
              className={`text-sm ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              My technical expertise
            </motion.p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {[
            { name: "React", level: 90 },
            { name: "TypeScript", level: 85 },
            { name: "UI/UX Design", level: 80 },
          ].map((skill, index) => (
            <motion.div
              key={skill.name}
              className="space-y-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex justify-between text-sm">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className={`h-2 w-full overflow-hidden rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-400 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {["Next.js", "Tailwind", "Framer"].map((tag, index) => (
            <motion.span
              key={tag}
              className={`rounded-full px-2 py-1 text-xs font-medium ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Animated code symbols */}
      <div className="absolute -bottom-4 -right-4 opacity-10">
        <motion.div
          className={`flex h-32 w-32 items-center justify-center rounded-full ${
            isDarkMode ? "bg-purple-500" : "bg-purple-200"
          }`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Code size={40} />
        </motion.div>
      </div>
    </div>
  )
}

function PortfolioPreview({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden p-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center">
          <motion.div
            className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${
              isDarkMode ? "bg-pink-500" : "bg-pink-100"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 8 }}
          >
            <span className="text-2xl">🎨</span>
          </motion.div>
          <div>
            <motion.h3
              className="text-xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Portfolio
            </motion.h3>
            <motion.p
              className={`text-sm ${isDarkMode ? "text-pink-300" : "text-pink-600"}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              My creative work
            </motion.p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={`/placeholder.svg?height=80&width=120&text=Project+${i}`}
                alt={`Project ${i}`}
                width={120}
                height={80}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex space-x-1">
            {["All", "Web", "Mobile"].map((filter, index) => (
              <motion.span
                key={filter}
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  index === 0
                    ? isDarkMode
                      ? "bg-pink-500 text-white"
                      : "bg-pink-500 text-white"
                    : isDarkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {filter}
              </motion.span>
            ))}
          </div>
          <motion.button
            className={`flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              isDarkMode ? "bg-pink-600 text-white" : "bg-pink-100 text-pink-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All <ArrowRight size={14} className="ml-1" />
          </motion.button>
        </motion.div>
      </div>

      {/* Animated palette */}
      <div className="absolute -bottom-10 -right-10 opacity-20">
        <motion.div
          className="relative h-40 w-40"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Palette size={80} className="text-pink-500" />
        </motion.div>
      </div>
    </div>
  )
}

function WorkPreview({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden p-6">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={`h-full w-full ${
            isDarkMode
              ? "bg-[radial-gradient(circle,rgba(59,130,246,0.3)_1px,transparent_1px)]"
              : "bg-[radial-gradient(circle,rgba(59,130,246,0.2)_1px,transparent_1px)]"
          } bg-[size:16px_16px]`}
        />
      </div>

      <div className="relative z-10">
        <div className="mb-4 flex items-center">
          <motion.div
            className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${
              isDarkMode ? "bg-green-500" : "bg-green-100"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 8 }}
          >
            <span className="text-2xl">💼</span>
          </motion.div>
          <div>
            <motion.h3
              className="text-xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Work Experience
            </motion.h3>
            <motion.p
              className={`text-sm ${isDarkMode ? "text-green-300" : "text-green-600"}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              My professional journey
            </motion.p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {[
            { company: "TechCorp Inc.", role: "Senior Frontend Developer", period: "2021 - Present" },
            { company: "DesignHub", role: "UI Developer", period: "2018 - 2021" },
          ].map((job, index) => (
            <motion.div
              key={job.company}
              className={`rounded-lg p-3 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex flex-col">
                <span className={`font-medium ${isDarkMode ? "text-white" : "text-black"}`}>{job.company}</span>
                <span className={`text-sm ${isDarkMode ? "text-green-300" : "text-green-600"}`}>{job.role}</span>
                <span className="text-xs text-gray-500">{job.period}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ delay: 0.6, duration: 1 }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>2016</span>
            <span>2023</span>
          </div>
        </motion.div>
      </div>

      {/* Animated briefcase */}
      <div className="absolute -bottom-8 -right-8 opacity-20">
        <motion.div
          className="h-32 w-32 rounded-full bg-green-500 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}

function ContactPreview({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden p-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center">
          <motion.div
            className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${
              isDarkMode ? "bg-indigo-500" : "bg-indigo-100"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 8 }}
          >
            <span className="text-2xl">📧</span>
          </motion.div>
          <div>
            <motion.h3
              className="text-xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Contact
            </motion.h3>
            <motion.p
              className={`text-sm ${isDarkMode ? "text-indigo-300" : "text-indigo-600"}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Get in touch with me
            </motion.p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <motion.div
            className={`rounded-lg p-3 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center">
              <div className={`mr-3 p-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                <Mail size={16} className={isDarkMode ? "text-indigo-300" : "text-indigo-500"} />
              </div>
              <span className="text-sm">hello@janedoe.com</span>
            </div>
          </motion.div>

          <motion.div
            className={`rounded-lg p-3 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center">
              <div className={`mr-3 p-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                <Sparkles size={16} className={isDarkMode ? "text-indigo-300" : "text-indigo-500"} />
              </div>
              <span className="text-sm">Available for new projects</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className={`rounded-full px-6 py-2 text-sm font-medium ${
              isDarkMode ? "bg-indigo-600 text-white" : "bg-indigo-500 text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </motion.div>
      </div>

      {/* Animated envelope */}
      <div className="absolute -bottom-10 -right-10 opacity-20">
        <motion.div
          className="h-40 w-40"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className={`h-full w-full rounded-full ${isDarkMode ? "bg-indigo-500" : "bg-indigo-200"}`} />
        </motion.div>
      </div>
    </div>
  )
}

function DefaultPreview({ title, emoji, isDarkMode }: { title: string; emoji: string; isDarkMode: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <motion.div
          className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 8 }}
        >
          <span className="text-4xl">{emoji}</span>
        </motion.div>

        <motion.h3
          className="text-xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className={`mt-2 text-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Click to explore this section
        </motion.p>
      </div>
    </div>
  )
}

