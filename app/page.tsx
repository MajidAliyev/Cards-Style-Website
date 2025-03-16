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
import { Button } from "@/components/ui/button"
import MagneticElement from "@/components/magnetic-element"
import SplineBackground from "@/components/spline-background"

// Wrap the Home component with I18nProvider
const HomePage = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [activePreview, setActivePreview] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState("en") // Default language is English
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeCardGlow, setActiveCardGlow] = useState('')
  const [showHeroImage, setShowHeroImage] = useState(true)
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null)
  const [showSplineBackground, setShowSplineBackground] = useState(false)
  const backgroundControls = useAnimation();
  const heroImageControls = useAnimation();
  const glowControls = useAnimation();

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
  const { t, i18n } = useTranslation()
  
  // Update i18n language when language state changes
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const closeModal = () => {
    setActiveModal(null)
    setClickPosition(null) // Reset click position when closing modal
  }

  const handleHoverStart = (id: string) => {
    // Since we're now using explicit IDs, we don't need the mapping
    console.log("Hover start with ID:", id);
    
    setActivePreview(id);
    setShowHeroImage(false);
  }

  const handleHoverEnd = () => {
    setActivePreview(null)
    setShowHeroImage(true)
  }

  // Open modal with portal effect
  const openModal = (modalType: string, event: React.MouseEvent) => {
    // Store the click position for the zoom effect
    setClickPosition({ x: event.clientX, y: event.clientY })
    setActiveModal(modalType)
  }
  
  // Updated navItems with simplified onClick handlers and explicit IDs
  const navItems = [
    {
      id: "about",
      label: t('navItems.about'),
      emoji: '👨‍💻',
      images: ['/images/about.png'],
      glowColor: isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.6)',
      onClick: (e: React.MouseEvent) => openModal('about', e)
    },
    {
      id: "skills",
      label: t('navItems.skills'),
      emoji: '🧠',
      images: ['/images/skills.png'],
      glowColor: isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.6)',
      onClick: (e: React.MouseEvent) => openModal('skills', e)
    },
    {
      id: "portfolio",
      label: t('navItems.portfolio'),
      emoji: '🎨',
      images: ['/images/portfolio.png'],
      glowColor: isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.6)',
      onClick: (e: React.MouseEvent) => openModal('portfolio', e)
    },
    {
      id: "work",
      label: t('navItems.work'),
      emoji: '💼',
      images: ['/images/work.png'],
      glowColor: isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.6)',
      onClick: (e: React.MouseEvent) => openModal('work', e)
    },
    {
      id: "contact",
      label: t('navItems.contact'),
      emoji: '📱',
      images: ['/images/contact.png'],
      glowColor: isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.6)',
      onClick: (e: React.MouseEvent) => openModal('contact', e)
    }
  ]

  // Get preview image based on active preview
  const getPreviewImage = () => {
    if (!activePreview) return null;
    
    const activeItem = navItems.find(item => item.label.toLowerCase() === activePreview);
    return activeItem?.images[0] || null;
  }

  // Animate glow effect when a card is hovered
  useEffect(() => {
    if (activeCardGlow) {
      glowControls.start({
        opacity: [0.7, 1, 0.7],
        scale: [0.95, 1.05, 0.95],
        transition: {
          opacity: { duration: 2, repeat: Infinity, repeatType: "reverse" },
          scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
        }
      });
    }
  }, [activeCardGlow, glowControls]);

  // Show Spline background after initial load to prevent performance issues
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplineBackground(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
        <div className="ml-4 text-xl font-medium">{t('ui.loading')}</div>
      </div>
    )
  }

  return (
    <main
      ref={mainRef}
      className={`flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12 relative overflow-hidden transition-colors duration-700 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`} 
      style={{
        backgroundColor: isDarkMode ? '#121212' : '#f8f8f8',
      }}
    >
      {/* Spline 3D Background */}
      {showSplineBackground && <SplineBackground isDarkMode={isDarkMode} />}

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 z-0 opacity-30"
        animate={backgroundControls}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20"
              : "bg-gradient-to-br from-blue-100 via-white to-purple-100"
          }`}
        />
      </motion.div>

      {/* Animated glow effect for cards */}
      {activeCardGlow && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${activeCardGlow} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              isDarkMode ? "bg-white" : "bg-gray-800"
            }`}
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [Math.random() * 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        ))}
      </div>

      {/* Add TopNotchPreview before the background gradient */}
      <TopNotchPreview 
        isVisible={!!activePreview && !activeModal} 
        preview={activePreview} 
        isDarkMode={isDarkMode}
      />

      {/* Header with language and theme controls only */}
      <div className="w-full flex justify-end items-start z-10">
        <div className="flex items-center gap-3">
      <LanguageSwitcher
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
          />
          <Button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
              isDarkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-800'
            }`}
            aria-label={t('ui.darkMode')}
            magnetic
            magneticStrength={5}
            magneticDistance={80}
            size="icon"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </Button>
        </div>
      </div>

      {/* Hero section with large image and overlapping text */}
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-6xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {(!activePreview || (activePreview && !activeModal)) && (
            <motion.div
              className="flex flex-col items-center w-full"
              initial={{ opacity: 1 }}
              animate={{ opacity: activePreview ? 0 : 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Image positioned behind text */}
              <div className="absolute top-[10%] sm:top-[20%] left-0 right-0 w-full flex justify-center items-center z-0">
                <motion.div
                  className="relative w-full max-w-[800px] h-[300px] sm:h-[400px] md:h-[600px]"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 20,
                    delay: 0.8
                  }}
                >
                  {/* Backdrop glow */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[90%] h-[70%] rounded-[100%] blur-[60px] opacity-50"
                    style={{ 
                      background: isDarkMode 
                        ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.3) 50%, rgba(236, 72, 153, 0.2) 100%)' 
                        : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(236, 72, 153, 0.1) 100%)'
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: isDarkMode ? [0.5, 0.7, 0.5] : [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                  />
                  
                  <Image
                    src="/images/about.png"
                    alt="Majid Aliyev"
                    fill
                    className="object-contain"
                    style={{ 
                      filter: `drop-shadow(0 10px 15px ${isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)'})`,
                      maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))'
                    }}
                    priority
                  />
                  
                  {/* Decorative elements - hidden on very small screens */}
                  <div className="hidden sm:block absolute top-0 left-1/4 w-1 h-20 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50" />
                  <div className="hidden sm:block absolute top-10 right-1/3 w-1 h-40 bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-30" />
                  <div className="hidden sm:block absolute top-20 left-2/3 w-1 h-30 bg-gradient-to-b from-transparent via-pink-500 to-transparent opacity-40" />
                  
                  {/* Floating particles - hidden on very small screens */}
                  <motion.div 
                    className="hidden sm:block absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-blue-400"
                    animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="hidden sm:block absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-purple-400"
                    animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                  <motion.div 
                    className="hidden sm:block absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-pink-400"
                    animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                </motion.div>
              </div>
              
              {/* Text content positioned on top of image */}
              <div className="relative z-10 mb-[200px] sm:mb-[250px] md:mb-[350px] mt-4 sm:mt-8 bg-opacity-30 rounded-2xl p-4 sm:p-8">
                <div className="relative mb-4 sm:mb-8">
                  <motion.h1 
                    className="text-4xl sm:text-5xl md:text-7xl font-bold text-center mb-4 relative"
                    style={{ 
                      textShadow: isDarkMode 
                        ? '0 0 15px rgba(255, 255, 255, 0.5)' 
                        : '0 0 15px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {Array.from(t('hero.title')).map((char, index) => (
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
                  className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8"
                >
                  <MagneticElement
                    strength={4}
                    distance={100}
                    scale={1.05}
                  >
                    <motion.a
                      href={`mailto:${t('contact.email')}`}
                      className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm ${
                        isDarkMode 
                          ? 'bg-blue-900/50 text-blue-200 hover:bg-blue-800/70' 
                          : 'bg-blue-100/80 text-blue-800 hover:bg-blue-200/90'
                      } transition-colors`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail size={12} className="sm:hidden" />
                      <Mail size={14} className="hidden sm:block" />
                      <span className="truncate max-w-[120px] sm:max-w-none">{t('contact.email')}</span>
                    </motion.a>
                  </MagneticElement>
                
                  <MagneticElement
                    strength={4}
                    distance={100}
                    scale={1.05}
                  >
                    <motion.a
                      href={`tel:${t('contact.phone')}`}
                      className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm ${
                isDarkMode
                          ? 'bg-purple-900/50 text-purple-200 hover:bg-purple-800/70' 
                          : 'bg-purple-100/80 text-purple-800 hover:bg-purple-200/90'
                      } transition-colors`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone size={12} className="sm:hidden" />
                      <Phone size={14} className="hidden sm:block" />
                      <span className="truncate max-w-[120px] sm:max-w-none">{t('contact.phone')}</span>
                    </motion.a>
                  </MagneticElement>
                
                  <MagneticElement
                    strength={4}
                    distance={100}
                    scale={1.05}
                  >
            <motion.div
                      className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm ${
                        isDarkMode 
                          ? 'bg-pink-900/50 text-pink-200' 
                          : 'bg-pink-100/80 text-pink-800'
                      }`}
                    >
                      <MapPin size={12} className="sm:hidden" />
                      <MapPin size={14} className="hidden sm:block" />
                      <span className="truncate max-w-[120px] sm:max-w-none">{t('contact.address')}</span>
                    </motion.div>
                  </MagneticElement>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Animated lines connecting to nav cards */}
      <div className="w-full max-w-6xl relative z-10 h-[50px] mb-0">
        <svg className="absolute bottom-0 left-0 w-full h-full opacity-70" viewBox="0 0 1000 50">
          <motion.path
            d="M200,50 C200,20 300,20 300,50"
            stroke={isDarkMode ? "#3b82f6" : "#8b5cf6"}
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
          />
          <motion.path
            d="M400,50 C400,10 500,10 500,50"
            stroke={isDarkMode ? "#8b5cf6" : "#ec4899"}
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.7 }}
          />
          <motion.path
            d="M600,50 C600,20 700,20 700,50"
            stroke={isDarkMode ? "#ec4899" : "#3b82f6"}
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.9 }}
          />
        </svg>
            </div>
      
      {/* Navigation cards */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 w-full max-w-6xl z-10 mt-0">
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
                    setActiveCardGlow(item.glowColor);
                    handleHoverStart(item.id);
                  }}
                  onHoverEnd={() => {
                    setActiveCardGlow('');
                    handleHoverEnd();
                  }}
                />
              ))}
      </div>

      {/* Modals with portal effect */}
      <PortalTransition 
        isOpen={activeModal === 'about'} 
        isDarkMode={isDarkMode}
        originPosition={clickPosition}
      >
        <AboutModal onClose={closeModal} isDarkMode={isDarkMode} language={language} />
      </PortalTransition>
      
      <PortalTransition 
        isOpen={activeModal === 'skills'} 
        isDarkMode={isDarkMode}
        originPosition={clickPosition}
      >
        <SkillsModal onClose={closeModal} isDarkMode={isDarkMode} language={language} />
      </PortalTransition>
      
      <PortalTransition 
        isOpen={activeModal === 'portfolio'} 
        isDarkMode={isDarkMode}
        originPosition={clickPosition}
      >
        <PortfolioModal onClose={closeModal} isDarkMode={isDarkMode} language={language} />
      </PortalTransition>
      
      <PortalTransition 
        isOpen={activeModal === 'work'} 
                  isDarkMode={isDarkMode}
        originPosition={clickPosition}
      >
        <WorkModal onClose={closeModal} isDarkMode={isDarkMode} language={language} />
      </PortalTransition>
      
      <PortalTransition 
        isOpen={activeModal === 'contact'} 
                  isDarkMode={isDarkMode}
        originPosition={clickPosition}
      >
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

