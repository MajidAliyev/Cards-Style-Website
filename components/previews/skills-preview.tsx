"use client"

import { motion } from "framer-motion"
import { Code, Palette, Layers, Zap } from "lucide-react"

interface SkillsPreviewProps {
  isDarkMode: boolean
}

export default function SkillsPreview({ isDarkMode }: SkillsPreviewProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  const skills = [
    { name: "React", level: 90, color: "from-blue-400 to-blue-600" },
    { name: "TypeScript", level: 85, color: "from-blue-500 to-blue-700" },
    { name: "UI/UX Design", level: 80, color: "from-purple-400 to-purple-600" },
    { name: "Framer Motion", level: 75, color: "from-pink-400 to-purple-500" },
  ]

  return (
    <div className="h-full w-full p-6">
      <motion.div className="flex items-center" variants={container} initial="hidden" animate="show">
        <motion.div
          className={`mr-4 flex h-16 w-16 items-center justify-center rounded-full ${
            isDarkMode ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"
          }`}
          variants={item}
        >
          <Code size={28} />
        </motion.div>
        <motion.div variants={item}>
          <h3 className="text-2xl font-bold">Skills</h3>
          <p className={isDarkMode ? "text-purple-400" : "text-purple-600"}>Technical Expertise</p>
        </motion.div>
      </motion.div>

      <motion.div className="mt-6 space-y-4" variants={container} initial="hidden" animate="show">
        {skills.map((skill, index) => (
          <motion.div key={skill.name} className="space-y-1" variants={item}>
            <div className="flex justify-between text-sm">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className={`h-2 w-full overflow-hidden rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
              <motion.div
                className={`h-full bg-gradient-to-r ${skill.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="mt-6 grid grid-cols-2 gap-3" variants={container} initial="hidden" animate="show">
        <motion.div
          className={`flex items-center rounded-xl p-3 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
          variants={item}
          whileHover={{ scale: 1.05 }}
        >
          <Palette size={18} className={isDarkMode ? "text-pink-400 mr-2" : "text-pink-500 mr-2"} />
          <span className="text-sm">UI/UX Design</span>
        </motion.div>

        <motion.div
          className={`flex items-center rounded-xl p-3 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
          variants={item}
          whileHover={{ scale: 1.05 }}
        >
          <Code size={18} className={isDarkMode ? "text-blue-400 mr-2" : "text-blue-500 mr-2"} />
          <span className="text-sm">Frontend Dev</span>
        </motion.div>

        <motion.div
          className={`flex items-center rounded-xl p-3 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
          variants={item}
          whileHover={{ scale: 1.05 }}
        >
          <Layers size={18} className={isDarkMode ? "text-amber-400 mr-2" : "text-amber-500 mr-2"} />
          <span className="text-sm">Design Systems</span>
        </motion.div>

        <motion.div
          className={`flex items-center rounded-xl p-3 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
          variants={item}
          whileHover={{ scale: 1.05 }}
        >
          <Zap size={18} className={isDarkMode ? "text-green-400 mr-2" : "text-green-500 mr-2"} />
          <span className="text-sm">Animation</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

