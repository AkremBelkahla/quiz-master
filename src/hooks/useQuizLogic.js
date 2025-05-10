import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import toast from 'react-hot-toast'

const CATEGORIES = {
  'sport': 21,
  'sciences': 17,
  'histoire': 23,
  'culture-generale': 9
}

const DIFFICULTY_MAPPING = {
  'facile': 'easy',
  'intermediaire': 'medium',
  'difficile': 'hard'
}

export function useQuizLogic() {
  const { state, dispatch } = useQuiz()
  const navigate = useNavigate()

  async function fetchQuestions() {
    try {
      const categoryId = CATEGORIES[state.category]
      const difficulty = DIFFICULTY_MAPPING[state.difficulty]
      
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`
      )
      const data = await response.json()
      
      if (data.response_code === 0) {
        dispatch({ type: 'SET_QUESTIONS', payload: data.results })
        navigate('/quiz')
      } else {
        toast.error('Erreur lors du chargement des questions')
      }
    } catch (error) {
      toast.error('Erreur de connexion')
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

  return {
    fetchQuestions,
    handleAnswer,
    saveToHistory
  }
}
