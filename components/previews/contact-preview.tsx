"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"

interface ContactPreviewProps {
  isDarkMode: boolean
}

export default function ContactPreview({ isDarkMode }: ContactPreviewProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
      value: "hello@janedoe.com",
      color: isDarkMode ? "text-blue-400" : "text-blue-600",
    },
    {
      icon: <Phone size={18} />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      color: isDarkMode ? "text-purple-400" : "text-purple-600",
    },
    {
      icon: <MapPin size={18} />,
      label: "Location",
      value: "San Francisco, CA",
      color: isDarkMode ? "text-green-400" : "text-green-600",
    },
  ]

  return (
    <div className="h-full w-full p-6">
      <motion.div className="flex items-center" variants={container} initial="hidden" animate="show">
        <motion.div
          className={`mr-4 flex h-16 w-16 items-center justify-center rounded-full ${
            isDarkMode ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"
          }`}
          variants={item}
        >
          <Mail size={28} />
        </motion.div>
        <motion.div variants={item}>
          <h3 className="text-2xl font-bold">Contact</h3>
          <p className={isDarkMode ? "text-indigo-400" : "text-indigo-600"}>Get in Touch</p>
        </motion.div>
      </motion.div>

      <motion.div className="mt-6 space-y-4" variants={container} initial="hidden" animate="show">
        {contactInfo.map((info) => (
          <motion.div
            key={info.label}
            className={`flex items-center rounded-xl p-4 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
            variants={item}
            whileHover={{ x: 10 }}
          >
            <div className={`mr-3 ${info.color}`}>{info.icon}</div>
            <div>
              <p className="text-xs text-gray-500">{info.label}</p>
              <p className="font-medium">{info.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-6 flex justify-center"
        variants={item}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.6 }}
      >
        <motion.button
          className={`flex items-center rounded-full px-6 py-2 ${
            isDarkMode ? "bg-indigo-600 text-white" : "bg-indigo-500 text-white"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Me <ExternalLink size={14} className="ml-2" />
        </motion.button>
      </motion.div>
    </div>
  )
}

