"use client"

import { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, ExternalLink, Briefcase, GraduationCap, Award } from "lucide-react"
import { useTranslation } from 'react-i18next';

interface WorkModalProps {
  onClose: () => void
  isDarkMode: boolean
  language: string
}

export default function WorkModal({ onClose, isDarkMode, language }: WorkModalProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null)
  
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
      ],
      link: "https://www.iu.de/",
      contact: null
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal content */}
      <div
        ref={containerRef}
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
              {t('modals.work_title')}
            </h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('modals.work_content')}
            </p>
        </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div 
              className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 ${
                isDarkMode ? 'bg-blue-600' : 'bg-purple-600'
              } transform md:translate-x-[-50%]`}
            />
            
            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div 
                    className={`absolute left-0 md:left-1/2 top-0 w-5 h-5 rounded-full border-4 ${
                      isDarkMode 
                        ? 'bg-gray-800 border-blue-600' 
                        : 'bg-white border-purple-600'
                    } transform translate-x-[-50%] md:translate-x-[-50%]`}
                  />
                  
                  {/* Content */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 
                      ? 'md:mr-auto md:pl-0 md:pr-8' 
                      : 'md:ml-auto md:pl-8 md:pr-0'
                  } pl-8`}>
                    <div 
                      className={`p-6 rounded-xl ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}
                    >
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-xl font-bold">{experience.title}</h3>
                          <h4 className={`text-lg font-medium ${
                            isDarkMode ? 'text-blue-400' : 'text-purple-600'
                          }`}>
                            {experience.company}
                          </h4>
              </div>
                        
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                              {experience.period}
                            </span>
                </div>
                          
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                              {experience.location}
                            </span>
                </div>
              </div>

                        <ul className={`list-disc list-inside space-y-1 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {experience.description.map((item, i) => (
                            <li key={i}>{item}</li>
                ))}
              </ul>
                        
                        {experience.link && (
                          <a 
                            href={experience.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 ${
                              isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-purple-600 hover:text-purple-700'
                            }`}
                          >
                            <ExternalLink size={16} />
                            <span>Visit Website</span>
                          </a>
                        )}
                        
                        {experience.contact && (
                          <div className={`mt-2 p-4 rounded-lg text-sm ${
                            isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                          }`}>
                            <h5 className="font-medium mb-2">Contact Reference:</h5>
                            <p>{experience.contact.name}, {experience.contact.title}</p>
                            <p>{experience.contact.email}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className={isDarkMode ? 'text-blue-400' : 'text-purple-600'} />
              Education
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h4 className="text-lg font-bold">Albert-Ludwigs Universität, Freiburg</h4>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Computer Science (2023 - Present)
                </p>
                <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Focus on software development, algorithms, and data structures.
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h4 className="text-lg font-bold">Azerbaijan Diplomatic Academy</h4>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  International Relations (2019 - 2021)
                </p>
                <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Studied international relations and diplomacy before transitioning to tech.
                </p>
              </div>
            </div>
          </div>
          
          {/* Certifications section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className={isDarkMode ? 'text-blue-400' : 'text-purple-600'} />
              Certifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h4 className="text-lg font-bold">Meta Social Media Marketing Professional</h4>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Meta (2022)
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h4 className="text-lg font-bold">Web Development Bootcamp</h4>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Udemy (2021)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

