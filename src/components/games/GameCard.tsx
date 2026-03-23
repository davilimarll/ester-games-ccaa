'use client'

import { motion } from 'framer-motion'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Trophy, Scroll } from 'lucide-react'
import { Game } from '@/types/games'

interface GameCardProps {
  game: Game
  onSelect: (gameId: number) => void
}

export function GameCard({ game, onSelect }: GameCardProps) {
  const isQuiz = game.isQuiz
  const isRpg = game.isRpg

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className={`border-2 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden ${
          isRpg
            ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-yellow-50 hover:border-amber-600'
            : isQuiz
              ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 hover:border-yellow-500'
              : 'border-blue-200 hover:border-blue-400'
        }`}
        onClick={() => onSelect(game.id)}
      >
        {/* Animated background glow */}
        <motion.div
          className={`absolute inset-0 opacity-0 ${isRpg ? 'bg-amber-200' : isQuiz ? 'bg-yellow-200' : 'bg-blue-200'}`}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />

        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-start justify-between">
            <motion.div
              className={`p-3 rounded-xl text-3xl ${isRpg ? 'bg-amber-100' : isQuiz ? 'bg-yellow-100' : 'bg-blue-100'}`}
              whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {game.emoji}
            </motion.div>
            <div className="flex flex-col gap-1">
              {(isQuiz || isRpg) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <Badge className={isRpg ? "bg-amber-600 text-white" : "bg-yellow-500 text-white"}>
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    >
                      {isRpg ? <Scroll className="h-3 w-3 mr-1" /> : <Trophy className="h-3 w-3 mr-1" />}
                    </motion.span>
                    {isRpg ? 'RPG Adventure' : 'Exclusivo'}
                  </Badge>
                </motion.div>
              )}
              <Badge variant="outline" className={isRpg ? 'border-amber-300 text-amber-700' : isQuiz ? 'border-yellow-300 text-yellow-700' : 'border-blue-200 text-blue-700'}>
                {game.category}
              </Badge>
              <Badge className={isRpg ? 'bg-amber-700 text-white' : isQuiz ? 'bg-orange-500 text-white' : 'bg-red-600 text-white'}>
                {game.difficulty}
              </Badge>
            </div>
          </div>
          <CardTitle className={`text-xl mt-4 ${isRpg ? 'text-amber-800' : isQuiz ? 'text-orange-700' : 'text-slate-800'}`}>
            {game.title}
          </CardTitle>
          <CardDescription className="text-slate-600">
            {game.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-3 border-t border-slate-100 relative z-10">
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className={`w-full text-white ${
              isRpg
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700'
                : isQuiz
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
            }`}>
              {isRpg ? (
                <>
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Scroll className="h-4 w-4 mr-2" />
                  </motion.span>
                  Iniciar Aventura
                </>
              ) : isQuiz ? (
                <>
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                  </motion.span>
                  Iniciar Desafio
                </>
              ) : (
                <>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                  </motion.span>
                  Jogar Agora
                </>
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
