'use client'

import { motion } from 'framer-motion'

export function EasterEggs() {
  const decorations = [
    { emoji: '🥚', top: '10%', left: '5%', size: 'text-3xl', delay: 0, duration: 3 },
    { emoji: '🐣', top: '15%', right: '8%', size: 'text-4xl', delay: 0.5, duration: 2.5 },
    { emoji: '🥚', top: '35%', left: '3%', size: 'text-3xl', delay: 1, duration: 3.5 },
    { emoji: '🐰', top: '8%', right: '15%', size: 'text-3xl', delay: 0.3, duration: 2.8 },
    { emoji: '🥚', top: '45%', right: '5%', size: 'text-4xl', delay: 0.8, duration: 3.2 },
    { emoji: '🌷', top: '28%', left: '8%', size: 'text-3xl', delay: 1.2, duration: 2.7 },
    { emoji: '🐰', top: '55%', right: '10%', size: 'text-2xl', delay: 1.5, duration: 4 },
    { emoji: '🥚', top: '65%', left: '6%', size: 'text-2xl', delay: 0.7, duration: 3.8 },
    { emoji: '🐣', top: '75%', right: '12%', size: 'text-3xl', delay: 1.8, duration: 3.3 },
    { emoji: '🌷', top: '85%', left: '10%', size: 'text-2xl', delay: 2, duration: 2.9 },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {decorations.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.size}`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
          }}
          initial={{ opacity: 0, scale: 0, y: -50 }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  )
}
