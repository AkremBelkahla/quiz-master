import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useQuiz } from '../context/QuizContext'
import { useQuizLogic } from '../hooks/useQuizLogic'

export default function Quiz() {
  const { state, dispatch } = useQuiz()
  const { handleAnswer } = useQuizLogic()
  const [shuffledAnswers, setShuffledAnswers] = useState([])
  const currentQuestion = state.questions[state.currentQuestionIndex]

  useEffect(() => {
    const timer = setInterval(() => {
      if (state.timeLeft > 0) {
        dispatch({ type: 'UPDATE_TIME' })
      } else {
        handleAnswer(false)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [state.timeLeft])

  useEffect(() => {
    if (currentQuestion) {
      const answers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer
      ]
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5))
    }
  }, [currentQuestion])

  if (!currentQuestion) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="text-lg font-semibold">
          Question {state.currentQuestionIndex + 1}/10
        </div>
        <div className="text-lg font-semibold">
          Score: {state.score}/10
        </div>
        <div className={state.timeLeft <= 10 ? 'text-lg font-semibold text-red-600' : 'text-lg font-semibold'}>
          Temps: {state.timeLeft}s
        </div>
      </div>

      <div className="card mb-8">
        <div 
          className="h-2 bg-gray-200 rounded-full mb-4"
          style={{ width: '100%' }}
        >
          <motion.div
            className="h-2 bg-primary rounded-full"
            initial={{ width: '100%' }}
            animate={{ width: `${(state.timeLeft / 30) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <h2 
          className="text-xl font-semibold mb-6"
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shuffledAnswers.map((answer, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary"
              onClick={() => handleAnswer(answer === currentQuestion.correct_answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
