'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Construction, Sparkles, Gamepad2, ArrowRight } from 'lucide-react'
import { PageView } from '@/types/games'

interface HomePageProps {
  onNavigate: (page: PageView) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  }

  const heroDecorations = [
    { emoji: '🐣', top: '5%', left: '5%', delay: 0 },
    { emoji: '🥚', top: '10%', right: '8%', delay: 0.5 },
    { emoji: '🌷', top: '70%', left: '8%', delay: 1 },
    { emoji: '🐰', top: '75%', right: '5%', delay: 0.7 },
    { emoji: '🥚', top: '30%', left: '2%', delay: 1.2 },
    { emoji: '🐣', top: '50%', right: '3%', delay: 0.3 },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Animated Easter decorations */}
        {heroDecorations.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl md:text-4xl"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.2, 1],
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.emoji}
          </motion.div>
        ))}

        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Easter Title */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            variants={itemVariants}
          >
            <motion.span
              className="text-4xl md:text-5xl"
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🐰
            </motion.span>
            <motion.h1
              className="text-4xl md:text-6xl font-bold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Feliz Páscoa!
            </motion.h1>
            <motion.span
              className="text-4xl md:text-5xl"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              🐣
            </motion.span>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8"
            variants={itemVariants}
          >
            Aprenda Inglês Jogando!
          </motion.p>

          <motion.p
            className="text-lg text-blue-200 max-w-xl mx-auto mb-10"
            variants={itemVariants}
          >
            Jogos educativos desenvolvidos especialmente para os alunos do CCAA.
            Divirta-se aprendendo!
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 shadow-xl relative overflow-hidden group"
                onClick={() => onNavigate('games')}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <Gamepad2 className="h-6 w-6 mr-2 relative z-10" />
                <span className="relative z-10">Ir para os Jogos</span>
                <ArrowRight className="h-5 w-5 ml-2 relative z-10" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16 relative z-10">
        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="max-w-2xl mx-auto border-2 border-blue-200 shadow-xl overflow-hidden">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                <motion.span
                  className="text-4xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  🥚
                </motion.span>
                <motion.div
                  className="p-4 bg-blue-100 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Construction className="h-10 w-10 text-blue-700" />
                </motion.div>
                <motion.span
                  className="text-4xl"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🐰
                </motion.span>
              </div>
              <CardTitle className="text-2xl md:text-3xl text-blue-800">
                Novos Jogos em Breve!
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Estamos preparando mais jogos educativos para você. Fique ligado!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <motion.div
                className="flex items-center justify-center gap-2 text-slate-600"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5 text-red-600" />
                </motion.div>
                <span>Aguarde as novidades</span>
                <motion.div
                  animate={{ rotate: [0, -180, -360] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5 text-red-600" />
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { emoji: '🥚', title: 'Vocabulário', desc: 'Jogos para expandir seu vocabulário em inglês', color: 'blue' },
            { emoji: '🐰', title: 'Gramática', desc: 'Aprenda gramática de forma interativa', color: 'red' },
            { emoji: '🐣', title: 'Listening', desc: 'Pratique sua compreensão auditiva', color: 'blue' },
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`text-center border-t-4 ${card.color === 'blue' ? 'border-t-blue-600' : 'border-t-red-600'} shadow-lg cursor-pointer overflow-hidden`}>
                <CardHeader className="pb-2">
                  <motion.div
                    className="text-4xl mb-3"
                    whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.emoji}
                  </motion.div>
                  <CardTitle className={`text-xl ${card.color === 'blue' ? 'text-blue-800' : 'text-red-700'}`}>
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{card.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </>
  )
}
