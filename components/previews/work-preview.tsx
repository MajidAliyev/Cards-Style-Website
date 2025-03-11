"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin } from "lucide-react"

interface WorkPreviewProps {
  isDarkMode: boolean
}

export default function WorkPreview({ isDarkMode }: WorkPreviewProps) {
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

  const experiences = [
    {
      company: "TechCorp Inc.",
      role: "Senior Frontend Developer",
      period: "2021 - Present",
      location: "San Francisco, CA",
    },
    {
      company: "DesignHub",
      role: "UI Developer",
      period: "2018 - 2021",
      location: "Portland, OR",
    },
  ]

  return (
    <div className="h-full w-full p-6">
      <motion.div className="flex items-center" variants={container} initial="hidden" animate="show">
        <motion.div
          className={`mr-4 flex h-16 w-16 items-center justify-center rounded-full ${
            isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600"
          }`}
          variants={item}
        >
          <Briefcase size={28} />
        </motion.div>
        <motion.div variants={item}>
          <h3 className="text-2xl font-bold">Work Experience</h3>
          <p className={isDarkMode ? "text-green-400" : "text-green-600"}>Professional Journey</p>
        </motion.div>
      </motion.div>

      <motion.div className="mt-6 space-y-4" variants={container} initial="hidden" animate="show">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            className={`rounded-xl p-4 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
            variants={item}
            whileHover={{ x: 10 }}
          >
            <h4 className="font-medium">{exp.company}</h4>
            <p className={`text-sm ${isDarkMode ? "text-green-400" : "text-green-600"}`}>{exp.role}</p>
            <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{exp.period}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>{exp.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="mt-6 relative" variants={item} initial="hidden" animate="show" transition={{ delay: 0.6 }}>
        <div className="h-1 w-full rounded-full overflow-hidden bg-gray-200">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ delay: 0.7, duration: 1 }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>2016</span>
          <span>Present</span>
        </div>
      </motion.div>
    </div>
  )
}

