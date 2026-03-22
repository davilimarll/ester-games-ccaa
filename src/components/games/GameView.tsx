'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import { Game, PageView } from '@/types/games'

interface GameViewProps {
  game: Game
  onNavigate: (page: PageView) => void
}

export function GameView({ game, onNavigate }: GameViewProps) {
  return (
    <main className="flex-1 container mx-auto px-4 py-8 md:py-10 relative z-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-blue-700 transition-colors">
          Início
        </button>
        <span>/</span>
        <button onClick={() => onNavigate('games')} className="hover:text-blue-700 transition-colors">
          Jogos
        </button>
        <span>/</span>
        <span className="text-blue-700 font-medium">{game.title}</span>
      </div>

      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-6 text-slate-600 hover:text-blue-700"
        onClick={() => onNavigate('games')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para Jogos
      </Button>

      {/* Game Card */}
      <Card className="max-w-3xl mx-auto border-2 border-blue-200 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-800 text-white pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{game.emoji}</span>
              <CardTitle className="text-xl md:text-2xl">
                {game.title}
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {game.category}
              </Badge>
              <Badge className="bg-red-600 text-white">
                {game.difficulty}
              </Badge>
            </div>
          </div>
          <CardDescription className="text-blue-100 mt-2">
            {game.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {/* Game Iframe */}
          <div className="w-full flex justify-center bg-gradient-to-b from-slate-50 to-white p-4">
            <div className="w-full max-w-[500px]">
              <iframe
                src={game.iframe}
                width="100%"
                height={game.height}
                frameBorder="0"
                allowFullScreen
                className="rounded-lg shadow-lg border border-slate-200"
                style={{ maxWidth: '100%' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
