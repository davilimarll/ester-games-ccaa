'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Gamepad2, 
  Construction,
  Sparkles,
  Mail
} from 'lucide-react'

// Easter eggs decoration component
function EasterEggs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Easter eggs */}
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
      <section className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-white py-12 md:py-16 relative overflow-hidden">
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
            <h1 className="text-3xl md:text-5xl font-bold">
              Feliz Páscoa!
            </h1>
            <span className="text-3xl md:text-4xl">🐣</span>
          </div>
          
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-4">
            Aprenda Inglês Jogando!
          </p>
          <p className="text-base md:text-lg text-blue-200 max-w-2xl mx-auto">
            Jogos educativos desenvolvidos especialmente para os alunos do CCAA. 
            Aprenda de forma divertida e eficaz!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 relative z-10">
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
              Em Construção
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Novos jogos estão sendo desenvolvidos. Em breve você poderá aprender inglês de forma divertida!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <Sparkles className="h-5 w-5 text-red-600" />
              <span>Aguarde as novidades</span>
              <Sparkles className="h-5 w-5 text-red-600" />
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-4">
                Quer sugerir um jogo? Entre em contato com o Professor Breno!
              </p>
              <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                <Mail className="h-4 w-4 mr-2" />
                Enviar Sugestão
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
          <Card className="text-center border-t-4 border-t-blue-600 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="text-3xl mb-2">🥚</div>
              <CardTitle className="text-lg text-blue-800">Vocabulário</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Jogos para expandir seu vocabulário em inglês
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-t-4 border-t-red-600 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="text-3xl mb-2">🐰</div>
              <CardTitle className="text-lg text-red-700">Gramática</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Aprenda gramática de forma interativa
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-t-4 border-t-blue-600 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="text-3xl mb-2">🐣</div>
              <CardTitle className="text-lg text-blue-800">Listening</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Pratique sua compreensão auditiva
              </p>
            </CardContent>
          </Card>
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
