"use client"

import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

interface AboutModalProps {
  onClose: () => void
  isDarkMode: boolean
  language: string
}

export default function AboutModal({ onClose, isDarkMode, language }: AboutModalProps) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Modal content */}
      <div
        ref={containerRef}
        className={`relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl p-4 sm:p-6 md:p-8 ${
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
          className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={onClose}
        >
          ✕
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left column with image and contact info */}
          <div className="md:col-span-1">
            {/* Profile image - smaller on mobile */}
            <div className={`rounded-xl overflow-hidden mb-4 sm:mb-6 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              {isMobile ? (
                <div className="flex justify-center">
                  <Image
                    src="/images/profile.jpg"
                    alt="Majid Aliyev"
                    width={200}
                    height={200}
                    className="w-40 h-40 object-cover rounded-full"
                  />
                </div>
              ) : (
                <Image
                  src="/images/profile.jpg"
                  alt="Majid Aliyev"
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
            
            <div className={`p-3 sm:p-4 rounded-xl ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{t('contact.title')}</h3>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Mail size={isMobile ? 14 : 16} />
                  </div>
                  <a href={`mailto:${t('contact.email')}`} className="text-sm sm:text-base hover:underline truncate">
                    {t('contact.email')}
                  </a>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                  }`}>
                    <Phone size={isMobile ? 14 : 16} />
                  </div>
                  <a href={`tel:${t('contact.phone')}`} className="text-sm sm:text-base hover:underline">
                    {t('contact.phone')}
                  </a>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'
                  }`}>
                    <MapPin size={isMobile ? 14 : 16} />
                  </div>
                  <span className="text-sm sm:text-base">{t('contact.address')}</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
                    } transition-colors`}
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={isMobile ? 14 : 16} />
                  </a>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
                    } transition-colors`}
                    aria-label="GitHub"
                  >
                    <Github size={isMobile ? 14 : 16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column with about content */}
          <div className="md:col-span-2 mt-4 md:mt-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{t('modals.about_title')}</h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('modals.about_subtitle1')}</h3>
                <p className={`mb-2 sm:mb-3 text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('modals.about_p1')}
                </p>
                <p className={`mb-2 sm:mb-3 text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('modals.about_p2')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('modals.about_subtitle2')}</h3>
                <p className={`mb-2 sm:mb-3 text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('modals.about_p3')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('modals.key_skills')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'UI/UX Design'].map((skill) => (
                    <div 
                      key={skill}
                      className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${
                        isDarkMode 
                          ? 'bg-blue-900/30 text-blue-300' 
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('modals.about_education_title')}</h3>
                  <ul className={`list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>{t('modals.about_education1')}</li>
                    <li>{t('modals.about_education2')}</li>
                  </ul>
                </div>
                
              <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('modals.about_languages_title')}</h3>
                  <ul className={`list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>{t('modals.about_language1')}</li>
                    <li>{t('modals.about_language2')}</li>
                    <li>{t('modals.about_language3')}</li>
                    <li>{t('modals.about_language4')}</li>
                  </ul>
                </div>
              </div>
            </div>
      </div>
        </div>
      </div>
    </div>
  )
}

