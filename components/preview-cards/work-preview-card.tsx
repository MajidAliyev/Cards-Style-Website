"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, GraduationCap, Building } from "lucide-react"
import { useTranslation } from 'react-i18next'

interface WorkPreviewCardProps {
  isDarkMode: boolean
}

export default function WorkPreviewCard({ isDarkMode }: WorkPreviewCardProps) {
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

  const experiences = [
    {
      company: "Frauenarztpraxis Huseynova",
      role: "Web Developer & IT Specialist",
      period: "2022 - Present",
      location: "Schliengen",
      color: isDarkMode ? "border-blue-500/30" : "border-blue-500/20",
      icon: <Building size={12} />,
      type: "Work Experience"
    },
    {
      company: "AZERTUFF LTD",
      role: "Co-founder & Marketing Manager",
      period: "2021 - Present",
      location: "Freiburg",
      color: isDarkMode ? "border-purple-500/30" : "border-purple-500/20",
      icon: <Briefcase size={12} />,
      type: "Work Experience"
    },
    {
      company: "IU Internationale Hochschule",
      role: "Media Design Student (Upcoming)",
      period: "Starting April 2025",
      location: "Freiburg",
      color: isDarkMode ? "border-pink-500/30" : "border-pink-500/20",
      icon: <GraduationCap size={12} />,
      type: "Education"
    },
  ]

  return (
    <div>
      <motion.div className="flex items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div
          className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${
            isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600"
          }`}
        >
          <Briefcase size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold">Work Experience</h3>
          <p className={`text-sm ${isDarkMode ? "text-green-400" : "text-green-600"}`}>Professional Journey</p>
        </div>
      </motion.div>

      <motion.p 
        className={`mt-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        My professional experience spans web development, marketing, and entrepreneurship.
      </motion.p>

      <motion.div className="mt-6 space-y-4" variants={container} initial="hidden" animate="show">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-gray-200">
            <motion.div
              className={`h-full w-full bg-gradient-to-b ${
                isDarkMode ? "from-green-500 to-blue-500" : "from-green-500 to-blue-500"
              }`}
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>

          {/* Experience items */}
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div key={exp.company} className="relative pl-12" variants={item}>
                {/* Timeline dot */}
                <motion.div
                  className={`absolute left-[14px] top-1 h-2 w-2 -translate-x-1/2 rounded-full ${
                    isDarkMode ? "bg-white" : "bg-black"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                />

                {/* Content */}
                <motion.div
                  className={`rounded-xl border-l-4 p-4 ${exp.color} ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
                >
                  <h4 className="font-bold">{exp.company}</h4>
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
                    <div className="flex items-center gap-1">
                      {exp.icon}
                      <span>{exp.type}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`mt-6 rounded-lg p-3 text-center text-sm ${
          isDarkMode ? "bg-green-900/20 text-green-300" : "bg-green-100 text-green-800"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Over 3 years of professional experience in web development and digital marketing
      </motion.div>
    </div>
  )
}

