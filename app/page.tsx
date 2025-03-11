"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { X, Moon, Sun, Sparkles, Mail, Phone, MapPin } from "lucide-react"
import AboutModal from "@/components/about-modal"
import SkillsModal from "@/components/skills-modal"
import PortfolioModal from "@/components/portfolio-modal"
import WorkModal from "@/components/work-modal"
import ContactModal from "@/components/contact-modal"
import NavCard from "@/components/nav-card"
import LanguageSwitcher from "@/components/language-switcher"
import MouseTrail from "@/components/mouse-trail"
import Image from "next/image"
import { useTranslation } from 'react-i18next'
import I18nProvider from "@/components/i18n-provider"
import PortalTransition from "@/components/portal-transition"
import TopNotchPreview from "@/components/top-notch-preview"

// Wrap the Home component with I18nProvider
const HomePage = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [activePreview, setActivePreview] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState("en") // Default language is English
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeCardBg, setActiveCardBg] = useState('')
  const [activeCardGlow, setActiveCardGlow] = useState('')
  const [showHeroImage, setShowHeroImage] = useState(true)
  const backgroundControls = useAnimation();
  const heroImageControls = useAnimation();

  // Refs for interactive elements
  const mainRef = useRef<HTMLDivElement>(null)

  // Mouse position tracking for trail effect only
  const mouseMove = useCallback((e: MouseEvent) => {
    if (Math.abs(e.clientX - mousePosition.x) > 5 || Math.abs(e.clientY - mousePosition.y) > 5) {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }
  }, [mousePosition])

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove)
    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [mouseMove])

  // Animate background on load
  useEffect(() => {
    if (!isLoading) {
      backgroundControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 1.5, ease: "easeOut" }
      });
      
      // Start hero image animation
      heroImageControls.start({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { 
          duration: 1.2, 
          ease: [0.19, 1.0, 0.22, 1.0],
          delay: 0.5
        }
      });
    }
  }, [isLoading, backgroundControls, heroImageControls]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Type guard for translations
  const { t } = useTranslation()

  const closeModal = () => setActiveModal(null)

  const handleHoverStart = (id: string) => {
    // Map nav card label to preview ID
    const previewMap: Record<string, string> = {
      about: "about",
      skills: "skills",
      portfolio: "portfolio",
      work: "work",
      contact: "contact",
    }

    setActivePreview(previewMap[id] || id)
    setShowHeroImage(false)
  }

  const handleHoverEnd = () => {
    setActivePreview(null)
    setShowHeroImage(true)
  }

  // Open modal with portal effect
  const openModal = (modalType: string) => {
    setActiveModal(modalType)
  }
  
  // Updated navItems with simplified onClick handlers
  const navItems = [
    {
      label: t('about'),
      emoji: '👨‍💻',
      images: ['/images/about.png'],
      bgColor: '#FF5A5F',
      darkBgColor: '#8B3E40',
      glowColor: '#FF8A8F',
      darkGlowColor: '#FF5A5F',
      onClick: () => openModal('about')
    },
    {
      label: t('skills'),
      emoji: '🧠',
      images: ['/images/skills.png'],
      bgColor: '#56CCF2',
      darkBgColor: '#2D7A9E',
      glowColor: '#7FDFFF',
      darkGlowColor: '#56CCF2',
      onClick: () => openModal('skills')
    },
    {
      label: t('portfolio'),
      emoji: '🎨',
      images: ['/images/portfolio.png'],
      bgColor: '#BB6BD9',
      darkBgColor: '#6A3B7D',
      glowColor: '#D48EF6',
      darkGlowColor: '#BB6BD9',
      onClick: () => openModal('portfolio')
    },
    {
      label: t('work'),
      emoji: '💼',
      images: ['/images/work.png'],
      bgColor: '#F2994A',
      darkBgColor: '#8F5B2C',
      glowColor: '#FFBB7D',
      darkGlowColor: '#F2994A',
      onClick: () => openModal('work')
    },
    {
      label: t('contact'),
      emoji: '📬',
      images: ['/images/contact.png'],
      bgColor: '#6FCF97',
      darkBgColor: '#3E7A59',
      glowColor: '#A0EBBE',
      darkGlowColor: '#6FCF97',
      onClick: () => openModal('contact')
    }
  ]

  // Get preview image based on active preview
  const getPreviewImage = () => {
    if (!activePreview) return null;
    
    const activeItem = navItems.find(item => item.label.toLowerCase() === activePreview);
    return activeItem?.images[0] || null;
  }

  if (isLoading) {
    return (
      <div className={`flex h-screen w-full items-center justify-center ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <motion.div
          className="relative h-24 w-24"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <motion.div
            className={`absolute left-0 top-0 h-full w-full rounded-full border-4 border-t-transparent ${
              isDarkMode ? "border-blue-500" : "border-blue-600"
            }`}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            ✨
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <main
      ref={mainRef}
      className={`flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12 relative overflow-hidden transition-colors duration-700 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`} 
      style={{
        backgroundColor: activeCardBg ? activeCardBg : (isDarkMode ? '#121212' : '#f8f8f8'),
        boxShadow: activeCardGlow ? `0 0 200px 100px ${activeCardGlow}` : 'none',
        transition: 'background-color 0.7s ease, box-shadow 0.7s ease'
      }}
    >
      {/* Add TopNotchPreview before the background gradient */}
      <TopNotchPreview 
        isVisible={!!activePreview && !activeModal} 
        preview={activePreview} 
        isDarkMode={isDarkMode}
      />

      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={backgroundControls}
      >
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-radial from-gray-800/30 via-gray-900/50 to-black/80' 
            : 'bg-gradient-radial from-white/80 via-gray-50/50 to-gray-100/80'
        }`} />
        
        {/* Subtle animated patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path 
                d="M 20 0 L 0 0 0 20" 
                fill="none" 
                stroke={isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(168, 85, 247, 0.2)"} 
                strokeWidth="0.5"
              />
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)" />
              <path 
                d="M 80 0 L 0 0 0 80" 
                fill="none" 
                stroke={isDarkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(168, 85, 247, 0.3)"} 
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: isDarkMode 
              ? 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)' 
              : 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        </motion.div>

      {/* Header with language and theme controls only */}
      <div className="w-full flex justify-end items-start z-10">
        <div className="flex items-center gap-3">
      <LanguageSwitcher
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
          />
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
              isDarkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-800'
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
          </div>

      {/* Hero section with large image */}
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl mx-auto my-8 relative z-10">
        <div className="relative mb-8">
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-center mb-4 relative"
            style={{ 
              textShadow: isDarkMode 
                ? '0 0 15px rgba(255, 255, 255, 0.5)' 
                : '0 0 15px rgba(0, 0, 0, 0.2)'
            }}
          >
            {Array.from("Majid Aliyev").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.div
              className="absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                delay: 0.8, 
                duration: 0.8,
                ease: "easeOut"
              }}
            />
          </motion.h1>
        </div>

        {/* Contact links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
            <motion.a
              href="mailto:alyvmecid@gmail.com"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
              isDarkMode 
                ? 'bg-blue-900/30 text-blue-200 hover:bg-blue-800/50' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
            <Mail size={14} />
            alyvmecid@gmail.com
            </motion.a>
          
            <motion.a
              href="tel:+4915737980174"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
              isDarkMode 
                ? 'bg-purple-900/30 text-purple-200 hover:bg-purple-800/50' 
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
            <Phone size={14} />
            +49 157 37980174
          </motion.a>
          
          <motion.div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
              isDarkMode 
                ? 'bg-pink-900/30 text-pink-200' 
                : 'bg-pink-100 text-pink-800'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <MapPin size={14} />
            Sundgauallee 50, 79110 Freiburg
          </motion.div>
        </motion.div>
        
        {/* Hero image or preview */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
          <AnimatePresence mode="wait">
            {showHeroImage && (
              <motion.div
                key="hero-image"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={heroImageControls}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full overflow-hidden"
              >
                <Image
                  src="/images/about.png"
                  alt="Majid Aliyev"
                  fill
                  className="object-cover"
                />
            <motion.div
                  className="absolute inset-0 rounded-full"
              style={{
                boxShadow: isDarkMode
                      ? 'inset 0 0 30px 10px rgba(0, 0, 0, 0.5), 0 0 30px 10px rgba(59, 130, 246, 0.3)' 
                      : 'inset 0 0 30px 10px rgba(0, 0, 0, 0.2), 0 0 30px 10px rgba(168, 85, 247, 0.2)'
                  }}
                />
                
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    boxShadow: isDarkMode 
                      ? '0 0 40px 10px rgba(59, 130, 246, 0.3)' 
                      : '0 0 40px 10px rgba(168, 85, 247, 0.3)'
                  }}
                  animate={{
                    boxShadow: isDarkMode 
                      ? ['0 0 30px 5px rgba(59, 130, 246, 0.2)', '0 0 50px 15px rgba(59, 130, 246, 0.4)', '0 0 30px 5px rgba(59, 130, 246, 0.2)']
                      : ['0 0 30px 5px rgba(168, 85, 247, 0.2)', '0 0 50px 15px rgba(168, 85, 247, 0.4)', '0 0 30px 5px rgba(168, 85, 247, 0.2)']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
            )}
            
            {activePreview && !showHeroImage && (
              <motion.div
                key="preview-image"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full overflow-hidden"
              >
                <Image
                  src={getPreviewImage() || "/images/about.png"}
                  alt={activePreview}
                  fill
                  className="object-cover"
                />
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    boxShadow: isDarkMode 
                      ? 'inset 0 0 30px 10px rgba(0, 0, 0, 0.5), 0 0 30px 10px rgba(59, 130, 246, 0.3)' 
                      : 'inset 0 0 30px 10px rgba(0, 0, 0, 0.2), 0 0 30px 10px rgba(168, 85, 247, 0.2)'
                  }}
                />
                
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    boxShadow: isDarkMode 
                      ? '0 0 40px 10px rgba(59, 130, 246, 0.3)' 
                      : '0 0 40px 10px rgba(168, 85, 247, 0.3)'
                  }}
                  animate={{
                    boxShadow: isDarkMode 
                      ? ['0 0 30px 5px rgba(59, 130, 246, 0.2)', '0 0 50px 15px rgba(59, 130, 246, 0.4)', '0 0 30px 5px rgba(59, 130, 246, 0.2)']
                      : ['0 0 30px 5px rgba(168, 85, 247, 0.2)', '0 0 50px 15px rgba(168, 85, 247, 0.4)', '0 0 30px 5px rgba(168, 85, 247, 0.2)']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Preview label */}
                <motion.div
                  className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium ${
                    isDarkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-900'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {activePreview.charAt(0).toUpperCase() + activePreview.slice(1)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      </div>
      
      {/* Navigation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-6xl z-10">
        {navItems.map((item, index) => (
          <NavCard
            key={index}
            label={item.label}
            emoji={item.emoji}
            images={item.images}
            onClick={item.onClick}
            index={index}
            isDarkMode={isDarkMode}
            onHoverStart={() => {
              setActiveCardBg(isDarkMode ? item.darkBgColor : item.bgColor);
              setActiveCardGlow(isDarkMode ? item.darkGlowColor : item.glowColor);
              handleHoverStart(item.label.toLowerCase());
            }}
            onHoverEnd={() => {
              setActiveCardBg('');
              setActiveCardGlow('');
              handleHoverEnd();
            }}
          />
        ))}
      </div>
      
      {/* Modals with portal effect */}
      <PortalTransition isOpen={activeModal === 'about'} isDarkMode={isDarkMode}>
        <AboutModal onClose={closeModal} isDarkMode={isDarkMode} language={language} />
      </PortalTransition>
      
      <PortalTransition isOpen={activeModal === 'skills'} isDarkMode={isDarkMode}>
        <SkillsModal onClose={closeModal} isDarkMode={isDarkMode} language={language} />
      </PortalTransition>
      
      <PortalTransition isOpen={activeModal === 'portfolio'} isDarkMode={isDarkMode}>
        <PortfolioModal onClose={closeModal} isDarkMode={isDarkMode} language={language} />
      </PortalTransition>
      
      <PortalTransition isOpen={activeModal === 'work'} isDarkMode={isDarkMode}>
        <WorkModal onClose={closeModal} isDarkMode={isDarkMode} language={language} />
      </PortalTransition>
      
      <PortalTransition isOpen={activeModal === 'contact'} isDarkMode={isDarkMode}>
        <ContactModal onClose={closeModal} isDarkMode={isDarkMode} language={language} />
      </PortalTransition>
      
      {/* Mouse trail particles */}
      <MouseTrail isDarkMode={isDarkMode} mousePosition={mousePosition} />
    </main>
  )
}

// Export the wrapped component
export default function Home() {
  return (
    <I18nProvider>
      <HomePage />
    </I18nProvider>
  )
}

