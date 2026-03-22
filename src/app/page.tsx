'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/badge'
import { Badge } from '@/components/ui/badge'
import { 
  Gamepad2, 
  Sparkles,
  Play,
  ExternalLink
} from 'lucide-react'

// Easter eggs decoration component
function EasterEggs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-[5%] animate-bounce" style={{ animationDuration: '3s' }}>
        <span className="text-3xl">🥚</span>
      </div>
      <div className="absolute top-32 right-[8%] animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
        <span className="text-4xl">🐣</span>
      </div>
      <div className="absolute top-48 left-[10%] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
        <span className="text-3xl">🥚</span>
      </div>
      <div className="absolute top-24 right-[15%] animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '0.3s' }}>
        <span className="text-3xl">🐰</span>
      </div>
      <div className="absolute top-56 right-[5%] animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}>
        <span className="text-4xl">🥚</span>
      </div>
      <div className="absolute top-40 left-[3%] animate-bounce" style={{ animationDuration: '2.7s', animationDelay: '1.2s' }}>
        <span className="text-3xl">🌷</span>
      </div>
    </div>
  )
}

// Game data
const games = [
  {
    id: 1,
    title: "Board Game - Easter Vocabulary",
    description: "Jogo de tabuleiro com vocabulário de Páscoa em inglês",
    iframe: "https://wordwall.net/pt/embed/aee7403d6d0e48858a3f78bc9a2b18ec?themeId=46&templateId=25&fontStackId=0",
    width: 500,
    height: 380,
    category: "Vocabulário",
    difficulty: "Iniciante"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50 to-white relative">
      {/* Easter decoration */}
      <EasterEggs />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/ccaa-logo.svg" 
              alt="CCAA Logo" 
              className="h-12 md:h-14 w-auto"
            />
            <div className="hidden sm:block h-8 w-px bg-slate-200" />
            <div className="hidden sm:flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold text-blue-800">
                Ester Games
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl hidden sm:block">🐰</span>
            <Badge className="bg-red-600 text-white hover:bg-red-700">
              CCAA
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-white py-10 md:py-12 relative overflow-hidden">
        {/* Easter decorations in hero */}
        <div className="absolute top-4 left-4 text-4xl animate-bounce opacity-50" style={{ animationDuration: '2s' }}>
          🐣
        </div>
        <div className="absolute top-8 right-8 text-3xl animate-bounce opacity-50" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
          🥚
        </div>
        <div className="absolute bottom-4 left-8 text-3xl animate-bounce opacity-50" style={{ animationDuration: '3s', animationDelay: '1s' }}>
          🌷
        </div>
        <div className="absolute bottom-8 right-4 text-4xl animate-bounce opacity-50" style={{ animationDuration: '2.2s', animationDelay: '0.7s' }}>
          🐰
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex sm:hidden items-center justify-center gap-2 mb-4">
            <Gamepad2 className="h-8 w-8 text-red-400" />
            <span className="text-2xl font-bold text-red-400">Ester Games</span>
          </div>
          
          {/* Easter Title */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl md:text-4xl">🐰</span>
            <h1 className="text-3xl md:text-4xl font-bold">
              Feliz Páscoa!
            </h1>
            <span className="text-3xl md:text-4xl">🐣</span>
          </div>
          
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Aprenda inglês brincando! 🎮
          </p>
        </div>
      </section>

      {/* Main Content - Games */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-10 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Play className="h-6 w-6 text-blue-700" />
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
            Jogos
          </h2>
          <Badge variant="secondary" className="ml-2">
            {games.length} disponível
          </Badge>
        </div>

        {/* Games Grid */}
        <div className="max-w-3xl mx-auto space-y-6">
          {games.map((game) => (
            <Card key={game.id} className="border-2 border-blue-200 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-800 text-white pb-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🥚</span>
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
                {/* Open in new tab button */}
                <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex justify-center">
                  <a 
                    href="https://wordwall.net/pt/resource/aee7403d6d0e48858a3f78bc9a2b18ec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 text-sm font-medium transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Abrir em tela cheia
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-red-600" />
            <span>Mais jogos em breve!</span>
            <Sparkles className="h-4 w-4 text-red-600" />
          </div>
        </div>
      </main>

      {/* Easter Banner */}
      <section className="bg-gradient-to-r from-blue-600 via-white to-red-600 py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-3xl">🥚</span>
            <p className="text-lg font-medium text-blue-900">
              Feliz Páscoa a todos os alunos do CCAA! 🐣
            </p>
            <span className="text-3xl">🐰</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="/ccaa-logo.svg" 
                alt="CCAA Logo" 
                className="h-10 w-auto"
              />
              <div className="h-8 w-px bg-blue-700" />
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-red-400" />
                <span className="font-semibold">Ester Games</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-blue-200">
                Desenvolvido por <span className="text-white font-medium">Professor Breno Vitoriano</span>
              </p>
              <p className="text-xs text-blue-300 mt-1">
                CCAA - Centro de Cultura Anglo Americana
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-blue-800 text-center">
            <p className="text-xs text-blue-300">
              © 2025 CCAA - Todos os direitos reservados 🐰
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
