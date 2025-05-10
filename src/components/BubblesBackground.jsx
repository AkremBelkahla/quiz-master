import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function BubblesBackground() {
  const createBubble = () => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: 100, // Start from bottom
    size: Math.random() * 40 + 10, // Smaller bubbles
    opacity: Math.random() * 0.3 + 0.1, // Varying opacity
    duration: Math.random() * 8 + 4, // Faster animation
  })

  const [bubbles, setBubbles] = useState(
    Array.from({ length: 20 }, createBubble)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev => {
        // Remove bubbles that have completed their animation
        const filtered = prev.filter(bubble => 
          document.querySelector(`[data-bubble-id="${bubble.id}"]`)?.getBoundingClientRect().top > -100
        )
        // Add new bubbles
        return [...filtered, createBubble()]
      })
    }, 2000) // Add new bubble every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#FF8C42] to-[#FFB347]">
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          data-bubble-id={bubble.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${bubble.x}%`,
            bottom: '-5%',
            width: bubble.size,
            height: bubble.size,
            opacity: bubble.opacity
          }}
          initial={{ y: 0 }}
          animate={{ 
            y: '-105vh',
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: bubble.duration,
            repeat: 0,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}
