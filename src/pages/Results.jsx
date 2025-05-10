import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuiz } from '../context/QuizContext'
import { 
  TrophyIcon, 
  ShareIcon, 
  HomeIcon 
} from '@heroicons/react/24/solid'

export default function Results() {
  const navigate = useNavigate()
  const { state, dispatch } = useQuiz()

  const getPerformanceMessage = () => {
    if (state.score === 10) return "Parfait ! Un sans faute !"
    if (state.score >= 8) return "Excellent ! Presque parfait !"
    if (state.score >= 6) return "Bien joué ! Continue comme ça !"
    if (state.score >= 4) return "Pas mal ! Tu peux faire mieux !"
    return "Continue de t'entraîner !"
  }

  const handleShare = () => {
    const text = `J'ai obtenu ${state.score}/10 au quiz ${state.category} en difficulté ${state.difficulty} sur QuizMaster ! Peux-tu faire mieux ?`
    
    if (navigator.share) {
      navigator.share({
        title: 'Mon score QuizMaster',
        text: text,
        url: window.location.origin
      })
    } else {
      navigator.clipboard.writeText(text)
        .then(() => alert('Score copié dans le presse-papier !'))
    }
  }

  const handleRestart = () => {
    dispatch({ type: 'RESET_QUIZ' })
    navigate('/')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-xl mx-auto text-center"
    >
      <div className="card">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6"
        >
          <TrophyIcon className="w-full h-full text-yellow-500" />
        </motion.div>

        <h1 className="text-3xl font-bold mb-4">
          {getPerformanceMessage()}
        </h1>

        <div className="text-6xl font-bold mb-8 text-primary">
          {state.score}/10
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Catégorie : {state.category}
          </p>
          <p className="text-gray-600">
            Difficulté : {state.difficulty}
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary flex items-center gap-2"
            onClick={handleShare}
          >
            <ShareIcon className="w-5 h-5" />
            Partager
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-secondary flex items-center gap-2"
            onClick={handleRestart}
          >
            <HomeIcon className="w-5 h-5" />
            Accueil
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
