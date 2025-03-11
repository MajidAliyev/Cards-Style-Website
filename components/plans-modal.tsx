"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function PlansModal() {
  const plans = [
    {
      title: "Custom Project",
      description: "Perfect for specific, one-time projects with defined scope and timeline.",
      price: "Custom pricing",
      features: [
        "Detailed project scoping",
        "Fixed timeline and budget",
        "Regular progress updates",
        "2 rounds of revisions",
        "Post-launch support (30 days)",
        "Complete ownership of deliverables",
      ],
    },
    {
      title: "Monthly Retainer",
      description: "Ongoing support and development for evolving products and continuous improvement.",
      price: "Starting at $5,000/month",
      features: [
        "Dedicated design and development team",
        "Unlimited requests and revisions",
        "Weekly progress meetings",
        "Priority support",
        "Regular performance optimization",
        "Monthly strategy sessions",
      ],
      highlighted: true,
    },
    {
      title: "Design Sprint",
      description: "Rapid ideation and prototyping to validate concepts and ideas quickly.",
      price: "$15,000",
      features: [
        "5-day intensive process",
        "Problem definition and ideation",
        "Rapid prototyping",
        "User testing with 5 participants",
        "Comprehensive documentation",
        "Actionable next steps",
      ],
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
        Plans & Pricing
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 max-w-2xl text-gray-600"
      >
        We offer flexible engagement models to suit different needs and stages of product development. All plans include
        our signature approach to design and development.
      </motion.p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`flex flex-col rounded-xl ${
              plan.highlighted ? "border-2 border-black bg-gray-50" : "border border-gray-200 bg-white"
            } p-6`}
          >
            <h3 className="mb-2 text-xl font-bold">{plan.title}</h3>
            <p className="mb-4 text-gray-600">{plan.description}</p>
            <div className="mb-6 text-2xl font-bold">{plan.price}</div>

            <ul className="mb-8 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check size={18} className="mr-2 mt-0.5 text-black" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-auto rounded-full ${
                plan.highlighted ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"
              } px-6 py-3 font-medium`}
            >
              Get started
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

