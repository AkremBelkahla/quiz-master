import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuiz } from '../context/QuizContext'
import { useQuizLogic } from '../hooks/useQuizLogic'

const difficulties = [
  { id: 'facile', name: 'Facile', icon: '😊', color: 'bg-green-100 text-green-800' },
  { id: 'intermediaire', name: 'Intermédiaire', icon: '🤔', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'difficile', name: 'Difficile', icon: '😰', color: 'bg-red-100 text-red-800' }
]

export default function Difficulty() {
  const navigate = useNavigate()
  const { state, dispatch } = useQuiz()
  const { fetchQuestions } = useQuizLogic()

  const handleDifficultySelect = async (difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty })
    await fetchQuestions()
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
        className="mb-8 btn btn-secondary"
      >
        ← Retour
      </button>

      <h1 className="text-4xl font-bold text-center mb-8">
        Choisissez la difficulté
      </h1>

      <div className="space-y-6">
        {difficulties.map((difficulty) => (
          <motion.button
            key={difficulty.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={"card w-full flex items-center " + difficulty.color}
            onClick={() => handleDifficultySelect(difficulty.id)}
          >
            <div className="text-4xl mr-4">{difficulty.icon}</div>
            <div className="text-left">
              <h2 className="text-xl font-semibold">{difficulty.name}</h2>
              <p className="text-sm opacity-75">
                {difficulty.id === 'facile' && "Questions simples pour débuter"}
                {difficulty.id === 'intermediaire' && "Pour les joueurs expérimentés"}
                {difficulty.id === 'difficile' && "Pour les experts uniquement"}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
