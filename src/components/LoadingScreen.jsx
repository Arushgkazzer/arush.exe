import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import anime from 'animejs'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Animate loading text
    anime({
      targets: '.loading-text span',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo'
    })

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90" />
          
          {/* Animated background particles */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Loading content */}
          <div className="relative z-10 text-center">
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOutBack' }}
              className="mb-8"
            >
              <div className="w-20 h-20 mx-auto border-2 border-accent rounded-full flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-accent-pink rounded-full animate-spin-slow" />
              </div>
            </motion.div>

            {/* Loading text */}
            <div className="loading-text mb-8">
              {['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((letter, i) => (
                <span
                  key={i}
                  className="inline-block text-2xl font-mono font-bold text-white mx-1 opacity-0"
                >
                  {letter}
                </span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mx-auto mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-accent via-accent-pink to-accent-purple"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Progress percentage */}
            <motion.div
              className="text-accent font-mono text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {Math.round(progress)}%
            </motion.div>

            {/* Loading dots animation */}
            <div className="loading-dots mx-auto mt-8">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
