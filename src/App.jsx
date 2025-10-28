import React, { Suspense, useEffect, lazy } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Leva, useControls } from 'leva'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Critical components (loaded immediately)
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'

// Lazy loaded components (loaded when needed)
const About = lazy(() => import('./sections/About'))
const Skills = lazy(() => import('./sections/Skills'))
const Projects = lazy(() => import('./sections/Projects'))
const Contact = lazy(() => import('./sections/Contact'))
const Scene3D = lazy(() => import('./components/Scene3D'))
const Experience = lazy(() => import('./sections/Experience'))
const Footer = lazy(() => import('./components/Footer'))

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
    // Initialize Lenis smooth scroll with performance optimizations
    const lenis = new Lenis({
      duration: 0.8,  // Faster scroll duration
      easing: (t) => 1 - Math.pow(1 - t, 3),  // Simpler easing function
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,  // Reduced for better control
      smoothTouch: false,
      touchMultiplier: 1.5,  // Reduced for mobile performance
      infinite: false,
      lerp: 0.1,  // Smoother interpolation
    })

    // Optimized animation frame with throttling
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Optimized scroll tracking with debouncing
    let scrollTimeout
    const onLenisScroll = () => {
      setIsUserScrolling(true)
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => setIsUserScrolling(false), 100)  // Faster response
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
              gl={{ 
                antialias: false, 
                alpha: true, 
                powerPreference: 'high-performance',
                stencil: false,
                depth: false
              }}
              dpr={isUserScrolling ? 0.5 : [0.5, 1.5]}
              performance={{ min: 0.5 }}
              frameloop={isUserScrolling ? 'demand' : 'always'}
            >
              <Suspense fallback={null}>
                <Scene3D forceLowQuality={forceLowQuality || isUserScrolling} isScrolling={isUserScrolling} />
              </Suspense>
            </Canvas>
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            <Navigation />
            <main>
              <Hero />
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full"></div></div>}>
                <About />
              </Suspense>
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full"></div></div>}>
                <Experience />
              </Suspense>
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full"></div></div>}>
                <Skills />
              </Suspense>
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full"></div></div>}>
                <Projects />
              </Suspense>
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full"></div></div>}>
                <Contact />
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </div>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
