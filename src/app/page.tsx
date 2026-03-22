'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EasterBanner } from '@/components/layout/EasterBanner'
import { EasterEggs } from '@/components/layout/EasterEggs'
import { FloatingElements } from '@/components/layout/FloatingElements'
import { HomePage } from '@/components/pages/HomePage'
import { GamesList } from '@/components/games/GamesList'
import { GameView } from '@/components/games/GameView'
import { EasterQuiz } from '@/components/games/EasterQuiz'
import { games } from '@/data/games'
import { PageView } from '@/types/games'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageView>('home')
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null)

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page)
    if (page !== 'game') {
      setSelectedGameId(null)
    }
  }

  const handleSelectGame = (gameId: number) => {
    if (gameId === 99) {
      setCurrentPage('quiz')
      return
    }
    setSelectedGameId(gameId)
    setCurrentPage('game')
  }

  const selectedGame = games.find(g => g.id === selectedGameId)

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      {/* Animated decorations */}
      {currentPage === 'home' && <EasterEggs />}
      <FloatingElements />

      {/* Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Page Content with animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage + (selectedGameId || '')}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'games' && <GamesList onNavigate={handleNavigate} onSelectGame={handleSelectGame} />}
          {currentPage === 'game' && selectedGame && <GameView game={selectedGame} onNavigate={handleNavigate} />}
          {currentPage === 'quiz' && <EasterQuiz onBack={() => handleNavigate('games')} />}
        </motion.div>
      </AnimatePresence>

      {/* Easter Banner */}
      <EasterBanner />

      {/* Footer */}
      <Footer />
    </div>
  )
}
