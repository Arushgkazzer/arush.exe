import React, { useEffect, useState } from 'react'

const PerformanceMonitor = ({ show = false }) => {
  const [fps, setFps] = useState(60)
  const [memory, setMemory] = useState(0)

  useEffect(() => {
    if (!show) return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId

    const measurePerformance = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime

        // Memory usage (if available)
        if (performance.memory) {
          setMemory(Math.round(performance.memory.usedJSHeapSize / 1048576))
        }
      }

      animationId = requestAnimationFrame(measurePerformance)
    }

    measurePerformance()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [show])

  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-sm font-mono">
      <div>FPS: {fps}</div>
      {memory > 0 && <div>Memory: {memory}MB</div>}
    </div>
  )
}

export default PerformanceMonitor
