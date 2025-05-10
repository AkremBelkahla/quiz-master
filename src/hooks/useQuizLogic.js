import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { translateQuestion } from '../services/translator'
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
      
      const categoryMapping = {
        'sport': 21,
        'sciences': 17,
        'histoire': 23,
        'animaux': 27,
        'jeux-video': 15,
        'geographie': 22,
        'politique': 24,
        'vehicules': 28,
        'divertissement': 11
      }

      const apiCategoryId = categoryMapping[state.category] || 9 // 9 est l'ID pour Culture Générale
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${apiCategoryId}&difficulty=${difficulty}&type=multiple`)
      const data = await response.json()
      
      if (data.response_code === 0) {
        const translatedQuestions = await Promise.all(data.results.map(async (question) => {
          const translatedQuestion = await translateQuestion(question.question);
          return { ...question, question: translatedQuestion };
        }));
        dispatch({ type: 'SET_QUESTIONS', payload: translatedQuestions })
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
