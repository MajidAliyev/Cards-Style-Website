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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        ref={modalRef}
        className={`relative z-10 w-11/12 max-w-5xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8 ${
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
          {/* Header with animated title */}
          <motion.div 
            className="text-center mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              My Skills & Expertise
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
          
          {/* Skills category tabs */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className={`inline-flex rounded-lg p-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <motion.button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'technical' 
                    ? isDarkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-purple-600 text-white'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('technical')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code size={16} />
                Technical
              </motion.button>
              
              <motion.button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'design' 
                    ? isDarkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-purple-600 text-white'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('design')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Palette size={16} />
                Design
              </motion.button>
              
              <motion.button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'marketing' 
                    ? isDarkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-purple-600 text-white'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('marketing')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={16} />
                Marketing
              </motion.button>
                </div>
          </motion.div>
          
          {/* Skills grid with animated bars */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {getActiveSkills().map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className="relative"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isDarkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-purple-100'
                        }`}
                        variants={iconVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                      >
                        <span className="text-lg">{skill.icon}</span>
                      </motion.div>
                      <h3 className="text-lg font-semibold">{skill.name}</h3>
                    </div>
                    <span className="text-sm font-medium">{skill.progress}%</span>
                  </div>
                  
                  <div className={`w-full h-3 rounded-full ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  } overflow-hidden`}>
                  <motion.div
                      className={`h-full rounded-full ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-400' 
                          : 'bg-gradient-to-r from-purple-600 to-purple-400'
                      }`}
                      custom={skill.progress}
                      variants={skillBarVariants}
                      initial="hidden"
                      animate="visible"
                  />
                </div>
                  
                  {/* Animated particles for each skill */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 rounded-full ${
                        isDarkMode 
                          ? 'bg-blue-400' 
                          : 'bg-purple-400'
                      }`}
                      style={{
                        left: `${skill.progress * Math.random()}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.6
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.6, 0.9, 0.6],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Projects section */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className={isDarkMode ? "text-blue-400" : "text-purple-500"} />
              Notable Projects
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <h4 className="font-semibold text-lg">Frauenarztpraxis Website</h4>
                <p className="text-sm mt-1">Complete website development for a medical practice, built from scratch using HTML, CSS, and JavaScript.</p>
              </motion.div>
              
              <motion.div
                className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <h4 className="font-semibold text-lg">AZERTUFF Shopify Store</h4>
                <p className="text-sm mt-1">E-commerce platform setup and management using Shopify, including product listings and payment integration.</p>
              </motion.div>
              
              <motion.div
                className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <h4 className="font-semibold text-lg">Nerdle Game (C++ Console)</h4>
                <p className="text-sm mt-1">Implemented a mathematical equation guessing game using C++ console graphics with clean code structure and unit tests.</p>
              </motion.div>
              
              <motion.div
                className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <h4 className="font-semibold text-lg">Mindstorms EV3 Robot</h4>
                <p className="text-sm mt-1">Developed both mechanical design and programming for a robot that successfully navigated predefined courses and performed tasks.</p>
              </motion.div>
          </div>
        </motion.div>

          {/* Additional skills section */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Cpu className={isDarkMode ? "text-blue-400" : "text-purple-500"} />
              Additional Technical Skills
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {['Git', 'Docker', 'AutoCAD', 'Autodesk Inventor', 'MS Office', 'Robotics', 'Flutter', 'Shopify Development'].map((skill, index) => (
                <motion.div
                  key={skill}
                  className={`px-4 py-2 rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-blue-900 hover:bg-opacity-50' 
                      : 'bg-gray-100 hover:bg-purple-100'
                  } transition-colors duration-300`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: 1 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: isDarkMode 
                      ? '0 0 15px 5px rgba(59, 130, 246, 0.3)' 
                      : '0 0 15px 5px rgba(168, 85, 247, 0.2)'
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

