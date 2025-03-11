"use client"

import { motion } from "framer-motion"

export default function ServicesModal() {
  const services = [
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications with intuitive UX and seamless performance.",
      icon: "📱",
    },
    {
      title: "Websites",
      description: "Responsive, fast-loading websites optimized for conversion and engagement.",
      icon: "🖥️",
    },
    {
      title: "Design Systems",
      description: "Comprehensive design systems that ensure consistency across all digital touchpoints.",
      icon: "🎨",
    },
    {
      title: "UI/UX Design",
      description: "User-centered design that balances aesthetics with functionality and usability.",
      icon: "✏️",
    },
    {
      title: "Development",
      description: "Clean, maintainable code that brings designs to life with modern technologies.",
      icon: "⚙️",
    },
    {
      title: "Strategy",
      description: "Product strategy that aligns business goals with user needs and market opportunities.",
      icon: "🧠",
    },
  ]

  return (
    <div className="p-4 md:p-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 text-3xl font-bold"
      >
        Services
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 max-w-2xl text-gray-600"
      >
        We offer end-to-end design and development services to help product-led founders bring their vision to life. Our
        approach is collaborative, strategic, and focused on delivering exceptional results.
      </motion.p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="rounded-xl bg-gray-50 p-6"
          >
            <div className="mb-4 text-3xl">{service.icon}</div>
            <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

