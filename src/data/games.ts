import { Game } from '@/types/games'

export const games: Game[] = [
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
  },
  {
    id: 2,
    title: "Easter Quiz 01",
    description: "Quiz interativo sobre a Páscoa em inglês. Teste seus conhecimentos de forma divertida!",
    iframe: "https://wordwall.net/pt/embed/8ed1fe63f5b941659ffbefcf00ce1136?themeId=1&templateId=5&fontStackId=0",
    wordwallUrl: "https://wordwall.net/pt/resource/8ed1fe63f5b941659ffbefcf00ce1136",
    width: 500,
    height: 380,
    category: "Quiz",
    difficulty: "Iniciante",
    emoji: "🐣"
  },
  {
    id: 3,
    title: "Crossword Puzzle",
    description: "Palavras cruzadas com vocabulário de Páscoa. Complete o puzzle e aprenda novas palavras!",
    iframe: "https://www.educaplay.com/game/8927538-vocabulary_easter_day.html",
    wordwallUrl: "https://www.educaplay.com/game/8927538-vocabulary_easter_day.html",
    width: 795,
    height: 690,
    category: "Vocabulário",
    difficulty: "Intermediário",
    emoji: "✏️"
  }
]
