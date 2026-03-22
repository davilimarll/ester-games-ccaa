'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, PartyPopper } from 'lucide-react'
import { easterQuizQuestions, QuizQuestion } from '@/data/easter-quiz'

interface EasterQuizProps {
  onBack: () => void
}

type QuizState = 'playing' | 'result'

export function EasterQuiz({ onBack }: EasterQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizState, setQuizState] = useState<QuizState>('playing')
  const [answered, setAnswered] = useState(false)

  const question = easterQuizQuestions[currentQuestion]
  const totalQuestions = easterQuizQuestions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const handleAnswer = (answerIndex: number) => {
    if (answered) return

    setSelectedAnswer(answerIndex)
    setAnswered(true)

    if (answerIndex === question.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setQuizState('result')
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizState('playing')
    setAnswered(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100
    if (percentage === 100) return { message: "Perfeito! Você é um expert em Páscoa! 🏆", emoji: "🎉" }
    if (percentage >= 80) return { message: "Excelente! Muito bem! 🌟", emoji: "⭐" }
    if (percentage >= 60) return { message: "Muito bom! Continue praticando! 💪", emoji: "👍" }
    if (percentage >= 40) return { message: "Bom! Você está aprendendo! 📚", emoji: "📖" }
    return { message: "Continue estudando! Você vai melhorar! 💪", emoji: "🎯" }
  }

  const getOptionStyle = (index: number) => {
    if (!answered) {
      return "border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
    }

    if (index === question.correctAnswer) {
      return "border-green-500 bg-green-50 text-green-700"
    }

    if (index === selectedAnswer && index !== question.correctAnswer) {
      return "border-red-500 bg-red-50 text-red-700"
    }

    return "border-slate-200 opacity-50"
  }

  if (quizState === 'result') {
    const scoreInfo = getScoreMessage()
    const percentage = Math.round((score / totalQuestions) * 100)

    return (
      <main className="flex-1 container mx-auto px-4 py-8 md:py-10 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 text-slate-600 hover:text-blue-700"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Jogos
          </Button>

          {/* Result Card */}
          <Card className="border-2 border-blue-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-800 text-white text-center py-8">
              <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
              <CardTitle className="text-3xl md:text-4xl">
                Desafio Concluído!
              </CardTitle>
              <CardDescription className="text-blue-100 text-lg mt-2">
                {scoreInfo.message}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              {/* Score Display */}
              <div className="mb-6">
                <div className="text-6xl font-bold text-blue-700 mb-2">
                  {score}/{totalQuestions}
                </div>
                <div className="text-2xl text-slate-600">
                  {percentage}% de acerto
                </div>
              </div>

              {/* Progress Ring */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e2e8f0"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke={percentage >= 60 ? "#22c55e" : percentage >= 40 ? "#eab308" : "#ef4444"}
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(percentage / 100) * 352} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Trophy className={`h-10 w-10 ${percentage >= 60 ? 'text-green-500' : percentage >= 40 ? 'text-yellow-500' : 'text-red-500'}`} />
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex justify-center gap-3 flex-wrap mb-6">
                <Badge className="bg-blue-600 text-white text-sm px-4 py-1">
                  🐰 {totalQuestions} Questões
                </Badge>
                <Badge className="bg-green-600 text-white text-sm px-4 py-1">
                  ✅ {score} Acertos
                </Badge>
                <Badge className="bg-red-600 text-white text-sm px-4 py-1">
                  ❌ {totalQuestions - score} Erros
                </Badge>
              </div>

              {/* Encouragement */}
              <p className="text-slate-600 mb-6">
                {percentage >= 80
                  ? "Parabéns! Você conhece muito bem o vocabulário de Páscoa em inglês!"
                  : percentage >= 60
                  ? "Ótimo trabalho! Continue praticando para melhorar ainda mais!"
                  : "Não desanime! Cada tentativa é uma oportunidade de aprendizado!"}
              </p>
            </CardContent>
            <CardFooter className="justify-center gap-4 pb-8">
              <Button
                onClick={handleRestart}
                className="bg-blue-700 hover:bg-blue-800 text-white"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Jogar Novamente
              </Button>
              <Button
                variant="outline"
                onClick={onBack}
                className="border-blue-200 text-blue-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar aos Jogos
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-8 md:py-10 relative z-10">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-slate-600 hover:text-blue-700"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Jogos
        </Button>

        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-blue-800">
              🐰 Desafio de Páscoa
            </h2>
            <Badge className="bg-red-600 text-white">
              {currentQuestion + 1}/{totalQuestions}
            </Badge>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="border-2 border-blue-200 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-800 text-white pb-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🥚</span>
              <CardTitle className="text-lg md:text-xl">
                Questão {currentQuestion + 1}
              </CardTitle>
            </div>
            <CardDescription className="text-blue-100 text-lg md:text-xl font-medium">
              {question.question}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {/* Options */}
            <div className="grid gap-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                  className={`p-4 rounded-xl border-2 text-left transition-all font-medium ${getOptionStyle(index)}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-base md:text-lg">{option}</span>
                    {answered && index === question.correctAnswer && (
                      <CheckCircle className="h-6 w-6 text-green-500 ml-auto" />
                    )}
                    {answered && index === selectedAnswer && index !== question.correctAnswer && (
                      <XCircle className="h-6 w-6 text-red-500 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {answered && (
              <div className={`mt-6 p-4 rounded-xl ${selectedAnswer === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                <div className="flex items-start gap-2">
                  {selectedAnswer === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-semibold mb-1 ${selectedAnswer === question.correctAnswer ? 'text-green-700' : 'text-amber-700'}`}>
                      {selectedAnswer === question.correctAnswer ? 'Correto! 🎉' : 'Incorreto'}
                    </p>
                    <p className="text-slate-600">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-between p-6 pt-0">
            <div className="flex items-center gap-2 text-slate-600">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span>Pontuação: {score}</span>
            </div>
            {answered && (
              <Button
                onClick={handleNextQuestion}
                className="bg-blue-700 hover:bg-blue-800 text-white"
              >
                {currentQuestion + 1 < totalQuestions ? 'Próxima' : 'Ver Resultado'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
