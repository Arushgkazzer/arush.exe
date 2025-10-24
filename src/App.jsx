import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Leva, useControls } from 'leva'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Scene3D from './components/Scene3D'
import Experience from './sections/Experience'
import Footer from './components/Footer'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  // Dev-only controls (Leva). Panel hidden in production but controls still register.
  const { forceLowQuality } = useControls({
    Renderer: { forceLowQuality: { value: false, label: 'Force Low Quality' } },
  })
  const [isUserScrolling, setIsUserScrolling] = React.useState(false)
  const scrollTimeoutRef = React.useRef()
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Lenis animation frame (single RAF driver)
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Connect Lenis with GSAP ScrollTrigger
    // Call ScrollTrigger.update on Lenis scroll — do NOT call lenis.raf from gsap.ticker to avoid double-calls.
    lenis.on('scroll', ScrollTrigger.update)

    // Track active scrolling to reduce renderer load while scrolling
    const onLenisScroll = () => {
      setIsUserScrolling(true)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => setIsUserScrolling(false), 150)
    }

    lenis.on('scroll', onLenisScroll)

    // Cleanup
    return () => {
      lenis.off('scroll', onLenisScroll)
      lenis.destroy()
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingScreen />}>
          {/* Hide Leva controls in production */}
          <Leva hidden={process.env.NODE_ENV === 'production'} />
          
          {/* Fixed 3D Canvas Background */}
          <div className="fixed inset-0 z-0">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
              dpr={isUserScrolling ? 1 : [1, 1.5]}
            >
              <Scene3D forceLowQuality={forceLowQuality || isUserScrolling} isScrolling={isUserScrolling} />
            </Canvas>
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            <Navigation />
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </div>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
