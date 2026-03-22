'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Gamepad2, 
  Construction,
  Sparkles,
  Play,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Home as HomeIcon,
  Gamepad
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
    description: "Jogo de tabuleiro com vocabulário de Páscoa em inglês. Clique e aprenda palavras divertidas!",
    iframe: "https://wordwall.net/pt/embed/aee7403d6d0e48858a3f78bc9a2b18ec?themeId=46&templateId=25&fontStackId=0",
    wordwallUrl: "https://wordwall.net/pt/resource/aee7403d6d0e48858a3f78bc9a2b18ec",
    width: 500,
    height: 380,
    category: "Vocabulário",
    difficulty: "Iniciante",
    emoji: "🥚"
  }
]

type PageView = 'home' | 'games' | 'game'

// Header Component
function Header({ currentPage, onNavigate }: { currentPage: PageView; onNavigate: (page: PageView) => void }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
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
        </button>
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-2">
            <Button 
              variant={currentPage === 'home' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('home')}
              className={currentPage === 'home' ? 'bg-blue-700 hover:bg-blue-800' : 'text-slate-600'}
            >
              <HomeIcon className="h-4 w-4 mr-1" />
              Início
            </Button>
            <Button 
              variant={currentPage === 'games' || currentPage === 'game' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onNavigate('games')}
              className={currentPage === 'games' || currentPage === 'game' ? 'bg-blue-700 hover:bg-blue-800' : 'text-slate-600'}
            >
              <Gamepad className="h-4 w-4 mr-1" />
              Jogos
            </Button>
          </nav>
          <span className="text-2xl hidden sm:block">🐰</span>
          <Badge className="bg-red-600 text-white hover:bg-red-700">
            CCAA
          </Badge>
        </div>
      </div>
    </header>
  )
}

// Home Page
function HomePage({ onNavigate }: { onNavigate: (page: PageView) => void }) {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-white py-16 md:py-24 relative overflow-hidden">
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
          {/* Easter Title */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl md:text-5xl">🐰</span>
            <h1 className="text-4xl md:text-6xl font-bold">
              Feliz Páscoa!
            </h1>
            <span className="text-4xl md:text-5xl">🐣</span>
          </div>
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8">
            Aprenda Inglês Jogando!
          </p>
          <p className="text-lg text-blue-200 max-w-xl mx-auto mb-10">
            Jogos educativos desenvolvidos especialmente para os alunos do CCAA. 
            Divirta-se aprendendo!
          </p>
          
          {/* CTA Button */}
          <Button 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 shadow-xl"
            onClick={() => onNavigate('games')}
          >
            <Gamepad2 className="h-6 w-6 mr-2" />
            Ir para os Jogos
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16 relative z-10">
        {/* Coming Soon Card */}
        <Card className="max-w-2xl mx-auto border-2 border-blue-200 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex items-center justify-center gap-3">
              <span className="text-4xl">🥚</span>
              <div className="p-4 bg-blue-100 rounded-full">
                <Construction className="h-10 w-10 text-blue-700" />
              </div>
              <span className="text-4xl">🐰</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl text-blue-800">
              Novos Jogos em Breve!
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Estamos preparando mais jogos educativos para você. Fique ligado!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <Sparkles className="h-5 w-5 text-red-600" />
              <span>Aguarde as novidades</span>
              <Sparkles className="h-5 w-5 text-red-600" />
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <Card className="text-center border-t-4 border-t-blue-600 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="text-4xl mb-3">🥚</div>
              <CardTitle className="text-xl text-blue-800">Vocabulário</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Jogos para expandir seu vocabulário em inglês
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-t-4 border-t-red-600 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="text-4xl mb-3">🐰</div>
              <CardTitle className="text-xl text-red-700">Gramática</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Aprenda gramática de forma interativa
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-t-4 border-t-blue-600 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="text-4xl mb-3">🐣</div>
              <CardTitle className="text-xl text-blue-800">Listening</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Pratique sua compreensão auditiva
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}

// Games List Page
function GamesPage({ onNavigate, onSelectGame }: { onNavigate: (page: PageView) => void; onSelectGame: (gameId: number) => void }) {
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
          <Card 
            key={game.id} 
            className="border-2 border-blue-200 shadow-lg hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer group"
            onClick={() => onSelectGame(game.id)}
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

// Game Play Page
function GamePage({ game, onNavigate }: { game: typeof games[0]; onNavigate: (page: PageView) => void }) {
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
          {/* Open in new tab button */}
          <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex justify-center">
            <a 
              href={game.wordwallUrl}
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
    </main>
  )
}

// Main Component
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
      {currentPage === 'games' && <GamesPage onNavigate={handleNavigate} onSelectGame={handleSelectGame} />}
      {currentPage === 'game' && selectedGame && <GamePage game={selectedGame} onNavigate={handleNavigate} />}

      {/* Easter Banner */}
      <section className="bg-gradient-to-r from-blue-600 via-white to-red-600 py-6 mt-auto">
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
      <footer className="bg-blue-900 text-white py-8">
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
