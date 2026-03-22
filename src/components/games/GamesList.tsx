'use client'

import { Badge } from '@/components/ui/badge'
import { Play, Sparkles } from 'lucide-react'
import { GameCard } from './GameCard'
import { Game, PageView } from '@/types/games'
import { games } from '@/data/games'

interface GamesListProps {
  onNavigate: (page: PageView) => void
  onSelectGame: (gameId: number) => void
}

export function GamesList({ onNavigate, onSelectGame }: GamesListProps) {
  return (
    <main className="flex-1 container mx-auto px-4 py-8 md:py-10 relative z-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-blue-700 transition-colors">
          Início
        </button>
        <span>/</span>
        <span className="text-blue-700 font-medium">Jogos</span>
      </div>

      <div className="flex items-center justify-center gap-2 mb-8">
        <Play className="h-6 w-6 text-blue-700" />
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
          Escolha um Jogo
        </h2>
        <Badge variant="secondary" className="ml-2">
          {games.length} disponível
        </Badge>
      </div>

      {/* Games Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onSelect={onSelectGame} />
        ))}
      </div>

      {/* Coming Soon */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
          <Sparkles className="h-4 w-4 text-red-600" />
          <span>Mais jogos em breve!</span>
          <Sparkles className="h-4 w-4 text-red-600" />
        </div>
      </div>
    </main>
  )
}
