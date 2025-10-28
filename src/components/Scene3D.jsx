import React, { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Stars, 
  Float, 
  MeshDistortMaterial,
  Environment
} from '@react-three/drei'
import { 
  EffectComposer, 
  Bloom, 
  ChromaticAberration,
  Vignette 
} from '@react-three/postprocessing'
import * as THREE from 'three'

// Animated wireframe sphere (slower, aesthetic)
const WireframeSphere = ({ segments = 32, slow = false }) => {
  const meshRef = useRef()

  // Use delta-based rotation for consistent, controllable speed
  useFrame((state, delta) => {
    if (!meshRef.current) return
    const speedX = slow ? 0.02 : 0.06
    const speedY = slow ? 0.03 : 0.08
    meshRef.current.rotation.x += delta * speedX
    meshRef.current.rotation.y += delta * speedY
  })

  return (
    <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, segments, segments]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  )
}

// Particle system
const ParticleField = ({ particleCount = 1000, slow = false }) => {
  const points = useRef()

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }

    return positions
  }, [particleCount])

  const accRef = useRef(0)
  useFrame((state, delta) => {
    if (!points.current) return
    
    accRef.current += delta
    const step = slow ? 1 / 15 : 1 / 30  // Reduced frame rate for particles
    if (accRef.current >= step) {
      const speed = slow ? 0.005 : 0.02
      points.current.rotation.x += speed
      points.current.rotation.y += speed * 1.5
      accRef.current = 0
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff0080"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Floating geometric shapes
const FloatingShapes = ({ lowQuality = false }) => {
  // use simpler materials on low-end devices
  return (
    <>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-4, 2, -2]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          {lowQuality ? (
            <meshStandardMaterial color="#8000ff" />
          ) : (
            <MeshDistortMaterial
              color="#8000ff"
              transparent
              opacity={0.7}
              distort={0.3}
              speed={2}
            />
          )}
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[4, -2, -1]}>
          <octahedronGeometry args={[0.7]} />
          {lowQuality ? (
            <meshStandardMaterial color="#00ffff" />
          ) : (
            <MeshDistortMaterial
              color="#00ffff"
              transparent
              opacity={0.6}
              distort={0.4}
              speed={3}
            />
          )}
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={3} floatIntensity={1.5}>
        <mesh position={[2, 3, -3]}>
          <tetrahedronGeometry args={[0.6]} />
          {lowQuality ? (
            <meshStandardMaterial color="#ff0080" />
          ) : (
            <MeshDistortMaterial
              color="#ff0080"
              transparent
              opacity={0.5}
              distort={0.2}
              speed={1.5}
            />
          )}
        </mesh>
      </Float>
    </>
  )
}

// Mouse-following light
const MouseLight = ({ slow = false }) => {
  const lightRef = useRef()
  const { mouse, viewport } = useThree()

  useFrame(() => {
    if (lightRef.current) {
      // lerp toward mouse to reduce sudden updates
      const targetX = (mouse.x * viewport.width) / 2
      const targetY = (mouse.y * viewport.height) / 2
      const lerpFactor = slow ? 0.05 : 0.12
      lightRef.current.position.x += (targetX - lightRef.current.position.x) * lerpFactor
      lightRef.current.position.y += (targetY - lightRef.current.position.y) * lerpFactor
    }
  })

  return (
    <pointLight
      ref={lightRef}
      color="#00ffff"
      intensity={0.9}
      distance={10}
      decay={2}
    />
  )
}

const Scene3D = ({ forceLowQuality = false, isScrolling = false }) => {
  // lightweight heuristic for lower-end devices
  const [isLowPerf, setIsLowPerf] = useState(false)

  const checkPerf = () => {
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    const memory = typeof navigator !== 'undefined' && navigator.deviceMemory ? navigator.deviceMemory : 4
    setIsLowPerf(window.innerWidth < 900 || cores <= 4 || dpr > 1.5 || memory < 4)
  }

  useEffect(() => {
    checkPerf()
    const resizeHandler = () => {
      clearTimeout(window.resizeTimeout)
      window.resizeTimeout = setTimeout(checkPerf, 100)
    }
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
      clearTimeout(window.resizeTimeout)
    }
  }, [])

  // allow dev override from Leva control
  useEffect(() => {
    if (forceLowQuality) setIsLowPerf(true)
    else checkPerf()
  }, [forceLowQuality])

  // More aggressive performance scaling
  const particleCount = isScrolling ? 100 : isLowPerf ? 300 : 800
  const starsCount = isScrolling ? 200 : isLowPerf ? 500 : 2000
  const sphereSegments = isScrolling ? 8 : isLowPerf ? 12 : 24
  const enableEffects = !isLowPerf && !isScrolling

  // If parent signals scrolling, temporarily reduce activity
  // Parent can pass `isScrolling` prop (App) or `forceLowQuality` to force low perf

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <MouseLight slow={isLowPerf} />
      <pointLight position={[10, 10, 10]} color="#ff0080" intensity={0.5} />
      <pointLight position={[-10, -10, -10]} color="#8000ff" intensity={0.5} />

      {/* Environment */}
      {!isLowPerf && !isScrolling && !forceLowQuality && <Environment preset="night" />}
      <Stars
        radius={100}
        depth={50}
        count={Math.max(200, Math.floor(starsCount * (isScrolling ? 0.25 : 1)))}
        factor={4}
        saturation={0}
        fade
        speed={isScrolling ? 0.2 : isLowPerf ? 0.3 : 1}
      />

      {/* 3D Objects */}
  <WireframeSphere segments={sphereSegments} slow={isLowPerf || isScrolling || forceLowQuality} />
  <ParticleField particleCount={Math.floor(particleCount * (isScrolling ? 0.25 : 1))} slow={isLowPerf || isScrolling || forceLowQuality} />
  <FloatingShapes lowQuality={isLowPerf || isScrolling || forceLowQuality} />

      {/* Controls (disabled for fixed background) */}
      <OrbitControls
        enabled={false}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />

      {/* Post-processing effects - disabled on low-end devices */}
  {enableEffects && !isScrolling && !forceLowQuality && (
        <EffectComposer>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.95}
            luminanceSmoothing={0.03}
          />
          <ChromaticAberration offset={[0.001, 0.001]} />
          <Vignette eskil={false} offset={0.1} darkness={0.45} />
        </EffectComposer>
      )}
    </>
  )
}

export default Scene3D
