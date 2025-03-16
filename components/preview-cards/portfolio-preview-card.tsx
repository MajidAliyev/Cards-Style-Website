"use client"

import { motion } from "framer-motion"
import { Briefcase, Code, Palette, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { useTranslation } from 'react-i18next'

interface PortfolioPreviewCardProps {
  isDarkMode: boolean
}

export default function PortfolioPreviewCard({ isDarkMode }: PortfolioPreviewCardProps) {
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

  const projects = [
    {
      title: "Frauenarztpraxis Website",
      category: "Web Dev",
      image: "/placeholder.svg?height=120&width=200&text=Medical+Website",
      icon: <Code size={14} />
    },
    {
      title: "AZERTUFF Shopify",
      category: "E-commerce",
      image: "/placeholder.svg?height=120&width=200&text=Shopify+Store",
      icon: <ShoppingBag size={14} />
    },
    {
      title: "Instagram Campaigns",
      category: "Social Media",
      image: "/placeholder.svg?height=120&width=200&text=Instagram",
      icon: <Palette size={14} />
    }
  ]

  return (
    <div>
      <motion.div className="flex items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div
          className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${
            isDarkMode ? "bg-pink-500/20 text-pink-400" : "bg-pink-100 text-pink-600"
          }`}
        >
          <Briefcase size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold">Portfolio</h3>
          <p className={`text-sm ${isDarkMode ? "text-pink-400" : "text-pink-600"}`}>Recent Projects</p>
        </div>
      </motion.div>

      <motion.p 
        className={`mt-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        A selection of my recent web development and design projects showcasing my skills and experience.
      </motion.p>

      <motion.div
        className="mt-6 grid gap-4 md:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className={`overflow-hidden rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
            variants={item}
          >
            <div className="relative h-24 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}
              />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span
                  className={`mb-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                    isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {project.icon}
                  {project.category}
                </span>
                <span className="text-xs opacity-60">{index + 2020}</span>
              </div>
              <h4 className="font-medium text-sm">{project.title}</h4>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className={`mt-4 rounded-lg p-3 text-sm ${isDarkMode ? "bg-gray-800/60 text-gray-300" : "bg-gray-100/60 text-gray-600"}`}
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-center">Click on a card to view more details about each project</p>
      </motion.div>
    </div>
  )
}

