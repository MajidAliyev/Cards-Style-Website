"use client"

import { motion } from "framer-motion"
import { Code, Palette, Layers, Zap, Star } from "lucide-react"
import { useTranslation } from 'react-i18next'

interface SkillsPreviewCardProps {
  isDarkMode: boolean
}

export default function SkillsPreviewCard({ isDarkMode }: SkillsPreviewCardProps) {
  const { t } = useTranslation();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  const skills = [
    { name: "HTML/CSS/JS", level: 90, color: "from-blue-400 to-blue-600" },
    { name: "Social Media", level: 88, color: "from-blue-500 to-blue-700" },
    { name: "Content Creation", level: 85, color: "from-purple-400 to-purple-600" },
    { name: "Shopify", level: 82, color: "from-pink-400 to-purple-500" },
  ]

  return (
    <motion.div className="grid gap-8 md:grid-cols-2" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <div className="flex items-center">
          <div
            className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${
              isDarkMode ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"
            }`}
          >
            <Code size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Skills</h3>
            <p className={`text-sm ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>Technical Expertise</p>
          </div>
        </div>

        <motion.div className="mt-6 space-y-4" variants={item}>
          {skills.map((skill, index) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className={`h-2 w-full overflow-hidden rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={item}>
        <div className="flex items-center">
          <div
            className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${
              isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"
            }`}
          >
            <Star size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Key Skills</h3>
            <p className={`text-sm ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>Additional Competencies</p>
          </div>
        </div>

        <motion.div className="mt-6 grid grid-cols-2 gap-3" variants={container} initial="hidden" animate="show">
          <motion.div
            className={`flex items-center rounded-xl p-3 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
            variants={item}
          >
            <Palette size={18} className={`mr-2 ${isDarkMode ? "text-pink-400" : "text-pink-500"}`} />
            <span className="text-sm">Web Design</span>
          </motion.div>

          <motion.div
            className={`flex items-center rounded-xl p-3 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
            variants={item}
          >
            <Code size={18} className={`mr-2 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`} />
            <span className="text-sm">IT Support</span>
          </motion.div>

          <motion.div
            className={`flex items-center rounded-xl p-3 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
            variants={item}
          >
            <Layers size={18} className={`mr-2 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
            <span className="text-sm">Branding</span>
          </motion.div>

          <motion.div
            className={`flex items-center rounded-xl p-3 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
            variants={item}
          >
            <Zap size={18} className={`mr-2 ${isDarkMode ? "text-green-400" : "text-green-500"}`} />
            <span className="text-sm">Marketing</span>
          </motion.div>
        </motion.div>

        <motion.div
          className={`mt-6 rounded-xl p-4 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
          variants={item}
        >
          <p className="text-center text-sm">
            <span className={isDarkMode ? "text-purple-400" : "text-purple-600"}>Applying for: </span>
            Media Design Dual Study Program at IU Internationale Hochschule
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

