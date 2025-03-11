"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ArrowRight } from "lucide-react"

interface ContactPreviewCardProps {
  isDarkMode: boolean
}

export default function ContactPreviewCard({ isDarkMode }: ContactPreviewCardProps) {
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

  const socialLinks = [
    { icon: <Github size={18} />, label: "Github" },
    { icon: <Linkedin size={18} />, label: "LinkedIn" },
    { icon: <Twitter size={18} />, label: "Twitter" },
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
            <h3 className="text-xl font-bold">Contact Me</h3>
            <p className={`text-sm ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`}>Get in Touch</p>
          </div>
        </div>

        <motion.div className="mt-6 space-y-4" variants={container} initial="hidden" animate="show">
          {contactInfo.map((info) => (
            <motion.div
              key={info.label}
              className={`flex items-center rounded-xl p-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
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

        <motion.div className="mt-6" variants={item}>
          <p className={`mb-3 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Connect with me on social media:
          </p>
          <div className="flex space-x-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href="#"
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black"
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={item}>
        <div className={`rounded-xl p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <h4 className="mb-4 text-lg font-semibold">Send a Message</h4>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input
                type="text"
                className={`w-full rounded-lg border p-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 focus:border-indigo-500"
                    : "border-gray-300 bg-white focus:border-indigo-500"
                }`}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                className={`w-full rounded-lg border p-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 focus:border-indigo-500"
                    : "border-gray-300 bg-white focus:border-indigo-500"
                }`}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Message</label>
              <textarea
                className={`h-20 w-full rounded-lg border p-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-700 focus:border-indigo-500"
                    : "border-gray-300 bg-white focus:border-indigo-500"
                }`}
                placeholder="Your message..."
              ></textarea>
            </div>

            <motion.button
              className={`flex w-full items-center justify-center rounded-lg px-4 py-2 ${
                isDarkMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message <ArrowRight size={16} className="ml-2" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

