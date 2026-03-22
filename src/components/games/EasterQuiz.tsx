'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, Sparkles } from 'lucide-react'
import { easterQuizQuestions } from '@/data/easter-quiz'

interface EasterQuizProps {
  onBack: () => void
}

type QuizState = 'playing' | 'result'

export function EasterQuiz({ onBack }: EasterQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
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
    if (!answered) return "border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
    if (index === question.correctAnswer) return "border-green-500 bg-green-50 text-green-700"
    if (index === selectedAnswer && index !== question.correctAnswer) return "border-red-500 bg-red-50 text-red-700"
    return "border-slate-200 opacity-50"
  }

  if (quizState === 'result') {
    const scoreInfo = getScoreMessage()
    const percentage = Math.round((score / totalQuestions) * 100)

    // Confetti particles
    const confetti = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      emoji: ['🎉', '🎊', '⭐', '✨', '🌟'][Math.floor(Math.random() * 5)]
    }))

    return (
      <main className="flex-1 container mx-auto px-4 py-8 md:py-10 relative z-10 overflow-hidden">
        {/* Confetti animation */}
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute text-2xl pointer-events-none"
            style={{ left: `${c.x}%`, top: -50 }}
            animate={{
              y: [0, window.innerHeight + 100],
              rotate: [0, 360],
              opacity: [1, 0]
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {c.emoji}
          </motion.div>
        ))}

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="ghost"
              className="mb-6 text-slate-600 hover:text-blue-700"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Jogos
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <Card className="border-2 border-blue-200 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-800 text-white text-center py-8">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {scoreInfo.emoji}
                </motion.div>
                <CardTitle className="text-3xl md:text-4xl">
                  Desafio Concluído!
                </CardTitle>
                <CardDescription className="text-blue-100 text-lg mt-2">
                  {scoreInfo.message}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                >
                  <div className="text-6xl font-bold text-blue-700 mb-2">
                    {score}/{totalQuestions}
                  </div>
                  <div className="text-2xl text-slate-600">
                    {percentage}% de acerto
                  </div>
                </motion.div>

                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="#e2e8f0" strokeWidth="12" fill="none" />
                      <motion.circle
                        cx="64" cy="64" r="56"
                        stroke={percentage >= 60 ? "#22c55e" : percentage >= 40 ? "#eab308" : "#ef4444"}
                        strokeWidth="12"
                        fill="none"
                        initial={{ strokeDasharray: "0 352" }}
                        animate={{ strokeDasharray: `${(percentage / 100) * 352} 352` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        strokeLinecap="round"
                      />
                    </svg>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Trophy className={`h-10 w-10 ${percentage >= 60 ? 'text-green-500' : percentage >= 40 ? 'text-yellow-500' : 'text-red-500'}`} />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex justify-center gap-3 flex-wrap mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Badge className="bg-blue-600 text-white text-sm px-4 py-1">🐰 {totalQuestions} Questões</Badge>
                  <Badge className="bg-green-600 text-white text-sm px-4 py-1">✅ {score} Acertos</Badge>
                  <Badge className="bg-red-600 text-white text-sm px-4 py-1">❌ {totalQuestions - score} Erros</Badge>
                </motion.div>

                <motion.p
                  className="text-slate-600 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  {percentage >= 80 ? "Parabéns! Você conhece muito bem o vocabulário de Páscoa em inglês!" :
                   percentage >= 60 ? "Ótimo trabalho! Continue praticando para melhorar ainda mais!" :
                   "Não desanime! Cada tentativa é uma oportunidade de aprendizado!"}
                </motion.p>
              </CardContent>
              <CardFooter className="justify-center gap-4 pb-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleRestart} className="bg-blue-700 hover:bg-blue-800 text-white">
                    <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 0.5 }}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                    </motion.span>
                    Jogar Novamente
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" onClick={onBack} className="border-blue-200 text-blue-700">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar aos Jogos
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-8 md:py-10 relative z-10">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button variant="ghost" className="mb-6 text-slate-600 hover:text-blue-700" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Jogos
          </Button>
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                🐰
              </motion.span>
              Desafio de Páscoa
            </h2>
            <Badge className="bg-red-600 text-white">
              {currentQuestion + 1}/{totalQuestions}
            </Badge>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: 'left' }}
          >
            <Progress value={progress} className="h-3" />
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-blue-200 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-800 text-white pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <motion.span
                    className="text-3xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    🥚
                  </motion.span>
                  <CardTitle className="text-lg md:text-xl">Questão {currentQuestion + 1}</CardTitle>
                </div>
                <CardDescription className="text-blue-100 text-lg md:text-xl font-medium">
                  {question.question}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-3">
                  {question.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={answered}
                      className={`p-4 rounded-xl border-2 text-left transition-all font-medium ${getOptionStyle(index)}`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={!answered ? { scale: 1.02, x: 5 } : {}}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <motion.span
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-sm"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          {String.fromCharCode(65 + index)}
                        </motion.span>
                        <span className="text-base md:text-lg">{option}</span>
                        {answered && index === question.correctAnswer && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <CheckCircle className="h-6 w-6 text-green-500 ml-auto" />
                          </motion.div>
                        )}
                        {answered && index === selectedAnswer && index !== question.correctAnswer && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <XCircle className="h-6 w-6 text-red-500 ml-auto" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence>
                  {answered && (
                    <motion.div
                      className={`mt-6 p-4 rounded-xl ${selectedAnswer === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="flex items-start gap-2">
                        {selectedAnswer === question.correctAnswer ? (
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          </motion.div>
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              <CardFooter className="justify-between p-6 pt-0">
                <motion.div
                  className="flex items-center gap-2 text-slate-600"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Pontuação: {score}</span>
                </motion.div>
                <AnimatePresence>
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={handleNextQuestion} className="bg-blue-700 hover:bg-blue-800 text-white">
                          {currentQuestion + 1 < totalQuestions ? 'Próxima' : 'Ver Resultado'}
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
