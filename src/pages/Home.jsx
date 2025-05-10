import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuiz } from '../context/QuizContext'

const categories = [
  { id: 'sport', name: 'Sport', icon: '🏃‍♂️' },
  { id: 'sciences', name: 'Sciences', icon: '🔬' },
  { id: 'histoire', name: 'Histoire', icon: '📚' },
  { id: 'culture-generale', name: 'Culture Générale', icon: '🌍' }
]

export default function Home() {
  const navigate = useNavigate()
  const { dispatch } = useQuiz()

  const handleCategorySelect = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category })
    navigate('/difficulty')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-center mb-8">QuizMaster</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="card hover:shadow-xl transition-shadow"
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
        className="mt-8 mx-auto block btn btn-secondary"
        onClick={() => navigate('/history')}
      >
        Voir l'historique
      </motion.button>
    </motion.div>
  )
}
