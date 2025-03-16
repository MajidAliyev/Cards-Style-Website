"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Clock, Calendar } from "lucide-react"
import { useTranslation } from 'react-i18next'

interface ContactPreviewCardProps {
  isDarkMode: boolean
}

export default function ContactPreviewCard({ isDarkMode }: ContactPreviewCardProps) {
  const { t } = useTranslation();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  const contactInfo = [
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: "alyvmecid@gmail.com",
      color: isDarkMode ? "text-blue-400" : "text-blue-600",
    },
    {
      icon: <Phone size={18} />,
      label: "Phone",
      value: "+49 157 37980174",
      color: isDarkMode ? "text-purple-400" : "text-purple-600",
    },
    {
      icon: <MapPin size={18} />,
      label: "Address",
      value: "Sundgauallee 50, 79110 Freiburg",
      color: isDarkMode ? "text-green-400" : "text-green-600",
    },
  ]

  const availabilityInfo = [
    {
      icon: <Clock size={18} />,
      label: "Working Hours",
      value: "9:00 - 18:00 (CET)",
      color: isDarkMode ? "text-amber-400" : "text-amber-600",
    },
    {
      icon: <Calendar size={18} />,
      label: "Available Days",
      value: "Monday - Friday",
      color: isDarkMode ? "text-pink-400" : "text-pink-600",
    },
  ]

  return (
    <motion.div className="grid gap-8 md:grid-cols-2" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <div className="flex items-center">
          <div
            className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${
              isDarkMode ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"
            }`}
          >
            <Mail size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Contact</h3>
            <p className={`text-sm ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`}>Get in Touch</p>
          </div>
        </div>

        <motion.p 
          className={`mt-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} 
          variants={item}
        >
          Feel free to reach out to me for any inquiries, collaborations, or just to say hello!
        </motion.p>

        <motion.div className="mt-6 space-y-4" variants={container} initial="hidden" animate="show">
          {contactInfo.map((info) => (
            <motion.div
              key={info.label}
              className={`flex items-center rounded-xl p-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
              variants={item}
            >
              <div className={`mr-3 ${info.color}`}>{info.icon}</div>
              <div>
                <p className="text-xs text-gray-500">{info.label}</p>
                <p className="font-medium">{info.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={item}>
        <div className={`rounded-xl p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <h4 className="mb-4 text-lg font-semibold">Contact Information</h4>

          <div className="space-y-4">
            {availabilityInfo.map((info) => (
              <motion.div
                key={info.label}
                className={`flex items-center rounded-xl p-4 ${isDarkMode ? "bg-gray-700" : "bg-white/60"}`}
                variants={item}
              >
                <div className={`mr-3 ${info.color}`}>{info.icon}</div>
                <div>
                  <p className="text-xs text-gray-500">{info.label}</p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </motion.div>
            ))}

            <div className={`mt-4 rounded-xl p-4 ${isDarkMode ? "bg-gray-700" : "bg-white/60"}`}>
              <p className="text-sm font-medium mb-2">Social Media</p>
              <div className="flex gap-3">
                <div className={`flex items-center gap-1 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                  <Linkedin size={16} />
                  <span className="text-xs">LinkedIn</span>
                </div>
                <div className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  <Github size={16} />
                  <span className="text-xs">GitHub</span>
                </div>
                <div className={`flex items-center gap-1 ${isDarkMode ? "text-sky-400" : "text-sky-600"}`}>
                  <Twitter size={16} />
                  <span className="text-xs">Twitter</span>
                </div>
              </div>
            </div>

            <div className={`mt-4 rounded-xl p-4 text-center ${isDarkMode ? "bg-indigo-900/30 text-indigo-300" : "bg-indigo-100 text-indigo-800"}`}>
              <p className="text-sm">Typical response time: 24-48 hours</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

