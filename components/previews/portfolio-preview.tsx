"use client"

import { motion } from "framer-motion"
import { Briefcase, ArrowRight } from "lucide-react"
import Image from "next/image"

interface PortfolioPreviewProps {
  isDarkMode: boolean
}

export default function PortfolioPreview({ isDarkMode }: PortfolioPreviewProps) {
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

  const projects = [
    { title: "E-commerce Redesign", image: "/placeholder.svg?height=100&width=150&text=Project+1" },
    { title: "Finance Dashboard", image: "/placeholder.svg?height=100&width=150&text=Project+2" },
    { title: "Travel App", image: "/placeholder.svg?height=100&width=150&text=Project+3" },
    { title: "Portfolio Template", image: "/placeholder.svg?height=100&width=150&text=Project+4" },
  ]

  return (
    <div className="h-full w-full p-6">
      <motion.div className="flex items-center" variants={container} initial="hidden" animate="show">
        <motion.div
          className={`mr-4 flex h-16 w-16 items-center justify-center rounded-full ${
            isDarkMode ? "bg-pink-500/20 text-pink-400" : "bg-pink-100 text-pink-600"
          }`}
          variants={item}
        >
          <Briefcase size={28} />
        </motion.div>
        <motion.div variants={item}>
          <h3 className="text-2xl font-bold">Portfolio</h3>
          <p className={isDarkMode ? "text-pink-400" : "text-pink-600"}>Featured Projects</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-6 flex space-x-4 overflow-x-auto pb-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className={`flex min-w-[150px] flex-col overflow-hidden rounded-xl ${
              isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
            }`}
            variants={item}
            whileHover={{ scale: 1.05 }}
          >
            <div className="overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={150}
                height={100}
                className="h-[100px] w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-3">
              <h4 className="text-sm font-medium">{project.title}</h4>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-4 flex justify-between"
        variants={item}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.7 }}
      >
        <div className="flex space-x-2">
          {["All", "Web", "Mobile"].map((filter, index) => (
            <motion.span
              key={filter}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                index === 0
                  ? isDarkMode
                    ? "bg-pink-500 text-white"
                    : "bg-pink-500 text-white"
                  : isDarkMode
                    ? "bg-gray-800 text-gray-300"
                    : "bg-gray-200 text-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {filter}
            </motion.span>
          ))}
        </div>
        <motion.button
          className={`flex items-center text-sm font-medium ${isDarkMode ? "text-pink-400" : "text-pink-600"}`}
          whileHover={{ x: 5 }}
        >
          View All <ArrowRight size={14} className="ml-1" />
        </motion.button>
      </motion.div>
    </div>
  )
}

