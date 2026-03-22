'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Gamepad2, 
  BookOpen, 
  Brain, 
  Target, 
  Sparkles, 
  Trophy,
  Volume2,
  Puzzle,
  PenTool,
  MessageCircle,
  Star,
  Users
} from 'lucide-react'

// Tipos de jogos disponíveis
const games = [
  {
    id: 1,
    title: "Word Match",
    description: "Combine palavras em inglês com suas traduções em português",
    icon: Puzzle,
    difficulty: "Iniciante",
    category: "Vocabulário",
    color: "bg-emerald-500",
    players: 156
  },
  {
    id: 2,
    title: "Listen & Choose",
    description: "Ouça a palavra e escolha a imagem correta",
    icon: Volume2,
    difficulty: "Iniciante",
    category: "Listening",
    color: "bg-blue-500",
    players: 234
  },
  {
    id: 3,
    title: "Grammar Quest",
    description: "Complete as frases com a gramática correta",
    icon: PenTool,
    difficulty: "Intermediário",
    category: "Gramática",
    color: "bg-purple-500",
    players: 189
  },
  {
    id: 4,
    title: "Memory Game",
    description: "Encontre os pares de palavras em inglês e português",
    icon: Brain,
    difficulty: "Iniciante",
    category: "Memória",
    color: "bg-amber-500",
    players: 312
  },
  {
    id: 5,
    title: "Conversation Sim",
    description: "Pratique diálogos do dia a dia em inglês",
    icon: MessageCircle,
    difficulty: "Intermediário",
    category: "Conversação",
    color: "bg-pink-500",
    players: 98
  },
  {
    id: 6,
    title: "Vocabulary Builder",
    description: "Expanda seu vocabulário com flashcards interativos",
    icon: BookOpen,
    difficulty: "Todos",
    category: "Vocabulário",
    color: "bg-teal-500",
    players: 445
  },
  {
    id: 7,
    title: "Speed Quiz",
    description: "Responda rápido às perguntas de inglês",
    icon: Target,
    difficulty: "Avançado",
    category: "Quiz",
    color: "bg-red-500",
    players: 267
  },
  {
    id: 8,
    title: "Word Scramble",
    description: "Desembaralhe as letras para formar palavras",
    icon: Sparkles,
    difficulty: "Iniciante",
    category: "Vocabulário",
    color: "bg-indigo-500",
    players: 178
  }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Iniciante': return 'bg-green-100 text-green-800 border-green-200'
    case 'Intermediário': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Avançado': return 'bg-red-100 text-red-800 border-red-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<number | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/ccaa-logo.svg" 
              alt="CCAA Logo" 
              className="h-10 md:h-12 w-auto"
            />
            <div className="hidden sm:block h-8 w-px bg-slate-200" />
            <div className="hidden sm:flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-amber-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                Ester Games
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
              <Users className="h-4 w-4" />
              <span>Prof. Breno Vitoriano</span>
            </div>
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
              <Star className="h-3 w-3 mr-1" />
              CCAA
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex sm:hidden items-center justify-center gap-2 mb-4">
            <Gamepad2 className="h-8 w-8 text-amber-400" />
            <span className="text-2xl font-bold text-amber-400">Ester Games</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Aprenda Inglês Jogando!
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-6">
            Jogos educativos desenvolvidos especialmente para os alunos do CCAA. 
            Aprenda de forma divertida e eficaz!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              <span>+2000 jogos jogados</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Users className="h-5 w-5 text-amber-400" />
              <span>+500 alunos ativos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              Jogos Disponíveis
            </h2>
            <p className="text-slate-600 mt-1">
              Escolha um jogo e comece a aprender!
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-sm py-1.5">
              8 jogos
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {games.map((game) => {
            const Icon = game.icon
            return (
              <Card 
                key={game.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  selectedGame === game.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
                onClick={() => setSelectedGame(game.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${game.color} text-white shadow-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                      {game.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-3 group-hover:text-blue-600 transition-colors">
                    {game.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {game.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-3 border-t">
                  <div className="flex items-center justify-between w-full">
                    <Badge variant="secondary" className="text-xs">
                      {game.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Users className="h-3 w-3" />
                      {game.players}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-400 py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            Pronto para começar?
          </h3>
          <p className="text-amber-100 mb-6 max-w-xl mx-auto">
            Escolha um jogo acima e divirta-se aprendendo inglês!
          </p>
          <Button 
            size="lg" 
            className="bg-white text-amber-600 hover:bg-amber-50 font-semibold px-8"
          >
            <Gamepad2 className="h-5 w-5 mr-2" />
            Jogar Agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="/ccaa-logo.svg" 
                alt="CCAA Logo" 
                className="h-8 w-auto brightness-0 invert opacity-80"
              />
              <div className="h-6 w-px bg-slate-700" />
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-amber-400" />
                <span className="font-semibold text-white">Ester Games</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-slate-400">
                Desenvolvido por <span className="text-white font-medium">Professor Breno Vitoriano</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                CCAA - Centro de Cultura Anglo Americana
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              © 2025 CCAA - Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
