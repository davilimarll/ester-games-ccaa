'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Gamepad2, Home as HomeIcon, Gamepad } from 'lucide-react'
import { PageView } from '@/types/games'

interface HeaderProps {
  currentPage: PageView
  onNavigate: (page: PageView) => void
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
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
              variant={currentPage === 'games' || currentPage === 'game' || currentPage === 'quiz' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('games')}
              className={currentPage === 'games' || currentPage === 'game' || currentPage === 'quiz' ? 'bg-blue-700 hover:bg-blue-800' : 'text-slate-600'}
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
