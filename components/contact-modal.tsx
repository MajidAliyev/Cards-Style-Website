"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { Linkedin, Github, Twitter, Instagram } from "lucide-react"

interface ContactModalProps {
  onClose: () => void;
  isDarkMode: boolean;
  language: string;
}

export default function ContactModal({ onClose, isDarkMode, language }: ContactModalProps) {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Modal content */}
      <div
        ref={modalRef}
        className={`relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-4 sm:p-6 md:p-8 ${
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Left column - Contact form */}
              <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-6">{t('modals.contact_title')}</h2>
            <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('modals.contact_subtitle')}
            </p>
            
            {isSubmitted ? (
              <div className={`p-4 sm:p-6 rounded-xl ${
                isDarkMode ? 'bg-green-900/20 text-green-300' : 'bg-green-100 text-green-800'
              }`}>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{t('modals.contact_success_title')}</h3>
                <p className="text-sm sm:text-base">{t('modals.contact_success_message')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                  <label htmlFor="name" className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                    {t('modals.contact_name')}
                </label>
                  <input
                    type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                    placeholder={t('ui.yourName')}
                    className={`w-full px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                    isDarkMode
                        ? 'bg-gray-700 border-gray-600 focus:border-blue-500' 
                        : 'bg-gray-100 border-gray-300 focus:border-purple-500'
                    } border focus:ring-2 focus:outline-none transition-colors`}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                    {t('modals.contact_email')}
                </label>
                  <input
                    type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                    placeholder={t('ui.yourEmail')}
                    className={`w-full px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                    isDarkMode
                        ? 'bg-gray-700 border-gray-600 focus:border-blue-500' 
                        : 'bg-gray-100 border-gray-300 focus:border-purple-500'
                    } border focus:ring-2 focus:outline-none transition-colors`}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                    {t('modals.contact_message')}
                </label>
                  <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                    placeholder={t('ui.yourMessage')}
                    rows={isMobile ? 4 : 5}
                    className={`w-full px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 focus:border-blue-500' 
                        : 'bg-gray-100 border-gray-300 focus:border-purple-500'
                    } border focus:ring-2 focus:outline-none transition-colors`}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  } transition-colors`}
                >
                  {isSubmitting ? t('modals.contact_sending') : t('modals.contact_send')}
                </button>
              </form>
            )}
          </div>
          
          {/* Right column - Contact info */}
          <div className={`mt-4 md:mt-0 p-4 sm:p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">{t('modals.contact_info_title')}</h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">{t('modals.contact_address_title')}</h4>
                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('contact.address')}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">{t('modals.contact_email_title')}</h4>
                <a 
                  href={`mailto:${t('contact.email')}`} 
                  className={`text-sm sm:text-base hover:underline ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  {t('contact.email')}
                </a>
              </div>
              
              <div>
                <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">{t('modals.contact_phone_title')}</h4>
                <a 
                  href={`tel:${t('contact.phone')}`} 
                  className={`text-sm sm:text-base hover:underline ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  {t('contact.phone')}
                </a>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">{t('modals.contact_social_title')}</h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                        isDarkMode 
                          ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      } transition-colors`}
                      aria-label={link.name}
                    >
                      <link.icon size={isMobile ? 16 : 18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

