"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { useTranslation } from 'react-i18next'

interface ContactModalProps {
  onClose: () => void;
  isDarkMode: boolean;
  language: string;
}

export default function ContactModal({ onClose, isDarkMode, language }: ContactModalProps) {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [animationPhase, setAnimationPhase] = useState<'entering' | 'active' | 'exiting'>('entering');
  
  // Handle animation phases
  useEffect(() => {
    // Set to active after entering animation completes
    const enterTimer = setTimeout(() => {
      setAnimationPhase('active');
    }, 1000);
    
    return () => clearTimeout(enterTimer);
  }, []);
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node) && animationPhase === 'active') {
        handleClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [animationPhase]);
  
  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && animationPhase === 'active') {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [animationPhase]);
  
  // Controlled close with exit animation
  const handleClose = () => {
    setAnimationPhase('exiting');
    setTimeout(() => {
      onClose();
    }, 800);
  };
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, link: "#" },
    { name: "Github", icon: Github, link: "#" },
    { name: "Twitter", icon: Twitter, link: "#" },
    { name: "Instagram", icon: Instagram, link: "#" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      {/* Modal content */}
      <motion.div
        ref={formRef}
        className={`relative z-10 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
        style={{ 
          boxShadow: isDarkMode 
            ? '0 0 30px 10px rgba(59, 130, 246, 0.3)' 
            : '0 0 30px 10px rgba(168, 85, 247, 0.2)'
        }}
        initial="hidden"
        animate={animationPhase === 'exiting' ? 'exit' : 'visible'}
        exit="exit"
        variants={contentVariants}
      >
        {/* Close button */}
        <motion.button
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={handleClose}
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
          {/* Header */}
          <motion.div 
            className="text-center mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              Get in Touch
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Mail className={isDarkMode ? "text-blue-400" : "text-purple-600"} />
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <p className="font-medium">Majid Aliyev</p>
                    <p>Sundgauallee 50</p>
                    <p>79110 Freiburg, Germany</p>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <a 
                      href="mailto:alyvmecid@gmail.com" 
                      className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700/50 hover:bg-gray-700' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <Mail size={18} className={isDarkMode ? "text-blue-400" : "text-purple-600"} />
                      <span>alyvmecid@gmail.com</span>
                    </a>
                    
                    <a 
                      href="tel:+4915737980174" 
                      className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700/50 hover:bg-gray-700' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <Phone size={18} className={isDarkMode ? "text-blue-400" : "text-purple-600"} />
                      <span>+49 157 37980174</span>
                    </a>
                    
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${
                      isDarkMode 
                        ? 'bg-gray-700/50' 
                        : 'bg-gray-100'
                    }`}>
                      <MapPin size={18} className={isDarkMode ? "text-blue-400" : "text-purple-600"} />
                      <span>Freiburg, Germany</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Connect with Me</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? 'bg-gray-700 hover:bg-gray-600'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon size={18} />
                        <span>{social.name}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
              
              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`p-5 rounded-xl border ${
                  isDarkMode 
                    ? 'border-blue-900/30 bg-blue-900/10' 
                    : 'border-purple-100 bg-purple-50'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">Current Status</h3>
                <p>
                  I'm currently open to new opportunities in web development, marketing, and UI/UX design. 
                  Feel free to reach out for collaborations or job opportunities.
                </p>
              </motion.div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Send className={isDarkMode ? "text-blue-400" : "text-purple-600"} />
                Send a Message
              </h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex flex-col items-center justify-center rounded-xl p-8 text-center ${
                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}
                >
                  <motion.div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                      isDarkMode ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                    }`}
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 2,
                    }}
                  >
                    <Send size={24} />
                  </motion.div>
                  <h3 className="mb-2 text-xl font-bold">Message Sent!</h3>
                  <p>Thank you for your message. I'll get back to you as soon as possible.</p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className={`mt-6 rounded-full px-6 py-2 text-sm font-medium ${
                      isDarkMode 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className={`w-full p-3 rounded-lg border focus:ring-2 outline-none ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                          : 'bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500/20'
                      }`}
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className={`w-full p-3 rounded-lg border focus:ring-2 outline-none ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                          : 'bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500/20'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-1 font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`w-full p-3 rounded-lg border focus:ring-2 outline-none ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500/20'
                          : 'bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500/20'
                      }`}
                      placeholder="Your message here..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-medium ${
                      isDarkMode
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    } transition-colors`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </form>
              )}
              
              {/* Additional contact note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-6 text-sm text-center"
              >
                <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                  Prefer direct contact? Feel free to email me at{" "}
                  <a 
                    href="mailto:alyvmecid@gmail.com" 
                    className={isDarkMode ? "text-blue-400 hover:underline" : "text-purple-600 hover:underline"}
                  >
                    alyvmecid@gmail.com
                  </a>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

