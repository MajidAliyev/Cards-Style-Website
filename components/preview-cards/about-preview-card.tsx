"use client"

import { motion } from "framer-motion"
import { User, Heart, MapPin, Briefcase, Coffee } from "lucide-react"
import Image from "next/image"

interface AboutPreviewCardProps {
  isDarkMode: boolean
}

export default function AboutPreviewCard({ isDarkMode }: AboutPreviewCardProps) {
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

  return (
    <motion.div className="grid gap-8 md:grid-cols-3" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="col-span-1">
        <div className="flex items-center">
          <div
            className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${
              isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"
            }`}
          >
            <User size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">About Me</h3>
            <p className={`text-sm ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
              Web Developer & Marketing Manager
            </p>
          </div>
        </div>

        <motion.p className={`mt-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} variants={item}>
          I'm Majid Aliyev, a passionate web developer and marketing specialist based in Freiburg. I combine technical
          expertise with creative design to build engaging digital experiences.
        </motion.p>

        <motion.div className="mt-4 grid grid-cols-2 gap-2" variants={item}>
          <div className={`flex items-center rounded-lg p-2 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <Heart size={16} className={`mr-2 ${isDarkMode ? "text-red-400" : "text-red-500"}`} />
            <span className="text-sm">Web/App Design</span>
          </div>
          <div className={`flex items-center rounded-lg p-2 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <Coffee size={16} className={`mr-2 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
            <span className="text-sm">UX/UI Design</span>
          </div>
          <div className={`flex items-center rounded-lg p-2 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <MapPin size={16} className={`mr-2 ${isDarkMode ? "text-green-400" : "text-green-500"}`} />
            <span className="text-sm">Freiburg</span>
          </div>
          <div className={`flex items-center rounded-lg p-2 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <Briefcase size={16} className={`mr-2 ${isDarkMode ? "text-purple-400" : "text-purple-500"}`} />
            <span className="text-sm">Co-founder</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={item} className="col-span-2 flex items-center justify-center">
        <div className="relative h-40 w-full max-w-md overflow-hidden rounded-xl">
          <Image
            src="/placeholder.svg?height=160&width=400&text=Majid+Aliyev"
            alt="About Me"
            fill
            className="object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${
              isDarkMode ? "from-blue-500/20 to-purple-500/20" : "from-blue-500/10 to-purple-500/10"
            }`}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className={`rounded-full px-6 py-2 backdrop-blur-sm ${
                isDarkMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-black hover:bg-black/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Profile
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

