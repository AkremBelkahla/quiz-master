import { createContext, useContext, useReducer } from 'react'

const QuizContext = createContext()

const initialState = {
  category: '',
  difficulty: '',
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  timeLeft: 30,
  isQuizStarted: false,
  isQuizFinished: false
}

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload }
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload }
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload, isQuizStarted: true }
    case 'NEXT_QUESTION':
      return { 
        ...state, 
        currentQuestionIndex: state.currentQuestionIndex + 1,
        timeLeft: 30
      }
    case 'UPDATE_SCORE':
      return { ...state, score: state.score + action.payload }
    case 'UPDATE_TIME':
      return { ...state, timeLeft: state.timeLeft - 1 }
    case 'FINISH_QUIZ':
      return { ...state, isQuizFinished: true }
    case 'RESET_QUIZ':
      return initialState
    default:
      return state
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
