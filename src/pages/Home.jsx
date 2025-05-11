import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuiz } from '../context/QuizContext'

const categories = [
  { id: 'sport', name: 'Sport', icon: '⚽' },
  { id: 'sciences', name: 'Sciences', icon: '🔬' },
  { id: 'histoire', name: 'Histoire', icon: '📚' },
  { id: 'animaux', name: 'Animaux', icon: '🦁' },
  { id: 'jeux-video', name: 'Jeux Vidéo', icon: '🎮' },
  { id: 'geographie', name: 'Géographie', icon: '🗺️' },
  { id: 'politique', name: 'Politique', icon: '🏛️' },
  { id: 'vehicules', name: 'Véhicules', icon: '🚗' },
  { id: 'divertissement', name: 'Divertissement', icon: '🎭' }
]

const categoryColors = {
  'sport': 'from-blue-500 to-blue-600',
  'sciences': 'from-green-500 to-green-600',
  'histoire': 'from-yellow-500 to-yellow-600',
  'animaux': 'from-orange-500 to-orange-600',
  'jeux-video': 'from-red-500 to-red-600',
  'geographie': 'from-teal-500 to-teal-600',
  'politique': 'from-purple-500 to-purple-600',
  'vehicules': 'from-gray-500 to-gray-600',
  'divertissement': 'from-pink-500 to-pink-600',
  'culture-generale': 'from-purple-500 to-purple-600'
}

export default function Home() {
  const navigate = useNavigate()
  const { dispatch } = useQuiz()

  const handleCategorySelect = (categoryId) => {
    console.log('Catégorie sélectionnée:', categoryId)
    dispatch({ type: 'SET_CATEGORY', payload: categoryId })
    navigate('/difficulty')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <motion.div 
        className="w-full flex justify-center mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="/logo.png" 
          alt="QuizMaster Logo" 
          className="object-contain animate-float"
        />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="card hover:shadow-xl transition-all bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm text-white overflow-hidden border border-white/20"
            onClick={() => handleCategorySelect(category.id)}
          >
            <div className="text-4xl mb-4">{category.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-gray-600">
              Testez vos connaissances en {category.name.toLowerCase()}
            </p>
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 mx-auto block btn bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        onClick={() => navigate('/history')}
      >
        Voir l'historique
      </motion.button>
    </motion.div>
  )
}
