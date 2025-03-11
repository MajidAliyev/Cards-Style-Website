"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { translations } from "@/lib/translations"
import { useTranslation } from 'react-i18next'
import { Languages, Code, Heart, GraduationCap } from "lucide-react"

interface AboutModalProps {
  onClose: () => void
  isDarkMode: boolean
  language: string
}

export default function AboutModal({ onClose, isDarkMode, language }: AboutModalProps) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.8, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.95, 0.9])

  const [animationPhase, setAnimationPhase] = useState<'entering' | 'active' | 'exiting'>('entering')
  const [distortionPoints, setDistortionPoints] = useState<Array<{x: number, y: number, angle: number, speed: number}>>([])
  
  // Generate random distortion points for non-Euclidean effect
  useEffect(() => {
    const points = Array.from({ length: 8 }, () => ({
      x: Math.random(),
      y: Math.random(),
      angle: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.8
    }))
    setDistortionPoints(points)
  }, [])
  
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
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && animationPhase === 'active') {
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
  
  // Non-Euclidean distortion effect for SVG filter
  const generateTurbulence = () => {
    return distortionPoints.map((point, index) => {
      const baseFrequency = 0.01 + (animationPhase === 'entering' || animationPhase === 'exiting' ? 0.05 : 0.01)
      const seed = index * 10
      return `
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="${baseFrequency}" 
          numOctaves="2" 
          seed="${seed}" 
          result="turbulence${index}" 
        />
        <feDisplacementMap 
          in="SourceGraphic" 
          in2="turbulence${index}" 
          scale="${animationPhase === 'entering' || animationPhase === 'exiting' ? 50 : 10}" 
          xChannelSelector="R" 
          yChannelSelector="G" 
          result="displace${index}" 
        />
      `
    }).join('')
  }
  
  // Portal swirl effect for SVG filter
  const generateSwirl = () => {
    const intensity = animationPhase === 'entering' ? 10 : 
                     animationPhase === 'exiting' ? -10 : 0
    return `
      <feConvolveMatrix order="3" kernelMatrix="0 -1 0 -1 4 -1 0 -1 0" result="sharpen"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="highContrast"/>
      <feMorphology operator="dilate" radius="${animationPhase === 'active' ? 0 : 2}" result="dilate"/>
      <feDisplacementMap in="SourceGraphic" in2="dilate" scale="${intensity}" xChannelSelector="R" yChannelSelector="G"/>
    `
  }
  
  // Glow effect for SVG filter
  const generateGlow = () => {
    const blurRadius = animationPhase === 'entering' ? 15 : 
                      animationPhase === 'exiting' ? 20 : 5
    return `
      <feGaussianBlur in="SourceGraphic" stdDeviation="${blurRadius}" result="blur"/>
      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="glow"/>
      <feBlend in="SourceGraphic" in2="glow" mode="screen"/>
    `
  }
  
  // Combined SVG filter for portal effect
  const portalFilter = `
    <filter id="portalEffect" x="-50%" y="-50%" width="200%" height="200%">
      ${generateTurbulence()}
      ${generateSwirl()}
      ${generateGlow()}
    </filter>
  `
  
  // Animation variants for modal content
  const contentVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.3,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
      y: -50,
      transition: { 
        duration: 0.4,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    }
  }
  
  // Animation variants for the portal backdrop
  const backdropVariants = {
    hidden: { 
      opacity: 0,
      scale: 0,
      borderRadius: "100%"
    },
    visible: { 
      opacity: 1,
      scale: 1,
      borderRadius: "0%",
      transition: { 
        duration: 0.8,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0,
      borderRadius: "100%",
      transition: { 
        duration: 0.6,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    }
  }
  
  // Animation variants for the portal ring
  const ringVariants = {
    hidden: { 
      opacity: 0,
      scale: 0,
      rotate: -180
    },
    visible: { 
      opacity: [0, 0.8, 0.4],
      scale: [0, 1.2, 1],
      rotate: 0,
      transition: { 
        duration: 1.2,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    },
    exit: { 
      opacity: [0.4, 0.8, 0],
      scale: [1, 1.2, 0],
      rotate: 180,
      transition: { 
        duration: 0.8,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* SVG Filters */}
      <svg className="absolute w-0 h-0">
        <defs dangerouslySetInnerHTML={{ __html: portalFilter }} />
      </svg>
      
      {/* Portal backdrop */}
      <motion.div 
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"
        initial="hidden"
        animate={animationPhase === 'exiting' ? 'exit' : 'visible'}
        variants={backdropVariants}
      />
      
      {/* Portal ring effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial="hidden"
        animate={animationPhase === 'exiting' ? 'exit' : 'visible'}
        variants={ringVariants}
      >
        <div className={`w-[120%] h-[120%] rounded-full border-4 border-opacity-60 ${
          isDarkMode ? 'border-blue-500' : 'border-purple-500'
        }`} style={{ 
          boxShadow: isDarkMode 
            ? '0 0 100px 20px rgba(59, 130, 246, 0.6), inset 0 0 60px 10px rgba(59, 130, 246, 0.4)' 
            : '0 0 100px 20px rgba(168, 85, 247, 0.6), inset 0 0 60px 10px rgba(168, 85, 247, 0.4)'
        }} />
      </motion.div>
      
      {/* Modal content with non-Euclidean distortion */}
      <motion.div
        ref={containerRef}
        className={`relative z-10 w-11/12 max-w-5xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
        style={{ 
          filter: 'url(#portalEffect)',
          boxShadow: isDarkMode 
            ? '0 0 30px 10px rgba(59, 130, 246, 0.3)' 
            : '0 0 30px 10px rgba(168, 85, 247, 0.2)'
        }}
        initial="hidden"
        animate={animationPhase === 'exiting' ? 'exit' : 'visible'}
        variants={contentVariants}
      >
        {/* Close button with portal effect */}
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
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Profile image with portal effect */}
          <motion.div 
            className="flex-shrink-0 w-full md:w-1/3 relative"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/about.png"
                alt="Majid Aliyev"
                fill
                className="object-cover"
              />
              
              {/* Animated portal border */}
              <motion.div 
                className="absolute inset-0 border-4 rounded-2xl pointer-events-none"
                style={{ 
                  borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.6)' : 'rgba(168, 85, 247, 0.6)',
                  boxShadow: isDarkMode 
                    ? 'inset 0 0 20px 5px rgba(59, 130, 246, 0.3)' 
                    : 'inset 0 0 20px 5px rgba(168, 85, 247, 0.2)'
                }}
                animate={{ 
                  boxShadow: isDarkMode 
                    ? ['inset 0 0 10px 2px rgba(59, 130, 246, 0.2)', 'inset 0 0 30px 8px rgba(59, 130, 246, 0.4)', 'inset 0 0 10px 2px rgba(59, 130, 246, 0.2)']
                    : ['inset 0 0 10px 2px rgba(168, 85, 247, 0.1)', 'inset 0 0 30px 8px rgba(168, 85, 247, 0.3)', 'inset 0 0 10px 2px rgba(168, 85, 247, 0.1)']
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
            
            {/* Contact information */}
            <motion.div
              className={`mt-4 p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <p>Sundgauallee 50</p>
                <p>79110 Freiburg, Germany</p>
                <p>alyvmecid@gmail.com</p>
                <p>+49 157 37980174</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Content with staggered animation */}
          <div className="flex-grow">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              About Me
        </motion.h2>

        <motion.div
              className="space-y-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <p className="text-lg">
                As a Web Developer and IT Specialist at Frauenarztpraxis Huseynova in Schliengen, 
                I was responsible for the complete website development and maintenance. I rebuilt 
                the practice website from scratch using HTML, CSS, and JavaScript, managed databases, 
                and provided comprehensive IT support.
              </p>
              <p className="text-lg">
                As Co-founder and Marketing Manager at AZERTUFF LTD, I gained extensive experience 
                in social media management, branding, and content creation. I managed Shopify e-commerce 
                platforms, created and optimized advertising campaigns, and developed effective branding 
                strategies to help businesses grow their online presence.
              </p>
              <p className="text-lg">
                My choice of Media Design stems from my desire to combine technical knowledge with artistic 
                design principles. Throughout my studies and professional development, I've discovered my 
                passion for web design, app design, and UX/UI design.
              </p>
        </motion.div>

            {/* Education section */}
        <motion.div
              className="mt-6"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className={isDarkMode ? "text-blue-400" : "text-purple-500"} />
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              
              <div className="space-y-3 ml-7">
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <h4 className="font-medium">Albert-Ludwigs Universität, Freiburg</h4>
                  <p className="text-sm">B.Sc. Informatik (begun), switching to B.Sc. Embedded Systems Engineering</p>
                </div>
                
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <h4 className="font-medium">Azerbaijan Diplomatic Academy (12th grade)</h4>
                  <p className="text-sm">GPA: 3.28/4.00 (US system), 1.7 (German system)</p>
                </div>
                
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <h4 className="font-medium">School Nr. 26 (11th grade)</h4>
                  <p className="text-sm">Baku, Azerbaijan</p>
                </div>
              </div>
            </motion.div>
            
            {/* Languages section */}
            <motion.div 
              className="mt-6"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Languages className={isDarkMode ? "text-blue-400" : "text-purple-500"} />
                <h3 className="text-xl font-semibold">Languages</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 ml-7">
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <h4 className="font-medium">Azerbaijani</h4>
                  <p className="text-sm">Native</p>
                </div>
                
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <h4 className="font-medium">Turkish</h4>
                  <p className="text-sm">C2 (Native)</p>
                </div>
                
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <h4 className="font-medium">English</h4>
                  <p className="text-sm">C1</p>
                </div>
                
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <h4 className="font-medium">German</h4>
                  <p className="text-sm">C1 (Telc C1)</p>
                </div>
                
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <h4 className="font-medium">Russian</h4>
                  <p className="text-sm">B1</p>
                </div>
              </div>
        </motion.div>
            
            {/* Hobbies section */}
            <motion.div 
              className="mt-6"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Heart className={isDarkMode ? "text-blue-400" : "text-purple-500"} />
                <h3 className="text-xl font-semibold">Hobbies</h3>
      </div>

              <div className="flex flex-wrap gap-2 ml-7">
                {['Football', 'Traveling', 'Music', 'DJing', 'Photography'].map((hobby, index) => (
                  <motion.span
                    key={hobby}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode ? 'bg-blue-900 bg-opacity-50 text-blue-200' : 'bg-purple-100 text-purple-800'
                    }`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: 1.1 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: isDarkMode 
                        ? '0 0 8px 2px rgba(59, 130, 246, 0.5)' 
                        : '0 0 8px 2px rgba(168, 85, 247, 0.3)'
                    }}
                  >
                    {hobby}
                  </motion.span>
                ))}
              </div>
        </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

