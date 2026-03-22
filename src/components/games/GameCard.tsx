'use client'

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Trophy } from 'lucide-react'
import { Game } from '@/types/games'

interface GameCardProps {
  game: Game
  onSelect: (gameId: number) => void
}

export function GameCard({ game, onSelect }: GameCardProps) {
  const isQuiz = game.isQuiz

  return (
    <Card
      className={`border-2 shadow-lg hover:shadow-xl transition-all cursor-pointer group ${
        isQuiz
          ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 hover:border-yellow-500'
          : 'border-blue-200 hover:border-blue-400'
      }`}
      onClick={() => onSelect(game.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-xl text-3xl group-hover:scale-110 transition-transform ${
            isQuiz ? 'bg-yellow-100' : 'bg-blue-100'
          }`}>
            {game.emoji}
          </div>
          <div className="flex flex-col gap-1">
            {isQuiz && (
              <Badge className="bg-yellow-500 text-white">
                <Trophy className="h-3 w-3 mr-1" />
                Exclusivo
              </Badge>
            )}
            <Badge variant="outline" className={isQuiz ? 'border-yellow-300 text-yellow-700' : 'border-blue-200 text-blue-700'}>
              {game.category}
            </Badge>
            <Badge className={isQuiz ? 'bg-orange-500 text-white' : 'bg-red-600 text-white'}>
              {game.difficulty}
            </Badge>
          </div>
        </div>
        <CardTitle className={`text-xl mt-4 transition-colors ${
          isQuiz ? 'group-hover:text-orange-600' : 'group-hover:text-blue-700'
        }`}>
          {game.title}
        </CardTitle>
        <CardDescription className="text-slate-600">
          {game.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-3 border-t border-slate-100">
        <Button className={`w-full text-white transition-colors ${
          isQuiz
            ? 'bg-orange-500 hover:bg-orange-600 group-hover:bg-yellow-500'
            : 'bg-blue-700 hover:bg-blue-800 group-hover:bg-red-600'
        }`}>
          {isQuiz ? (
            <>
              <Trophy className="h-4 w-4 mr-2" />
              Iniciar Desafio
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Jogar Agora
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
