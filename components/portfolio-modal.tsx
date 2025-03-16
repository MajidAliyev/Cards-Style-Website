"use client"

import Image from "next/image"
import { ExternalLink, Github, Code, Globe, Layers, Palette } from "lucide-react"
import { useState, useEffect, useRef, useMemo } from "react"
import { useTranslation } from 'react-i18next'

interface PortfolioModalProps {
  onClose: () => void
  isDarkMode: boolean
  language: string
}

export default function PortfolioModal({ onClose, isDarkMode, language }: PortfolioModalProps) {
  const { t } = useTranslation()
  const modalRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])
  
  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [onClose])

  const projects = [
    {
      id: "1",
      title: "E-commerce Website",
      description: "A fully responsive e-commerce platform with cart functionality",
      image: "/images/portfolio/project1.jpg",
      categories: ["web", "design"],
      tags: ["React", "Node.js", "MongoDB"],
      demoLink: "https://example.com",
      codeLink: "https://github.com/example/project"
    },
    {
      id: "2",
      title: "Mobile Banking App",
      description: "A secure mobile banking application with biometric authentication",
      image: "/images/portfolio/project2.jpg",
      categories: ["mobile", "design"],
      tags: ["React Native", "Firebase", "Redux"],
      demoLink: "https://example.com",
      codeLink: "https://github.com/example/project"
    },
    {
      id: "3",
      title: "Portfolio Website",
      description: "A creative portfolio website for a photographer",
      image: "/images/portfolio/project3.jpg",
      categories: ["web", "design"],
      tags: ["HTML/CSS", "JavaScript", "GSAP"],
      demoLink: "https://example.com",
      codeLink: "https://github.com/example/project"
    },
    {
      id: "4",
      title: "Task Management App",
      description: "A productivity app for managing tasks and projects",
      image: "/images/portfolio/project4.jpg",
      categories: ["web", "mobile"],
      tags: ["Vue.js", "Express", "PostgreSQL"],
      demoLink: "https://example.com",
      codeLink: "https://github.com/example/project"
    },
    {
      id: "5",
      title: "Social Media Dashboard",
      description: "An analytics dashboard for social media management",
      image: "/images/portfolio/project5.jpg",
      categories: ["web", "design"],
      tags: ["React", "D3.js", "Node.js"],
      demoLink: "https://example.com",
      codeLink: "https://github.com/example/project"
    },
    {
      id: "6",
      title: "Fitness Tracking App",
      description: "A mobile app for tracking workouts and nutrition",
      image: "/images/portfolio/project6.jpg",
      categories: ["mobile"],
      tags: ["Flutter", "Firebase", "RESTful API"],
      demoLink: "https://example.com",
      codeLink: "https://github.com/example/project"
    },
  ]
  
  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter(project => project.categories.includes(activeFilter))
  }, [activeFilter])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal content */}
      <div
        ref={modalRef}
        className={`relative z-10 w-11/12 max-w-5xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
        style={{ 
          boxShadow: isDarkMode 
            ? '0 0 30px 10px rgba(59, 130, 246, 0.3)' 
            : '0 0 30px 10px rgba(168, 85, 247, 0.2)'
        }}
      >
        {/* Close button */}
        <button
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={onClose}
        >
          ✕
        </button>
        
        <div className="flex flex-col gap-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold mb-2">
              {t('modals.portfolio_title')}
            </h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('modals.portfolio_subtitle')}
            </p>
          </div>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-purple-600 text-white'
                  : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              <span className="flex items-center gap-2">
                <Layers size={16} />
                {t('modals.portfolio_filter_all')}
              </span>
            </button>
            
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'web'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-purple-600 text-white'
                  : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveFilter('web')}
            >
              <span className="flex items-center gap-2">
                <Globe size={16} />
                {t('modals.portfolio_filter_web')}
              </span>
            </button>
            
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'mobile'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-purple-600 text-white'
                  : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveFilter('mobile')}
            >
              <span className="flex items-center gap-2">
                <Code size={16} />
                {t('modals.portfolio_filter_mobile')}
              </span>
            </button>
            
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'design'
                ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-purple-600 text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveFilter('design')}
            >
              <span className="flex items-center gap-2">
                <Palette size={16} />
                {t('modals.portfolio_filter_design')}
              </span>
            </button>
      </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
              key={project.id}
                className={`rounded-xl overflow-hidden ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                } transition-transform duration-300 hover:scale-[1.02]`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative h-48">
                <Image
                    src={project.image}
                  alt={project.title}
                  fill
                    className="object-cover"
                  />
                  
                  {/* Overlay on hover */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isDarkMode 
                        ? 'from-blue-900/90 to-transparent' 
                        : 'from-purple-900/90 to-transparent'
                    } flex items-end justify-center p-4 transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="flex gap-3">
                      <a
                        href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label={t('modals.portfolio_live_demo')}
                  >
                    <ExternalLink size={18} />
                      </a>
                      <a
                        href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label={t('modals.portfolio_view_code')}
                  >
                    <Github size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                  <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                        className={`text-xs px-2 py-1 rounded-full ${
                          isDarkMode 
                            ? 'bg-gray-600 text-gray-300' 
                            : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className={`text-center mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('modals.portfolio_content')}
          </p>
        </div>
      </div>
    </div>
  )
}

