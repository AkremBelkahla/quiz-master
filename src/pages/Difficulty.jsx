import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuiz } from '../context/QuizContext'
import { useQuizLogic } from '../hooks/useQuizLogic'
import { useState } from 'react'

const difficulties = [
  { 
    id: 'facile',
    name: 'Facile',
    icon: '😊',
    color: 'from-green-400 to-green-600',
    description: 'Questions simples pour débuter',
    animation: 'animate-float'
  },
  {
    id: 'intermediaire',
    name: 'Intermédiaire',
    icon: '🤔',
    color: 'from-yellow-400 to-yellow-600',
    description: 'Pour les joueurs expérimentés',
    animation: 'animate-pulse-slow'
  },
  {
    id: 'difficile',
    name: 'Difficile',
    icon: '😰',
    color: 'from-red-400 to-red-600',
    description: 'Pour les experts uniquement',
    animation: 'animate-glow'
  }
]

export default function Difficulty() {
  const navigate = useNavigate()
  const { dispatch } = useQuiz()
  const { startQuiz } = useQuizLogic()
  const [error, setError] = useState(false)

  const handleDifficultySelect = async (difficulty) => {
    try {
      setError(false)
      dispatch({ type: 'SET_DIFFICULTY', payload: difficulty })
      await startQuiz()
      navigate('/quiz')
    } catch (err) {
      setError(true)
      console.error('Erreur lors du chargement des questions:', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <button
        onClick={() => navigate('/')}
        className="mb-8 btn bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        ← Retour
      </button>

      <motion.h1 
        className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Choisissez la difficulté
      </motion.h1>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-lg mb-6 text-center backdrop-blur-sm"
        >
          Erreur lors du chargement des questions. Veuillez réessayer.
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {difficulties.map((difficulty) => (
          <motion.button
            key={difficulty.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`card w-full flex items-center bg-gradient-to-r ${difficulty.color} text-white shadow-lg hover:shadow-2xl ${difficulty.animation} p-6 transform hover:scale-105 transition-all duration-300`}
            onClick={() => handleDifficultySelect(difficulty.id)}
          >
            <div className="text-4xl mr-4">{difficulty.icon}</div>
            <div className="text-left">
              <h2 className="text-xl font-semibold">{difficulty.name}</h2>
              <p className="text-sm opacity-90">{difficulty.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
