"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface NavItemProps {
  icon: string
  label: string
  onClick: () => void
}

export default function NavItem({ icon, label, onClick }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      className="group relative flex h-24 w-24 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-blue-400/30 hover:bg-white/10"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-2xl">{icon}</span>
      <span className="mt-2 text-sm font-medium">{label}</span>

      {/* Hover effect */}
      <motion.div
        className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-blue-400 to-purple-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

