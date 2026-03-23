export type Game = {
  id: number
  title: string
  description: string
  iframe: string
  wordwallUrl: string
  width: number
  height: number
  category: string
  difficulty: string
  emoji: string
  isQuiz?: boolean  // Para o quiz especial
  isRpg?: boolean   // Para o RPG especial
}

export type PageView = 'home' | 'games' | 'game' | 'quiz' | 'rpg'
