"use client"

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, MapPin, ExternalLink, Briefcase, GraduationCap, Award } from "lucide-react"
import { useTranslation } from 'react-i18next';
import { translations } from "@/lib/translations"

interface WorkModalProps {
  onClose: () => void
  isDarkMode: boolean
  language: string
}

export default function WorkModal({ onClose, isDarkMode, language }: WorkModalProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  
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
  };

  const experiences = [
    {
      title: "Web Developer & IT Specialist",
      company: "Frauenarztpraxis Huseynova",
      period: "2022 - Present",
      location: "Schliengen, Germany",
      description: [
        "Built and maintained the practice website from scratch using HTML, CSS, and JavaScript",
        "Managed databases and provided comprehensive IT support",
        "Developed user-friendly designs based on customer needs",
        "Ensured website security and performance optimization",
      ],
      link: "https://frauenarztpraxis-huseynova.de",
      contact: {
        name: "Dr. Vafa Huseynova",
        title: "Fachärztin",
        address: "Nidauer Platz 2, 79418 Schliengen",
        phone: "07635 / 3620",
        email: "info@frauenarztpraxis-huseynova.de"
      }
    },
    {
      title: "Co-founder & Marketing Manager",
      company: "AZERTUFF LTD",
      period: "2021 - Present",
      location: "Freiburg, Germany / Baku, Azerbaijan",
      description: [
        "Managed social media presence and developed branding strategies",
        "Created and curated content for various platforms, especially Instagram",
        "Administered Shopify e-commerce platform",
        "Designed and executed targeted advertising campaigns (Meta)",
        "Provided social media management services to clients",
      ],
      link: "#",
      contact: {
        name: "Nihad Zarbaliyev",
        title: "Co-founder",
        address: "Baku, Azerbaijan",
        phone: "+994513225878",
        email: "nihadzarbeliyev48@gmail.com"
      }
    },
    {
      title: "Media Design Student (Upcoming)",
      company: "IU Internationale Hochschule",
      period: "Starting April 2025",
      location: "Freiburg, Germany",
      description: [
        "Dual study program in Media Design",
        "Focus on web design, app design, and UX/UI design",
        "Combining technical knowledge with artistic design principles",
        "Developing professional qualifications for future career growth",
      ],
      link: "https://www.iu.de/",
    },
  ]

  const projects = [
    {
      title: "Website Development & Maintenance",
      company: "Frauenarztpraxis Huseynova",
      description: "Responsible for the complete development and maintenance of the website for Frauenarztpraxis Huseynova in Schliengen. The website was rebuilt from scratch using HTML, CSS, and JavaScript. Additionally, handled database management and provided IT support for the practice.",
      skills: "Technical knowledge in web development, understanding of customer needs, and user-friendly design principles."
    },
    {
      title: "Social Media Management & Branding",
      company: "AZERTUFF LTD",
      description: "Managed social media accounts, created and optimized advertising campaigns (Meta), and developed branding strategies. Focused on helping businesses grow their reach and strengthen their brand presence through targeted advertising and content creation.",
      skills: "Social media management, branding, content creation, and advertising campaign optimization."
    },
    {
      title: "Shopify Store Development & Optimization",
      company: "AZERTUFF LTD",
      description: "Developed and optimized Shopify stores from scratch, including design, product management, and technical implementation. Created ready-to-sell Shopify stores to help businesses quickly and professionally enter the e-commerce market.",
      skills: "Shopify store development, e-commerce optimization, and product management."
    },
    {
      title: "Mindstorms EV3 Robot Project",
      company: "Personal Project",
      description: "Worked on a project involving the Mindstorms EV3 robot. Developed both the mechanical design and programming of the robot to complete specific tasks. The robot successfully navigated a predefined course and performed various tasks using added components.",
      skills: "Mechanical design, robotics programming, and problem-solving."
    },
    {
      title: "Basics of Coding Project",
      company: "Educational Project",
      description: "Developed a project aimed at introducing students to the basics of programming. The project consisted of eight lessons designed to teach students their first steps in coding. Suitable for both classroom and extracurricular activities.",
      skills: "Teaching programming basics, curriculum development, and educational project design."
    },
    {
      title: "Nerdle Game (C++ Console Game)",
      company: "Programming Project",
      description: "Implemented the Nerdle Game using console graphics in C++. The goal of the game is to correctly guess a randomly generated mathematical equation through user input. The game mechanics, display, and input were separated into distinct functions, and a TerminalManager class was used to manage the display. Unit tests were implemented for game logic and key controls.",
      skills: "C++ programming, game development, console graphics, unit testing, code optimization, and clean code practices."
    }
  ]

  // Animation for timeline line based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        ref={containerRef}
        className={`relative z-10 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
        style={{ 
          boxShadow: isDarkMode 
            ? '0 0 30px 10px rgba(59, 130, 246, 0.3)' 
            : '0 0 30px 10px rgba(168, 85, 247, 0.2)'
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={contentVariants}
      >
        {/* Close button */}
        <motion.button
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={onClose}
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
              Work Experience
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
          
          {/* Work experience content */}
          <div className="grid grid-cols-1 gap-6 relative">
            {/* Animated timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block">
              <motion.div
                className={`h-full w-full ${
                  isDarkMode ? 'bg-gradient-to-b from-blue-400 to-purple-500' : 'bg-gradient-to-b from-purple-400 to-blue-500'
                }`}
                style={{ height: lineHeight }}
              />
            </div>

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative md:pl-16"
              >
                <motion.div
                  className={`absolute left-0 top-0 hidden md:flex h-6 w-6 items-center justify-center rounded-full ${
                    isDarkMode ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-purple-400 to-blue-500'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(124, 58, 237, 0)",
                      "0 0 0 10px rgba(124, 58, 237, 0)",
                      "0 0 0 0 rgba(124, 58, 237, 0)",
                    ],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                  }}
                />

                <motion.div
                  className={`rounded-lg border p-5 transition-all hover:shadow-md ${
                    isDarkMode
                      ? "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{exp.title}</h3>
                    {exp.link && (
                      <motion.a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 text-sm font-medium ${
                          isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-purple-600 hover:text-purple-800"
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        Company Website <ExternalLink size={14} />
                      </motion.a>
                    )}
                  </div>
                  <h4 className={`text-lg font-semibold ${
                    isDarkMode ? "text-blue-400" : "text-purple-600"
                  }`}>{exp.company}</h4>

                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <ul className={`mt-3 space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <span className={`mr-2 ${isDarkMode ? "text-white" : "text-black"}`}>•</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  
                  {exp.contact && (
                    <motion.div
                      className={`mt-4 pt-3 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <h5 className="text-sm font-medium mb-1">Reference Contact:</h5>
                      <div className="text-xs space-y-1">
                        <p>{exp.contact.name}, {exp.contact.title}</p>
                        {exp.contact.address && <p>{exp.contact.address}</p>}
                        {exp.contact.phone && <p>Phone: {exp.contact.phone}</p>}
                        {exp.contact.email && <p>Email: {exp.contact.email}</p>}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Projects section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className={isDarkMode ? "text-blue-400" : "text-purple-600"} />
              <h3 className="text-xl font-semibold">Key Projects & Responsibilities</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.slice(0, 4).map((project, index) => (
                <motion.div
                  key={project.title}
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                >
                  <h4 className="font-semibold">{project.title}</h4>
                  <p className={`text-sm ${isDarkMode ? "text-blue-300" : "text-purple-600"}`}>{project.company}</p>
                  <p className="text-sm mt-2">{project.description}</p>
                  <div className="mt-2 pt-2 border-t border-dashed border-gray-300">
                    <p className="text-xs font-medium">Skills Gained:</p>
                    <p className="text-xs">{project.skills}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className={isDarkMode ? "text-blue-400" : "text-purple-600"} />
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <h4 className="font-semibold">Albert-Ludwigs Universität</h4>
                <p className={`text-sm ${isDarkMode ? "text-blue-300" : "text-purple-600"}`}>Freiburg, Germany</p>
                <p className="text-sm mt-1">B.Sc. Informatik (begun), switching to B.Sc. Embedded Systems Engineering</p>
              </motion.div>
              
              <motion.div
                className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <h4 className="font-semibold">Azerbaijan Diplomatic Academy</h4>
                <p className={`text-sm ${isDarkMode ? "text-blue-300" : "text-purple-600"}`}>Baku, Azerbaijan</p>
                <p className="text-sm mt-1">12th grade, GPA: 3.28/4.00 (US system), 1.7 (German system)</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Motivation section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className={`mt-8 p-5 rounded-xl ${isDarkMode ? "bg-blue-900/20" : "bg-purple-50"}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Award className={isDarkMode ? "text-blue-400" : "text-purple-600"} />
              <h3 className="text-xl font-semibold">My Motivation</h3>
            </div>
            
            <p className="text-sm">
              My choice of Media Design stems from my desire to combine technical knowledge with artistic design principles. 
              Throughout my studies and professional development, I've discovered my passion for web design, app design, and UX/UI design. 
              I value my skills in this area highly and am confident that through dual studies at IU, I can further develop my qualifications 
              and shape my professional future in these forward-looking industries.
            </p>
            
            <p className="text-sm mt-3">
              My colleagues appreciate my flexibility, creativity, and problem-solving abilities when dealing with challenging topics. 
              I am a sociable and team-oriented person with a positive attitude towards new challenges and continuous learning. 
              My colleagues and friends consider me reliable, communicative, and open to new ideas.
            </p>
          </motion.div>

          {/* Interactive timeline visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-12 flex h-20 items-center justify-center overflow-hidden"
          >
            <div className={`relative h-1 w-full max-w-2xl ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
              {experiences.map((exp, index) => {
                const position = index / (experiences.length - 1)

                return (
                  <motion.div
                    key={exp.company}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${position * 100}%` }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.div
                      className={`h-4 w-4 rounded-full ${
                        isDarkMode ? "bg-gradient-to-r from-blue-400 to-purple-500" : "bg-gradient-to-r from-purple-400 to-blue-500"
                      }`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        delay: index * 0.5,
                      }}
                    />
                    <div
                      className={`absolute -bottom-8 left-1/2 w-max -translate-x-1/2 text-xs font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {exp.period.split(" - ")[0]}
                    </div>
                  </motion.div>
                )
              })}
              <motion.div className="absolute right-0 top-1/2 -translate-y-1/2" whileHover={{ scale: 1.2 }}>
                <motion.div
                  className={`h-4 w-4 rounded-full ${
                    isDarkMode ? "bg-gradient-to-r from-blue-400 to-purple-500" : "bg-gradient-to-r from-purple-400 to-blue-500"
                  }`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    delay: experiences.length * 0.5,
                  }}
                />
                <div
                  className={`absolute -bottom-8 left-1/2 w-max -translate-x-1/2 text-xs font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Future
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

