"use client"

import { motion } from "framer-motion"
import { User, Heart, Coffee, Camera, MapPin } from "lucide-react"
import Image from "next/image"

interface AboutPreviewProps {
  isDarkMode: boolean
}

export default function AboutPreview({ isDarkMode }: AboutPreviewProps) {
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

  return (
    <div className="h-full w-full p-6">
      <motion.div className="flex items-center" variants={container} initial="hidden" animate="show">
        <motion.div
          className={`mr-4 flex h-16 w-16 items-center justify-center rounded-full ${
            isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"
          }`}
          variants={item}
        >
          <User size={28} />
        </motion.div>
        <motion.div variants={item}>
          <h3 className="text-2xl font-bold">About Me</h3>
          <p className={isDarkMode ? "text-blue-400" : "text-blue-600"}>Frontend Developer & Designer</p>
        </motion.div>
      </motion.div>

      <motion.div className="mt-6 grid grid-cols-2 gap-4" variants={container} initial="hidden" animate="show">
        <motion.div
          className={`rounded-xl p-4 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
          variants={item}
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center">
            <Heart size={18} className={isDarkMode ? "text-red-400" : "text-red-500"} />
            <span className="ml-2 font-medium">Passions</span>
          </div>
          <p className="mt-2 text-sm">UI/UX, Animation, Creative Coding</p>
        </motion.div>

        <motion.div
          className={`rounded-xl p-4 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
          variants={item}
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center">
            <Coffee size={18} className={isDarkMode ? "text-amber-400" : "text-amber-600"} />
            <span className="ml-2 font-medium">Interests</span>
          </div>
          <p className="mt-2 text-sm">Coffee, Photography, Travel</p>
        </motion.div>

        <motion.div
          className={`rounded-xl p-4 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
          variants={item}
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center">
            <Camera size={18} className={isDarkMode ? "text-purple-400" : "text-purple-600"} />
            <span className="ml-2 font-medium">Hobbies</span>
          </div>
          <p className="mt-2 text-sm">Hiking, Photography, Reading</p>
        </motion.div>

        <motion.div
          className={`rounded-xl p-4 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
          variants={item}
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center">
            <MapPin size={18} className={isDarkMode ? "text-green-400" : "text-green-600"} />
            <span className="ml-2 font-medium">Location</span>
          </div>
          <p className="mt-2 text-sm">San Francisco, California</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-6 overflow-hidden rounded-xl"
        variants={item}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.6 }}
      >
        <Image
          src="/placeholder.svg?height=150&width=300&text=About+Me"
          alt="About Me"
          width={300}
          height={150}
          className="h-auto w-full object-cover"
        />
      </motion.div>
    </div>
  )
}

