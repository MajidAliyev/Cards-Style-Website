"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Code, Globe, Layers, Palette } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useTranslation } from 'react-i18next'

interface PortfolioModalProps {
  onClose: () => void
  isDarkMode: boolean
  language: string
}

export default function PortfolioModal({ onClose, isDarkMode, language }: PortfolioModalProps) {
  const { t } = useTranslation()
  const modalRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [animationPhase, setAnimationPhase] = useState<'entering' | 'active' | 'exiting'>('entering')

  const filters = [
    "All",
    "Web",
    "E-commerce",
    "Social Media",
    "Design",
    "Programming",
  ]

  const projects = [
    {
      id: "project1",
      title: "Frauenarztpraxis Website",
      description:
        "Complete website development for a medical practice, built from scratch using HTML, CSS, and JavaScript.",
      image: "/images/portfolio.png",
      tags: ["Web", "Design"],
      link: "https://frauenarztpraxis-huseynova.de",
      github: "#",
    },
    {
      id: "project2",
      title: "AZERTUFF Shopify Store",
      description:
        "E-commerce platform setup and management using Shopify, including product listings and payment integration.",
      image: "/images/portfolio.png",
      tags: ["E-commerce", "Web"],
      link: "#",
      github: "#",
    },
    {
      id: "project3",
      title: "Instagram Marketing Campaigns",
      description: "Strategic social media campaigns with content creation, scheduling, and performance analysis.",
      image: "/images/portfolio.png",
      tags: ["Social Media", "Design"],
      link: "#",
      github: "#",
    },
    {
      id: "project4",
      title: "Nerdle Game (C++ Console)",
      description: "Implementation of the Nerdle Game using console graphics in C++, featuring unit tests and clean code practices.",
      image: "/images/portfolio.png",
      tags: ["Programming"],
      link: "#",
      github: "#",
    },
    {
      id: "project5",
      title: "Mindstorms EV3 Robot Project",
      description: "Development of both mechanical design and programming for a robot that navigates predefined courses.",
      image: "/images/portfolio.png",
      tags: ["Programming", "Design"],
      link: "#",
      github: "#",
    },
    {
      id: "project6",
      title: "Basics of Coding Project",
      description: "Educational project with eight lessons designed to teach students their first steps in coding.",
      image: "/images/portfolio.png",
      tags: ["Programming", "Web"],
      link: "#",
      github: "#",
    },
  ]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.tags.includes(activeFilter))

  // Handle animation phases
  useEffect(() => {
    // Set to active after entering animation completes
    const enterTimer = setTimeout(() => {
      setAnimationPhase('active')
    }, 1000)
    
    return () => clearTimeout(enterTimer)
  }, [])
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && animationPhase === 'active') {
        handleClose()
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [animationPhase])
  
  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && animationPhase === 'active') {
        handleClose()
      }
    }
    
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [animationPhase])
  
  // Controlled close with exit animation
  const handleClose = () => {
    setAnimationPhase('exiting')
    setTimeout(() => {
      onClose()
    }, 800)
  }
  
  // Animation variants for modal content
  const contentVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: { 
        duration: 0.4,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      {/* Modal content */}
      <motion.div
        ref={modalRef}
        className={`relative z-10 w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
        style={{ 
          boxShadow: isDarkMode 
            ? '0 0 30px 10px rgba(59, 130, 246, 0.3)' 
            : '0 0 30px 10px rgba(168, 85, 247, 0.2)'
        }}
        initial="hidden"
        animate={animationPhase === 'exiting' ? 'exit' : 'visible'}
        exit="exit"
        variants={contentVariants}
      >
        {/* Close button */}
        <motion.button
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={handleClose}
          whileHover={{ 
            scale: 1.1,
            rotate: 90,
            boxShadow: isDarkMode 
              ? '0 0 10px 2px rgba(59, 130, 246, 0.5)' 
              : '0 0 10px 2px rgba(168, 85, 247, 0.4)'
          }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>
        
        <div className="flex flex-col gap-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              My Portfolio
              <motion.div 
                className={`absolute -bottom-2 left-0 h-1 ${
                  isDarkMode ? 'bg-blue-500' : 'bg-purple-500'
                } rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </h2>
          </motion.div>
          
          {/* Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-6"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? isDarkMode
                      ? 'bg-blue-500 text-white'
                      : 'bg-purple-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Projects grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`group relative overflow-hidden rounded-xl ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  } transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: isDarkMode
                      ? '0 15px 30px -10px rgba(0, 0, 0, 0.5)'
                      : '0 15px 30px -10px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay with tags */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isDarkMode
                        ? 'from-gray-900/90 to-transparent'
                        : 'from-gray-800/80 to-transparent'
                    }`}>
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              isDarkMode
                                ? 'bg-blue-500/70 text-white'
                                : 'bg-purple-500/70 text-white'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Project info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {project.description}
                    </p>
                    
                    {/* Project links */}
                    <div className="mt-4 flex gap-3">
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            isDarkMode
                              ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                              : 'bg-purple-500/20 text-purple-700 hover:bg-purple-500/30'
                          } transition-colors`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Globe size={14} />
                          Visit Site
                        </motion.a>
                      )}
                      
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            isDarkMode
                              ? 'bg-gray-600/50 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          } transition-colors`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={14} />
                          Code
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <Layers size={24} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                No projects match the selected filter. Try another category.
              </p>
            </motion.div>
          )}
          
          {/* Skills section */}
          <motion.div
            className="mt-8 pt-6 border-t border-dashed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Code className={isDarkMode ? "text-blue-400" : "text-purple-600"} />
              <h3 className="text-xl font-semibold">Technologies I Use</h3>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {[
                'HTML/CSS/JS', 'React', 'Next.js', 'TypeScript', 'Python', 'C++',
                'Shopify', 'MySQL', 'Tailwind CSS', 'Framer Motion', 'Adobe Creative Suite',
                'UI/UX Design', 'Responsive Design', 'SEO Optimization'
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.9 + index * 0.03,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Call to action */}
          <motion.div
            className={`mt-8 p-5 rounded-xl text-center ${
              isDarkMode ? 'bg-blue-900/20' : 'bg-purple-50'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h3 className="text-lg font-semibold mb-2">Interested in working together?</h3>
            <p className="mb-4">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <motion.button
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  onClose();
                  // You would need to add logic here to open the contact modal
                }, 100);
              }}
              className={`px-6 py-2 rounded-full font-medium ${
                isDarkMode
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

