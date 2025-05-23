import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Difficulty from './pages/Difficulty'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import History from './pages/History'
import BubblesBackground from './components/BubblesBackground'
import CustomToaster from './components/Toaster'

function App() {
  return (
    <div className="min-h-screen">
      <BubblesBackground />
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        <AnimatePresence mode="wait">
          <CustomToaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/difficulty" element={<Difficulty />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
