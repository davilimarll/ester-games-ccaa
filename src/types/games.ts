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
  isExternal?: boolean  // Para jogos que abrem em nova aba
}

export type PageView = 'home' | 'games' | 'game'
