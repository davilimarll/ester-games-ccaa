'use client'

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play } from 'lucide-react'
import { Game } from '@/types/games'

interface GameCardProps {
  game: Game
  onSelect: (gameId: number) => void
}

export function GameCard({ game, onSelect }: GameCardProps) {
  return (
    <Card
      className="border-2 border-blue-200 shadow-lg hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer group"
      onClick={() => onSelect(game.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="p-3 bg-blue-100 rounded-xl text-3xl group-hover:scale-110 transition-transform">
            {game.emoji}
          </div>
          <div className="flex flex-col gap-1">
            <Badge variant="outline" className="border-blue-200 text-blue-700">
              {game.category}
            </Badge>
            <Badge className="bg-red-600 text-white">
              {game.difficulty}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-xl mt-4 group-hover:text-blue-700 transition-colors">
          {game.title}
        </CardTitle>
        <CardDescription className="text-slate-600">
          {game.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-3 border-t border-slate-100">
        <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white group-hover:bg-red-600 transition-colors">
          <Play className="h-4 w-4 mr-2" />
          Jogar Agora
        </Button>
      </CardFooter>
    </Card>
  )
}
