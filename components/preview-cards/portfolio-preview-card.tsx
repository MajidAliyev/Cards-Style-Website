"use client"

import { motion } from "framer-motion"
import { Briefcase, ArrowRight } from "lucide-react"
import Image from "next/image"

interface PortfolioPreviewCardProps {
  isDarkMode: boolean
}

export default function PortfolioPreviewCard({ isDarkMode }: PortfolioPreviewCardProps) {
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
    },
    {
      title: "AZERTUFF Shopify",
      category: "E-commerce",
      image: "/placeholder.svg?height=120&width=200&text=Shopify+Store",
    },
    {
      title: "Instagram Campaigns",
      category: "Social Media",
      image: "/placeholder.svg?height=120&width=200&text=Instagram",
    },
    {
      title: "Database Management",
      category: "IT Support",
      image: "/placeholder.svg?height=120&width=200&text=Database",
    },
    {
      title: "Content Creation",
      category: "Marketing",
      image: "/placeholder.svg?height=120&width=200&text=Content",
    },
    {
      title: "Branding Strategy",
      category: "Marketing",
      image: "/placeholder.svg?height=120&width=200&text=Branding",
    },
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
          <h3 className="text-xl font-bold">Portfolio Highlights</h3>
          <p className={`text-sm ${isDarkMode ? "text-pink-400" : "text-pink-600"}`}>Featured Projects</p>
        </div>
      </motion.div>

      <motion.div
        className="mt-6 grid gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className={`group overflow-hidden rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
            variants={item}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className="absolute bottom-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <motion.button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-black"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </div>
            <div className="p-3">
              <span
                className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs ${
                  isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                }`}
              >
                {project.category}
              </span>
              <h4 className="font-medium">{project.title}</h4>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <></>
    </div>
  )
}

