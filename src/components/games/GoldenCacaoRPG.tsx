'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Heart, Swords, BookOpen, Package, Sparkles, Star, Trophy, Skull } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface PlayerStats {
  hp: number
  maxHp: number
  courage: number
  wisdom: number
}

interface Choice {
  text: string
  nextNode: string
  statChange?: Partial<PlayerStats>
  addItem?: string
  requiredItem?: string
}

interface StoryNode {
  id: string
  title: string
  scene: string[]
  emoji: string
  bgGradient: string
  ambientEmojis: string[]
  choices: Choice[]
  isEnding?: boolean
  endingType?: 'golden' | 'good' | 'bad'
}

// ─── Story Data ──────────────────────────────────────────────────────────────

const storyNodes: Record<string, StoryNode> = {
  start: {
    id: 'start',
    title: 'The Enchanted Easter Forest',
    scene: [
      "You stand at the edge of a magnificent forest. The trees shimmer with a golden glow, and the air smells like chocolate and spring flowers.",
      "Legends speak of the Golden Cacao — a magical treasure hidden deep within this enchanted place. Many adventurers have tried to find it, but none have returned.",
      "A wooden sign reads: \"BEWARE — The path ahead is full of challenges. Only the brave and wise shall find the Golden Cacao.\"",
      "Two paths stretch before you — one covered in colorful candy wrappers, the other dark and overgrown with vines."
    ],
    emoji: '🌳',
    bgGradient: 'from-emerald-900 via-green-800 to-emerald-900',
    ambientEmojis: ['🌿', '🍃', '✨', '🦋', '🌸'],
    choices: [
      { text: "Take the colorful candy path 🍬", nextNode: 'candy_path', statChange: { courage: 1 } },
      { text: "Explore the dark vine path 🌿", nextNode: 'vine_path', statChange: { wisdom: 1 } },
      { text: "Look around for clues first 🔍", nextNode: 'search_start', statChange: { wisdom: 2 }, addItem: 'Old Map' }
    ]
  },

  search_start: {
    id: 'search_start',
    title: 'A Hidden Discovery',
    scene: [
      "You carefully examine the area around the wooden sign. Behind a mossy rock, you find an old, crumpled map!",
      "The map shows a rough drawing of the forest. You can see markings for 'Troll Bridge,' 'Chocolate River,' and something called 'The Golden Tree' deep in the center.",
      "With this knowledge, you feel more prepared for the journey ahead.",
      "Now, which path will you take?"
    ],
    emoji: '🗺️',
    bgGradient: 'from-emerald-900 via-green-800 to-emerald-900',
    ambientEmojis: ['🗺️', '✨', '🔍', '📜', '🌿'],
    choices: [
      { text: "Take the candy path — you know what lies ahead! 🍬", nextNode: 'candy_path', statChange: { courage: 1 } },
      { text: "Take the vine path — the map shows a shortcut! 🌿", nextNode: 'vine_path_map', statChange: { wisdom: 1 } }
    ]
  },

  candy_path: {
    id: 'candy_path',
    title: 'The Marshmallow Troll Bridge',
    scene: [
      "The candy path leads you to a stone bridge over a deep ravine. But the bridge is blocked!",
      "A massive troll made entirely of marshmallows stands guard. Its eyes are two gumdrops, and its club is a giant candy cane.",
      "\"HALT!\" the Marshmallow Troll bellows. \"Nobody crosses MY bridge without answering my challenge!\"",
      "The troll looks tough but... it also looks a bit lonely."
    ],
    emoji: '👹',
    bgGradient: 'from-pink-900 via-rose-800 to-purple-900',
    ambientEmojis: ['🍬', '🫧', '🍡', '☁️', '🌉'],
    choices: [
      { text: "Try to sneak past the troll 🤫", nextNode: 'sneak_troll', statChange: { courage: 2 } },
      { text: "Talk to the troll kindly 💬", nextNode: 'talk_troll', statChange: { wisdom: 2 }, addItem: 'Troll Friendship Token' },
      { text: "Challenge the troll to a dance battle! 💃", nextNode: 'dance_troll', statChange: { courage: 3 } }
    ]
  },

  vine_path: {
    id: 'vine_path',
    title: 'The Whispering Vines',
    scene: [
      "The dark path is eerie but beautiful. Bioluminescent mushrooms light your way with a soft blue glow.",
      "The vines seem to whisper secrets as you pass. You hear fragments: \"...golden... river... beware the witch...\"",
      "Suddenly, the vines form a wall blocking your path! They seem to be testing you.",
      "A voice echoes: \"Speak the magic word to pass, or find another way around.\""
    ],
    emoji: '🌿',
    bgGradient: 'from-indigo-900 via-purple-900 to-violet-900',
    ambientEmojis: ['🍄', '💫', '🌙', '🦎', '✨'],
    choices: [
      { text: "Say \"Please\" — kindness is magic! ✨", nextNode: 'vine_please', statChange: { wisdom: 3 } },
      { text: "Cut through the vines with courage! ⚔️", nextNode: 'vine_cut', statChange: { courage: 2, hp: -1 } },
      { text: "Look for a hidden passage 🔍", nextNode: 'vine_hidden', statChange: { wisdom: 1 } }
    ]
  },

  vine_path_map: {
    id: 'vine_path_map',
    title: 'The Secret Shortcut',
    scene: [
      "Using the old map, you spot a hidden trail through the vines that others have missed!",
      "The path takes you through a magical mushroom grove where everything glows in soft pastels.",
      "You find a small chest hidden behind a giant mushroom. Inside, there's a shimmering chocolate coin!",
      "The map also reveals that the Chocolate River is just ahead."
    ],
    emoji: '🍄',
    bgGradient: 'from-violet-900 via-purple-800 to-indigo-900',
    ambientEmojis: ['🍄', '✨', '💎', '🌟', '🦋'],
    choices: [
      { text: "Take the chocolate coin and continue 🪙", nextNode: 'chocolate_river', statChange: { wisdom: 1 }, addItem: 'Chocolate Coin' },
      { text: "Leave the coin — it might be a trap! 🚫", nextNode: 'chocolate_river', statChange: { wisdom: 2 } }
    ]
  },

  sneak_troll: {
    id: 'sneak_troll',
    title: 'A Daring Escape!',
    scene: [
      "You wait until the troll yawns — its big marshmallow mouth opens wide.",
      "You dash across the bridge as quietly as you can! Your heart pounds like a drum!",
      "The troll turns around just as you reach the other side. \"HEY! WAS THAT A SQUIRREL?\" it mumbles.",
      "You made it! But you feel a little guilty for not being friendly. The Chocolate River sparkles ahead."
    ],
    emoji: '🏃',
    bgGradient: 'from-amber-900 via-orange-800 to-red-900',
    ambientEmojis: ['💨', '⚡', '🏃', '😅', '🌉'],
    choices: [
      { text: "Continue to the Chocolate River 🍫", nextNode: 'chocolate_river' }
    ]
  },

  talk_troll: {
    id: 'talk_troll',
    title: 'A New Friend',
    scene: [
      "\"Hello there!\" you say with a warm smile. \"What's your name?\"",
      "The troll's gumdrop eyes widen in surprise. \"You... you want to know my NAME? Nobody ever asks! I'm Marshy!\"",
      "Marshy the Troll is so happy that it gives you a special Friendship Token — a heart-shaped marshmallow!",
      "\"Take this,\" Marshy says. \"It will help you later on your quest. The Golden Cacao is real, you know! Good luck, friend!\"",
      "Marshy steps aside and lets you cross the bridge with a big, gooey smile."
    ],
    emoji: '🤝',
    bgGradient: 'from-pink-800 via-rose-700 to-pink-800',
    ambientEmojis: ['💖', '🤗', '🍡', '✨', '💝'],
    choices: [
      { text: "Wave goodbye and head to the Chocolate River! 🍫", nextNode: 'chocolate_river' }
    ]
  },

  dance_troll: {
    id: 'dance_troll',
    title: 'Dance Battle!',
    scene: [
      "\"A DANCE BATTLE?!\" the troll roars with excitement. \"NOBODY HAS EVER CHALLENGED ME BEFORE!\"",
      "Music fills the air magically. The troll starts bouncing — surprisingly graceful for a giant marshmallow!",
      "You bust out your best moves! The moonwalk, the robot, and a spectacular spin! 🕺",
      "The troll claps its huge hands. \"AMAZING! You are the BEST dancer I've ever seen! You may pass!\"",
      "The troll gives you a candy cane as a trophy. You feel incredibly brave!"
    ],
    emoji: '💃',
    bgGradient: 'from-fuchsia-900 via-pink-800 to-purple-900',
    ambientEmojis: ['🎵', '🎶', '💃', '🕺', '✨'],
    choices: [
      { text: "Take a bow and head to the Chocolate River! 🍫", nextNode: 'chocolate_river', addItem: 'Candy Cane Trophy' }
    ]
  },

  vine_please: {
    id: 'vine_please',
    title: 'The Magic of Kindness',
    scene: [
      "\"Please,\" you say softly.",
      "The vines shudder, then slowly part aside, revealing a beautiful moonlit path!",
      "Tiny fairy lights appear along the trail, and a gentle voice whispers: \"Kindness is the greatest magic of all.\"",
      "A small fairy appears and hands you a glowing feather. \"This will protect you from the Candy Witch's spells,\" she says.",
      "You feel wise and ready for whatever comes next!"
    ],
    emoji: '🧚',
    bgGradient: 'from-blue-900 via-indigo-800 to-purple-900',
    ambientEmojis: ['🧚', '✨', '💫', '🌟', '🕯️'],
    choices: [
      { text: "Thank the fairy and continue your quest 🌟", nextNode: 'chocolate_river', addItem: 'Magic Feather' }
    ]
  },

  vine_cut: {
    id: 'vine_cut',
    title: 'Through the Thorns',
    scene: [
      "You charge forward and tear through the vines! They scratch your arms as you push through.",
      "It hurts, but your determination is unstoppable! The vines eventually give way.",
      "On the other side, you find yourself near a rushing river. The air smells incredibly sweet...",
      "You lost a bit of health, but your courage is unmatched!"
    ],
    emoji: '⚔️',
    bgGradient: 'from-red-900 via-orange-900 to-amber-900',
    ambientEmojis: ['⚔️', '🔥', '💪', '🩹', '🍃'],
    choices: [
      { text: "Head towards the sweet smell 🍫", nextNode: 'chocolate_river' }
    ]
  },

  vine_hidden: {
    id: 'vine_hidden',
    title: 'The Secret Tunnel',
    scene: [
      "You search carefully and find a small tunnel hidden behind the mushrooms!",
      "The tunnel is narrow but safe. Glowing crystals light your way through.",
      "You emerge on the other side near a stunning chocolate waterfall!",
      "This must be the famous Chocolate River!"
    ],
    emoji: '🕳️',
    bgGradient: 'from-stone-900 via-amber-900 to-yellow-900',
    ambientEmojis: ['💎', '🔦', '✨', '🕳️', '🌟'],
    choices: [
      { text: "Approach the Chocolate River 🍫", nextNode: 'chocolate_river', addItem: 'Glowing Crystal' }
    ]
  },

  chocolate_river: {
    id: 'chocolate_river',
    title: 'The Great Chocolate River',
    scene: [
      "Before you flows a magnificent river of pure, melted chocolate! Chocolate waterfalls cascade from crystal cliffs.",
      "The sweet aroma is intoxicating. On the other side, you can see a mysterious cottage with smoke coming from its chimney.",
      "But how will you cross? The chocolate is thick and warm, but the current is strong!",
      "You notice three options: a wobbly log, some stepping stones made of giant Easter eggs, and a small boat made of a giant cookie."
    ],
    emoji: '🍫',
    bgGradient: 'from-amber-950 via-yellow-900 to-orange-950',
    ambientEmojis: ['🍫', '🌊', '🥚', '🍪', '✨'],
    choices: [
      { text: "Cross on the wobbly log carefully 🪵", nextNode: 'candy_witch', statChange: { courage: 1, wisdom: 1 } },
      { text: "Jump across the Easter egg stones! 🥚", nextNode: 'egg_jump', statChange: { courage: 2 } },
      { text: "Sail across in the cookie boat! 🍪", nextNode: 'candy_witch', statChange: { wisdom: 1 }, addItem: 'Cookie Boat Piece' }
    ]
  },

  egg_jump: {
    id: 'egg_jump',
    title: 'The Easter Egg Hop!',
    scene: [
      "You leap from egg to egg! Each one is beautifully painted with different patterns.",
      "Red egg... blue egg... GOLDEN egg! Wait — the golden egg wobbles!",
      "You slip and nearly fall into the chocolate river! But you grab the next egg just in time!",
      "As you land safely on the other side, you notice the golden egg had something written on it: \"The answer is always KINDNESS.\"",
      "You wonder what that could mean..."
    ],
    emoji: '🥚',
    bgGradient: 'from-amber-900 via-yellow-800 to-orange-900',
    ambientEmojis: ['🥚', '🐣', '✨', '💫', '🌈'],
    choices: [
      { text: "Remember the clue and approach the cottage 🏠", nextNode: 'candy_witch', statChange: { wisdom: 2 } }
    ]
  },

  candy_witch: {
    id: 'candy_witch',
    title: "The Candy Witch's Cottage",
    scene: [
      "The cottage is made entirely of candy! Gingerbread walls, frosting roof, and candy-cane columns!",
      "An old woman opens the door. She wears a hat made of wrapped chocolates and carries a candy wand.",
      "\"Welcome, young adventurer!\" she cackles. \"I am the Candy Witch! I know you seek the Golden Cacao...\"",
      "\"I can show you the way, BUT — you must help me with something first. My magic cauldron needs a special ingredient, and I'm too old to get it.\"",
      "She points to a nearby patch of glowing sugar flowers. \"Or... you could just try to steal my map while I'm not looking. Your choice!\""
    ],
    emoji: '🧙‍♀️',
    bgGradient: 'from-purple-950 via-violet-900 to-fuchsia-950',
    ambientEmojis: ['🍬', '🏠', '🧙‍♀️', '✨', '🍭'],
    choices: [
      { text: "Help the Candy Witch gather sugar flowers 🌸", nextNode: 'help_witch', statChange: { wisdom: 2 }, addItem: 'Witch\'s Blessing' },
      { text: "Try to steal her map secretly 🗺️", nextNode: 'steal_witch', statChange: { courage: 1, hp: -2 } },
      { text: "Offer her an item from your inventory 🎁", nextNode: 'gift_witch', requiredItem: 'Troll Friendship Token', statChange: { wisdom: 3 } }
    ]
  },

  help_witch: {
    id: 'help_witch',
    title: 'A Magical Reward',
    scene: [
      "You spend time carefully picking the glowing sugar flowers. They sparkle in your hands like tiny stars!",
      "The Candy Witch is delighted! \"Oh, wonderful! You are kind and patient!\"",
      "She throws the flowers into her cauldron. POOF! A shower of golden sparkles fills the room!",
      "\"Here, take this Enchanted Compass. It will guide you to the Golden Cacao Tree!\"",
      "\"But beware — the Easter Bunny Guardian guards the tree. You must prove your worth to it!\""
    ],
    emoji: '🌸',
    bgGradient: 'from-pink-900 via-rose-800 to-purple-900',
    ambientEmojis: ['🌸', '⭐', '✨', '🧪', '💫'],
    choices: [
      { text: "Take the compass and head to the Golden Tree! 🧭", nextNode: 'bunny_guardian', addItem: 'Enchanted Compass' }
    ]
  },

  steal_witch: {
    id: 'steal_witch',
    title: 'Caught Red-Handed!',
    scene: [
      "You wait until the witch turns around and reach for her map...",
      "ZAP! A magical barrier shocks your hand! The witch spins around furiously!",
      "\"THIEF!\" she screeches. \"I put a protection spell on everything, you silly adventurer!\"",
      "She waves her candy wand and you feel weaker. \"I'll still let you go because it's Easter, but you've lost my trust!\"",
      "\"The Golden Tree is to the north. That's all I'll tell you. Now GO!\""
    ],
    emoji: '⚡',
    bgGradient: 'from-red-950 via-orange-900 to-yellow-900',
    ambientEmojis: ['⚡', '💥', '😠', '🔥', '💢'],
    choices: [
      { text: "Leave quickly and search for the Golden Tree 🌳", nextNode: 'bunny_guardian' }
    ]
  },

  gift_witch: {
    id: 'gift_witch',
    title: 'A Generous Heart',
    scene: [
      "You present Marshy's Friendship Token — the heart-shaped marshmallow!",
      "The witch's eyes fill with tears. \"This... this is from Marshy? My old friend Marshy?!\"",
      "\"We used to play together when we were young,\" she sniffs. \"I haven't seen Marshy in years...\"",
      "Overwhelmed with emotion, the witch gives you her most precious possession: a Golden Key!",
      "\"This key opens the chamber of the Golden Cacao Tree. Nobody else has one. You are truly special, adventurer!\""
    ],
    emoji: '💝',
    bgGradient: 'from-yellow-900 via-amber-800 to-orange-900',
    ambientEmojis: ['💝', '😢', '✨', '🔑', '💫'],
    choices: [
      { text: "Promise to tell Marshy the witch says hello! Head to the Golden Tree! 🌳", nextNode: 'bunny_guardian', addItem: 'Golden Key' }
    ]
  },

  bunny_guardian: {
    id: 'bunny_guardian',
    title: 'The Easter Bunny Guardian',
    scene: [
      "You reach a magnificent clearing bathed in golden light. In the center stands an enormous tree with golden cacao pods!",
      "But between you and the tree stands the Easter Bunny Guardian — a majestic, giant rabbit with crystal armor and a crown of flowers!",
      "\"HALT, adventurer!\" the Guardian speaks with a deep, noble voice. \"Only those who are truly worthy may approach the Golden Cacao Tree.\"",
      "\"Tell me — what is the most important thing you've learned on your journey?\""
    ],
    emoji: '🐰',
    bgGradient: 'from-yellow-900 via-amber-800 to-yellow-900',
    ambientEmojis: ['🐰', '👑', '✨', '🌟', '💎'],
    choices: [
      { text: "\"Kindness is the greatest magic!\" 💖", nextNode: 'golden_ending', statChange: { wisdom: 5 } },
      { text: "\"Courage means facing your fears!\" ⚔️", nextNode: 'good_ending', statChange: { courage: 5 } },
      { text: "\"I want the treasure! Give it to me NOW!\" 😤", nextNode: 'bad_ending', statChange: { hp: -3 } }
    ]
  },

  golden_ending: {
    id: 'golden_ending',
    title: '🏆 THE GOLDEN ENDING 🏆',
    scene: [
      "The Easter Bunny Guardian smiles warmly. \"You have learned the most important lesson of all.\"",
      "The Golden Cacao Tree begins to glow brilliantly! A single, perfect golden cacao pod floats down into your hands!",
      "\"This Golden Cacao has the power to spread kindness and joy wherever it goes,\" the Guardian explains.",
      "\"Share its chocolate with everyone you meet, and the world will become a sweeter place.\"",
      "🎉 CONGRATULATIONS! You found the legendary Golden Cacao! 🎉",
      "Your journey showed that kindness, wisdom, and friendship are the greatest treasures of all!",
      "🍫✨ THE END ✨🍫"
    ],
    emoji: '🏆',
    bgGradient: 'from-yellow-600 via-amber-500 to-yellow-600',
    ambientEmojis: ['🏆', '⭐', '🎉', '🍫', '✨', '👑', '💫', '🌟'],
    choices: [],
    isEnding: true,
    endingType: 'golden'
  },

  good_ending: {
    id: 'good_ending',
    title: '⭐ THE BRAVE ENDING ⭐',
    scene: [
      "The Guardian nods respectfully. \"Courage is indeed important, young adventurer.\"",
      "\"But true courage means being brave enough to be KIND, even when it's hard.\"",
      "The Guardian gives you a Silver Cacao Pod. \"This is not the Golden Cacao, but it is still special.\"",
      "\"Come back when you've learned that the bravest thing of all is showing kindness to everyone — even trolls and witches.\"",
      "⭐ You completed the quest with honor! Try again to find the GOLDEN ending! ⭐"
    ],
    emoji: '⭐',
    bgGradient: 'from-slate-700 via-blue-800 to-slate-700',
    ambientEmojis: ['⭐', '🥈', '💪', '✨', '🌙'],
    choices: [],
    isEnding: true,
    endingType: 'good'
  },

  bad_ending: {
    id: 'bad_ending',
    title: '💀 THE BITTER ENDING 💀',
    scene: [
      "The Easter Bunny Guardian's eyes flash with disappointment.",
      "\"GREED?! After everything you've experienced, you only care about the treasure?\"",
      "The Guardian stomps its massive foot. The golden light fades. The tree withers.",
      "\"The Golden Cacao only reveals itself to those with a pure heart. You are not ready.\"",
      "You are transported back to the forest entrance. The journey must begin again...",
      "💀 Try again and remember: it's not about the treasure, it's about the journey! 💀"
    ],
    emoji: '💀',
    bgGradient: 'from-gray-900 via-stone-900 to-gray-900',
    ambientEmojis: ['💀', '💨', '😔', '🌑', '❌'],
    choices: [],
    isEnding: true,
    endingType: 'bad'
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

interface GoldenCacaoRPGProps {
  onBack: () => void
}

export function GoldenCacaoRPG({ onBack }: GoldenCacaoRPGProps) {
  const [currentNodeId, setCurrentNodeId] = useState('start')
  const [stats, setStats] = useState<PlayerStats>({ hp: 5, maxHp: 5, courage: 0, wisdom: 0 })
  const [inventory, setInventory] = useState<string[]>([])
  const [displayedLines, setDisplayedLines] = useState(0)
  const [showChoices, setShowChoices] = useState(false)
  const [visitedNodes, setVisitedNodes] = useState<string[]>(['start'])
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentNode = storyNodes[currentNodeId]

  // Typewriter effect
  useEffect(() => {
    setDisplayedLines(0)
    setShowChoices(false)
    let lineIndex = 0
    const timer = setInterval(() => {
      lineIndex++
      setDisplayedLines(lineIndex)
      if (lineIndex >= currentNode.scene.length) {
        clearInterval(timer)
        setTimeout(() => setShowChoices(true), 400)
      }
    }, 800)
    return () => clearInterval(timer)
  }, [currentNodeId, currentNode.scene.length])

  const handleChoice = useCallback((choice: Choice) => {
    if (choice.requiredItem && !inventory.includes(choice.requiredItem)) {
      return // can't select without required item
    }

    setIsTransitioning(true)

    // Apply stat changes
    if (choice.statChange) {
      setStats(prev => ({
        hp: Math.max(0, Math.min(prev.maxHp, prev.hp + (choice.statChange?.hp || 0))),
        maxHp: prev.maxHp,
        courage: prev.courage + (choice.statChange?.courage || 0),
        wisdom: prev.wisdom + (choice.statChange?.wisdom || 0)
      }))
    }

    // Add item
    if (choice.addItem) {
      setInventory(prev => [...prev, choice.addItem!])
    }

    // Navigate
    setTimeout(() => {
      setCurrentNodeId(choice.nextNode)
      setVisitedNodes(prev => [...prev, choice.nextNode])
      setIsTransitioning(false)
    }, 600)
  }, [inventory])

  const handleRestart = () => {
    setCurrentNodeId('start')
    setStats({ hp: 5, maxHp: 5, courage: 0, wisdom: 0 })
    setInventory([])
    setVisitedNodes(['start'])
    setIsTransitioning(false)
  }

  const totalNodes = Object.keys(storyNodes).length
  const progress = Math.round((visitedNodes.length / totalNodes) * 100)

  return (
    <main className="flex-1 container mx-auto px-4 py-6 md:py-8 relative z-10 max-w-4xl">
      {/* Back Button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Button
          variant="ghost"
          className="mb-4 text-slate-600 hover:text-amber-700"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Jogos
        </Button>
      </motion.div>

      {/* Game Title Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
          🍫 The Quest for the Golden Cacao 🍫
        </h1>
        <p className="text-amber-700/70 mt-1 text-sm">An Easter Fantasy Adventure</p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-4"
      >
        {/* HP */}
        <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-full px-3 py-1.5 shadow-sm">
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <span className="text-sm font-bold text-red-700">
            {Array.from({ length: stats.maxHp }, (_, i) => (
              <span key={i} className={i < stats.hp ? 'text-red-500' : 'text-red-200'}>♥</span>
            ))}
          </span>
        </div>
        {/* Courage */}
        <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1.5 shadow-sm">
          <Swords className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-bold text-orange-700">{stats.courage}</span>
        </div>
        {/* Wisdom */}
        <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5 shadow-sm">
          <BookOpen className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-bold text-blue-700">{stats.wisdom}</span>
        </div>
        {/* Inventory Count */}
        <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 rounded-full px-3 py-1.5 shadow-sm">
          <Package className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-bold text-purple-700">{inventory.length}</span>
        </div>
      </motion.div>

      {/* Inventory Panel (collapsible) */}
      {inventory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex flex-wrap justify-center gap-2 mb-4"
        >
          {inventory.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                {item}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="flex justify-between text-xs text-amber-600/60 mb-1">
          <span>Chapter {visitedNodes.length}</span>
          <span>{progress}% explored</span>
        </div>
        <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Main Game Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNodeId}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="relative"
        >
          <div className={`rounded-2xl overflow-hidden shadow-2xl border-2 ${
            currentNode.isEnding && currentNode.endingType === 'golden'
              ? 'border-yellow-400 shadow-yellow-400/30'
              : currentNode.isEnding && currentNode.endingType === 'bad'
                ? 'border-red-800 shadow-red-800/30'
                : 'border-amber-700/30'
          }`}>
            {/* Scene Header with ambient animation */}
            <div className={`relative bg-gradient-to-r ${currentNode.bgGradient} p-6 pb-8 overflow-hidden`}>
              {/* Floating ambient emojis */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {currentNode.ambientEmojis.map((emoji, i) => (
                  <motion.span
                    key={`${currentNodeId}-${i}`}
                    className="absolute text-2xl opacity-30"
                    initial={{
                      x: `${Math.random() * 100}%`,
                      y: `${100 + Math.random() * 20}%`,
                    }}
                    animate={{
                      y: `-20%`,
                      x: `${Math.random() * 100}%`,
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 6 + Math.random() * 8,
                      repeat: Infinity,
                      delay: i * 1.2,
                      ease: 'linear'
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>

              {/* Chapter title */}
              <div className="relative z-10 text-center">
                <motion.span
                  className="text-5xl md:text-6xl block mb-3"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {currentNode.emoji}
                </motion.span>
                <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                  {currentNode.title}
                </h2>

                {/* Ending badge */}
                {currentNode.isEnding && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.5 }}
                    className="mt-3"
                  >
                    {currentNode.endingType === 'golden' && (
                      <Badge className="bg-yellow-400 text-yellow-900 text-lg px-4 py-1">
                        <Trophy className="h-5 w-5 mr-2" /> GOLDEN ENDING
                      </Badge>
                    )}
                    {currentNode.endingType === 'good' && (
                      <Badge className="bg-blue-400 text-blue-900 text-lg px-4 py-1">
                        <Star className="h-5 w-5 mr-2" /> BRAVE ENDING
                      </Badge>
                    )}
                    {currentNode.endingType === 'bad' && (
                      <Badge className="bg-red-600 text-white text-lg px-4 py-1">
                        <Skull className="h-5 w-5 mr-2" /> BITTER ENDING
                      </Badge>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Story Text */}
            <div className="bg-gradient-to-b from-amber-50 to-white p-6 md:p-8">
              <div className="space-y-4 min-h-[200px]">
                {currentNode.scene.slice(0, displayedLines).map((line, i) => (
                  <motion.p
                    key={`${currentNodeId}-line-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-gray-800 text-base md:text-lg leading-relaxed font-serif"
                  >
                    {line}
                  </motion.p>
                ))}

                {/* Typing indicator */}
                {displayedLines < currentNode.scene.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex gap-1 items-center text-amber-400"
                  >
                    <span className="w-2 h-2 bg-amber-400 rounded-full" />
                    <span className="w-2 h-2 bg-amber-400 rounded-full" />
                    <span className="w-2 h-2 bg-amber-400 rounded-full" />
                  </motion.div>
                )}
              </div>

              {/* Choices */}
              <AnimatePresence>
                {showChoices && currentNode.choices.length > 0 && !isTransitioning && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 space-y-3"
                  >
                    <p className="text-sm font-semibold text-amber-700 uppercase tracking-wider mb-4">
                      ⚔️ What do you do?
                    </p>
                    {currentNode.choices.map((choice, i) => {
                      const isDisabled = choice.requiredItem && !inventory.includes(choice.requiredItem)
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                        >
                          <button
                            onClick={() => handleChoice(choice)}
                            disabled={!!isDisabled}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group ${
                              isDisabled
                                ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                                : 'border-amber-200 bg-white hover:border-amber-500 hover:bg-amber-50 hover:shadow-lg hover:shadow-amber-200/50 hover:-translate-y-0.5 active:translate-y-0'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-800 group-hover:text-amber-800'}`}>
                                {choice.text}
                              </span>
                              {choice.requiredItem && (
                                <Badge variant="outline" className={`text-xs ml-2 ${
                                  isDisabled ? 'border-gray-300 text-gray-400' : 'border-purple-300 text-purple-600'
                                }`}>
                                  Requires: {choice.requiredItem}
                                </Badge>
                              )}
                            </div>
                            {choice.statChange && !isDisabled && (
                              <div className="flex gap-2 mt-2">
                                {choice.statChange.hp && (
                                  <span className={`text-xs ${choice.statChange.hp > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {choice.statChange.hp > 0 ? '+' : ''}{choice.statChange.hp} HP
                                  </span>
                                )}
                                {choice.statChange.courage && (
                                  <span className="text-xs text-orange-600">+{choice.statChange.courage} ⚔️</span>
                                )}
                                {choice.statChange.wisdom && (
                                  <span className="text-xs text-blue-600">+{choice.statChange.wisdom} 📖</span>
                                )}
                              </div>
                            )}
                            {choice.addItem && !isDisabled && (
                              <span className="text-xs text-purple-500 mt-1 block">
                                📦 Receive: {choice.addItem}
                              </span>
                            )}
                          </button>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Ending Actions */}
              {showChoices && currentNode.isEnding && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 space-y-4"
                >
                  {/* Final Stats */}
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
                    <h3 className="font-bold text-amber-800 mb-2 text-center">📊 Your Adventure Stats</h3>
                    <div className="flex justify-center gap-6 text-sm">
                      <span className="text-red-600">❤️ HP: {stats.hp}/{stats.maxHp}</span>
                      <span className="text-orange-600">⚔️ Courage: {stats.courage}</span>
                      <span className="text-blue-600">📖 Wisdom: {stats.wisdom}</span>
                      <span className="text-purple-600">📦 Items: {inventory.length}</span>
                    </div>
                    <div className="mt-2 text-center text-xs text-amber-600">
                      Chapters explored: {visitedNodes.length} / {totalNodes}
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={handleRestart}
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Play Again
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onBack}
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Games
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="text-6xl"
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
