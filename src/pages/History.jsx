import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChartBarIcon, TrashIcon } from '@heroicons/react/24/solid'

export default function History() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    favoriteCategory: ''
  })

  useEffect(() => {
    const loadHistory = () => {
      const savedHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]')
      setHistory(savedHistory.sort((a, b) => new Date(b.date) - new Date(a.date)))
      
      if (savedHistory.length > 0) {
        const totalScore = savedHistory.reduce((sum, quiz) => sum + quiz.score, 0)
        const bestScore = Math.max(...savedHistory.map(quiz => quiz.score))
        
        // Trouver la catégorie la plus jouée
        const categoryCount = savedHistory.reduce((acc, quiz) => {
          acc[quiz.category] = (acc[quiz.category] || 0) + 1
          return acc
        }, {})
        const favoriteCategory = Object.entries(categoryCount)
          .sort((a, b) => b[1] - a[1])[0][0]

        setStats({
          totalQuizzes: savedHistory.length,
          averageScore: (totalScore / savedHistory.length).toFixed(1),
          bestScore,
          favoriteCategory
        })
      }
    }

    loadHistory()
  }, [])

  const clearHistory = () => {
    if (window.confirm('Êtes-vous sûr de vouloir effacer tout l\'historique ?')) {
      localStorage.removeItem('quizHistory')
      setHistory([])
      setStats({
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        favoriteCategory: ''
      })
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary"
        >
          ← Retour
        </button>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="btn btn-primary flex items-center gap-2"
          >
            <TrashIcon className="w-5 h-5" />
            Effacer l'historique
          </button>
        )}
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">
        Historique des Quiz
      </h1>

      {history.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <ChartBarIcon className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
              <div className="space-y-2">
                <p>Nombre de quiz : {stats.totalQuizzes}</p>
                <p>Score moyen : {stats.averageScore}/10</p>
                <p>Meilleur score : {stats.bestScore}/10</p>
                <p>Catégorie favorite : {stats.favoriteCategory}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {history.map((quiz, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-500">
                    {formatDate(quiz.date)}
                  </p>
                  <p className="font-semibold">
                    {quiz.category} - {quiz.difficulty}
                  </p>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {quiz.score}/10
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">
          Aucun quiz n'a encore été joué.
        </div>
      )}
    </motion.div>
  )
}
