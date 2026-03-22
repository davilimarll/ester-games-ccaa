'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Construction, Sparkles, Gamepad2, ArrowRight } from 'lucide-react'
import { PageView } from '@/types/games'

interface HomePageProps {
  onNavigate: (page: PageView) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
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
