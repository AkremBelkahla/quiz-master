import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { translateQuestion } from '../services/translator'
import toast from 'react-hot-toast'

const CATEGORY_IDS = {
  sport: 21,
  sciences: 17,
  histoire: 23,
  animaux: 27,
  'jeux-video': 15,
  geographie: 22,
  politique: 24,
  vehicules: 28,
  divertissement: 11
}

// Les difficultés sont déjà au bon format dans le composant Difficulty

export function useQuizLogic() {
  const { state, dispatch } = useQuiz()
  const navigate = useNavigate()

  async function fetchQuestions() {
    try {
      const categoryId = CATEGORY_IDS[state.category]
      if (!categoryId) {
        console.error('Catégorie invalide:', state.category)
        throw new Error('Catégorie non valide')
      }

      const difficulty = state.difficulty
      if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        console.error('Difficulté invalide:', difficulty)
        throw new Error('Difficulté non valide')
      }

      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`
      )

      if (!response.ok) {
        throw new Error('Erreur réseau')
      }

      const data = await response.json()
      
      if (data.response_code === 0) {
        if (!data.results || data.results.length === 0) {
          throw new Error('Aucune question disponible')
        }

        // Traduire toutes les questions et réponses
        const translatedQuestions = await Promise.all(
          data.results.map(question => translateQuestion(question))
        )

        dispatch({ type: 'SET_QUESTIONS', payload: translatedQuestions })
        navigate('/quiz')
      } else {
        throw new Error('Erreur API: ' + data.response_code)
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
      toast.error('Erreur lors du chargement des questions. Veuillez réessayer.')
      throw error // Pour que l'erreur soit capturée par le composant
    }
  }

  function handleAnswer(isCorrect) {
    if (isCorrect) {
      dispatch({ type: 'UPDATE_SCORE', payload: 1 })
      toast.success('Bonne réponse !')
    } else {
      toast.error('Mauvaise réponse !')
    }

    if (state.currentQuestionIndex === 9) {
      dispatch({ type: 'FINISH_QUIZ' })
      saveToHistory()
      navigate('/results')
    } else {
      dispatch({ type: 'NEXT_QUESTION' })
    }
  }

  function saveToHistory() {
    const quizResult = {
      date: new Date().toISOString(),
      category: state.category,
      difficulty: state.difficulty,
      score: state.score,
    }

    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]')
    history.push(quizResult)
    localStorage.setItem('quizHistory', JSON.stringify(history))
  }

  function nextQuestion() {
    if (state.currentQuestionIndex < 9) {
      dispatch({ type: 'NEXT_QUESTION' })
    }
  }

  function resetQuiz() {
    dispatch({ type: 'RESET_QUIZ' })
  }

  return {
    handleAnswer,
    fetchQuestions,
    nextQuestion,
    resetQuiz
  }
}
