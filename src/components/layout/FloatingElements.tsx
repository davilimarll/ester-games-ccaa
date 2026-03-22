'use client'

import { motion } from 'framer-motion'

export function FloatingElements() {
  const particles = [
    { emoji: '✨', size: 'text-sm' },
    { emoji: '⭐', size: 'text-xs' },
    { emoji: '🌟', size: 'text-sm' },
    { emoji: '💫', size: 'text-xs' },
    { emoji: '✨', size: 'text-xs' },
    { emoji: '⭐', size: 'text-sm' },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className={`absolute ${particle.size} opacity-40`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  )
}
