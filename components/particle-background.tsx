"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface ParticleBackgroundProps {
  isDarkMode: boolean
}

export default function ParticleBackground({ isDarkMode }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Enhanced Particle class with more properties
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      originalX: number
      originalY: number
      angle: number
      velocity: number
      distance: number
      force: number
      range: number
      density: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalX = this.x
        this.originalY = this.y
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = isDarkMode
          ? `rgba(255, 255, 255, ${Math.random() * 0.2})`
          : `rgba(0, 0, 0, ${Math.random() * 0.1})`

        // For mouse interaction
        this.angle = 0
        this.velocity = 0.03 + Math.random() * 0.02
        this.distance = 0
        this.force = 0
        this.range = 100
        this.density = Math.random() * 30 + 1
      }

      update(mouseX?: number, mouseY?: number) {
        // Normal movement
        this.x += this.speedX
        this.y += this.speedY

        // Boundary check
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY
        }

        // Mouse interaction
        if (mouseX !== undefined && mouseY !== undefined) {
          // Calculate distance between particle and mouse
          const dx = mouseX - this.x
          const dy = mouseY - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < this.range) {
            // Calculate force direction
            this.angle = Math.atan2(dy, dx)
            this.force = (this.range - distance) / this.range

            // Apply force to move away from mouse
            this.x -= Math.cos(this.angle) * this.force * this.velocity
            this.y -= Math.sin(this.angle) * this.force * this.velocity
          }

          // Gradually return to original position
          const dxOrigin = this.originalX - this.x
          const dyOrigin = this.originalY - this.y
          this.x += dxOrigin * 0.01
          this.y += dyOrigin * 0.01
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000))
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Mouse position
    let mouseX: number | undefined
    let mouseY: number | undefined

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseLeave = () => {
      mouseX = undefined
      mouseY = undefined
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(mouseX, mouseY)
        particle.draw()
      })

      // Connect particles with lines
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect particles with lines if they are close enough
    const connectParticles = () => {
      const maxDistance = 150

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = isDarkMode ? `rgba(255, 255, 255, ${opacity * 0.15})` : `rgba(0, 0, 0, ${opacity * 0.05})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isDarkMode])

  return (
    <motion.canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

