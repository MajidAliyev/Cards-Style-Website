"use client"

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { translations } from "@/lib/translations";
import { Code, Palette, Database, Globe, Cpu, Lightbulb } from "lucide-react";

interface SkillsModalProps {
  onClose: () => void;
  isDarkMode: boolean;
  language: string;
}

// Skill data with progress values
const technicalSkills = [
  { name: 'HTML/CSS/JS', progress: 95, icon: '🌐' },
  { name: 'React', progress: 85, icon: '⚛️' },
  { name: 'TypeScript', progress: 80, icon: '🔷' },
  { name: 'Next.js', progress: 82, icon: '▲' },
  { name: 'Python', progress: 85, icon: '🐍' },
  { name: 'MySQL', progress: 88, icon: '🗄️' },
  { name: 'C++', progress: 75, icon: '⚙️' },
  { name: 'Flutter', progress: 70, icon: '📱' },
];

const designSkills = [
  { name: 'UI/UX Design', progress: 85, icon: '🎨' },
  { name: 'Adobe Photoshop', progress: 80, icon: '📸' },
  { name: 'Adobe Illustrator', progress: 75, icon: '✏️' },
  { name: 'Figma', progress: 82, icon: '🖌️' },
];

const marketingSkills = [
  { name: 'Social Media Management', progress: 92, icon: '📱' },
  { name: 'Content Creation', progress: 90, icon: '📝' },
  { name: 'Branding', progress: 88, icon: '🏷️' },
  { name: 'Meta Ads', progress: 85, icon: '📈' },
  { name: 'Shopify', progress: 90, icon: '🛒' },
];

export default function SkillsModal({ onClose, isDarkMode, language }: SkillsModalProps) {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'technical' | 'design' | 'marketing'>('technical');
  
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
  
  // Animation variants for skill bars
  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (progress: number) => ({
      width: `${progress}%`,
      transition: { 
        duration: 1.2,
        delay: 0.5,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    })
  };
  
  // Animation variants for skill icons
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.8
      }
    },
    hover: { 
      scale: 1.2, 
      rotate: 10,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Get active skills based on selected tab
  const getActiveSkills = () => {
    switch (activeTab) {
      case 'technical':
        return technicalSkills;
      case 'design':
        return designSkills;
      case 'marketing':
        return marketingSkills;
      default:
        return technicalSkills;
    }
  };

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
  
  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal content */}
      <motion.div
        ref={modalRef}
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
        <button
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={onClose}
        >
          ✕
        </button>
        
        <h2 className="text-3xl font-bold mb-6">{t('modals.skills_title')}</h2>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'technical'
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-purple-600 text-white'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('technical')}
          >
            <span className="flex items-center gap-2">
              <Code size={18} />
              Technical
            </span>
          </button>
          
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'design'
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-purple-600 text-white'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('design')}
          >
            <span className="flex items-center gap-2">
              <Palette size={18} />
              Design
            </span>
          </button>
          
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'marketing'
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-purple-600 text-white'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('marketing')}
          >
            <span className="flex items-center gap-2">
              <Globe size={18} />
              Marketing
            </span>
          </button>
        </div>
        
        {/* Skills list */}
          <div className="space-y-6">
          {getActiveSkills().map((skill, index) => (
              <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{skill.icon}</span>
                  <span className="font-medium">{skill.name}</span>
                </div>
                <span>{skill.progress}%</span>
              </div>
              
              <div 
                className={`w-full h-2 rounded-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              >
                <div 
                  className={`h-full rounded-full ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-400' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}
                  style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        
        {/* Additional skills */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">{t('modals.additional_skills')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {['Git', 'Docker', 'AWS', 'Firebase', 'GraphQL', 'Redux', 'Jest', 'Cypress'].map((skill) => (
              <div 
                  key={skill}
                className={`px-3 py-2 rounded-lg text-sm font-medium text-center ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-200 text-gray-800'
                }`}
                >
                  {skill}
              </div>
              ))}
            </div>
        </div>
      </motion.div>
    </div>
  );
}

