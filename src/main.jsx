import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { QuizProvider } from './context/QuizContext'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QuizProvider>
        <App />
        <Toaster position="top-center" />
      </QuizProvider>
    </BrowserRouter>
  </React.StrictMode>
)
