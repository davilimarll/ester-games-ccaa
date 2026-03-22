'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EasterBanner } from '@/components/layout/EasterBanner'
import { EasterEggs } from '@/components/layout/EasterEggs'
import { HomePage } from '@/components/pages/HomePage'
import { GamesList } from '@/components/games/GamesList'
import { GameView } from '@/components/games/GameView'
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
    setSelectedGameId(gameId)
    setCurrentPage('game')
  }

  const selectedGame = games.find(g => g.id === selectedGameId)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50 to-white relative">
      {/* Easter decoration - only on home */}
      {currentPage === 'home' && <EasterEggs />}

      {/* Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Page Content */}
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'games' && <GamesList onNavigate={handleNavigate} onSelectGame={handleSelectGame} />}
      {currentPage === 'game' && selectedGame && <GameView game={selectedGame} onNavigate={handleNavigate} />}

      {/* Easter Banner */}
      <EasterBanner />

      {/* Footer */}
      <Footer />
    </div>
  )
}
