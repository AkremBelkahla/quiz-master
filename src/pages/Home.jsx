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
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Colonne de gauche (1/4) */}
          <div className="w-full md:w-1/4">
            <motion.div 
              className="sticky top-6"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/logo.png" 
                alt="QuizMaster Logo" 
                className="w-3/4 mx-auto md:mx-0 mb-6"
              />
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-4">Bienvenue sur QuizMaster</h2>
                <p className="text-gray-300 mb-4">Testez vos connaissances dans différents domaines avec nos quiz interactifs et amusants.</p>
                <p className="text-sm text-gray-400">Sélectionnez une catégorie pour commencer !</p>
              </div>
            </motion.div>
          </div>
          {/* Colonne de droite (1/2) */}
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        </div>
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
