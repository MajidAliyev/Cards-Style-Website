"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface LanguageSwitcherProps {
  language: string
  setLanguage: (language: string) => void
  isDarkMode: boolean
  setCursorVariant?: (variant: string) => void
  setCursorText?: (text: string) => void
}

export default function LanguageSwitcher({
  language,
  setLanguage,
  isDarkMode,
  setCursorVariant = () => {},
  setCursorText = () => {},
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en", name: "English", flag: "/flags/en.svg" },
    { code: "de", name: "Deutsch", flag: "/flags/de.svg" },
    { code: "tr", name: "Türkçe", flag: "/flags/tr.svg" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleLanguageChange = (code: string) => {
    setLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block">
      <motion.button
        className={`flex h-8 items-center justify-center gap-2 rounded-full px-3 ${
          isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
        }`}
        onClick={toggleDropdown}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => {
          setCursorVariant("text")
          setCursorText("Change")
        }}
        onMouseLeave={() => {
          setCursorVariant("default")
          setCursorText("")
        }}
      >
        <div className="relative h-4 w-6 overflow-hidden rounded">
          <Image src={currentLanguage.flag} alt={currentLanguage.name} fill className="object-cover" />
        </div>
        <span className="text-xs font-medium">{currentLanguage.code.toUpperCase()}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute right-0 top-full z-50 mt-2 w-32 overflow-hidden rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-1">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm ${
                    language === lang.code
                      ? isDarkMode
                        ? "bg-gray-700"
                        : "bg-gray-100"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleLanguageChange(lang.code)}
                  whileHover={{ x: 5 }}
                  onMouseEnter={() => {
                    setCursorVariant("text")
                    setCursorText(lang.name)
                  }}
                  onMouseLeave={() => {
                    setCursorVariant("default")
                    setCursorText("")
                  }}
                >
                  <div className="relative h-4 w-6 overflow-hidden rounded">
                    <Image src={lang.flag} alt={lang.name} fill className="object-cover" />
                  </div>
                  <span>{lang.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

