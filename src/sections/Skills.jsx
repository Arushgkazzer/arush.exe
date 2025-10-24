import React, { useEffect, useRef, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, OrbitControls } from '@react-three/drei'
import CursorRobot from '../components/CursorRobot'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import * as THREE from 'three'

// 3D Skill Icon Component
const SkillIcon = ({ position, color, text, rotationSpeed = 1 }) => {
  const meshRef = useRef()
  const textRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group position={position}>
        <mesh ref={meshRef}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.8}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
        <Text
          ref={textRef}
          position={[0, -1.2, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          {text}
        </Text>
      </group>
    </Float>
  )
}

// Orbiting Skills Component
const OrbitingSkills = () => {
  const groupRef = useRef()
  const skills = [
    { name: 'React', color: '#61DAFB', angle: 0 },
    { name: 'Three.js', color: '#000000', angle: Math.PI / 4 },
    { name: 'GSAP', color: '#88CE02', angle: Math.PI / 2 },
    { name: 'Node.js', color: '#339933', angle: (3 * Math.PI) / 4 },
    { name: 'TypeScript', color: '#3178C6', angle: Math.PI },
    { name: 'WebGL', color: '#990000', angle: (5 * Math.PI) / 4 },
    { name: 'Framer', color: '#0055FF', angle: (3 * Math.PI) / 2 },
    { name: 'Blender', color: '#F5792A', angle: (7 * Math.PI) / 4 },
  ]

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Center logo */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#00ffff"
            transparent
            opacity={0.3}
            emissive="#00ffff"
            emissiveIntensity={0.1}
            wireframe
          />
        </mesh>
      </Float>

      {/* Orbiting skills */}
      {skills.map((skill, index) => {
        const radius = 4
        const x = Math.cos(skill.angle) * radius
        const z = Math.sin(skill.angle) * radius
        const y = Math.sin(index * 0.5) * 0.5

        return (
          <SkillIcon
            key={skill.name}
            position={[x, y, z]}
            color={skill.color}
            text={skill.name}
            rotationSpeed={1 + index * 0.1}
          />
        )
      })}

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.8, 4.2, 64]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <ringGeometry args={[3.5, 3.7, 64]} />
        <meshBasicMaterial
          color="#ff0080"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Flippable Category Component - flips entire category box
const FlippableCategory = ({ category, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="skill-category glass-dark rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -5 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {!isHovered ? (
        /* Front side - Category title */
        <motion.div
          key="front"
          className="p-6 flex items-start space-x-4 min-h-[120px]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-3xl">{category.icon}</div>
          <div className="flex-1">
            <h3 className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-3`}>
              {category.title}
            </h3>
            <p className="text-gray-400 text-sm">
              Hover to explore technologies
            </p>
          </div>
        </motion.div>
      ) : (
        /* Back side - Technologies */
        <motion.div
          key="back"
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-start space-x-4">
            <div className="text-3xl flex-shrink-0">{category.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-4`}>
                {category.title} Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: skillIndex * 0.1 }}
                    className={`px-3 py-1 bg-gradient-to-r ${category.color} rounded-full text-sm font-medium text-white opacity-90 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap`}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Flippable Skill Component with working flip animation
const FlippableSkill = ({ skill, index, categoryColor }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section id="skills" className="relative min-h-screen py-20 overflow-hidden" style={{ cursor: 'none' }}>
      <motion.div
        className="relative inline-block cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <motion.div
          className="relative overflow-hidden rounded-full"
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front side - Main skill name */}
          <motion.div
            className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium transition-colors duration-300"
            animate={{ 
              opacity: isHovered ? 0 : 1,
              scale: isHovered ? 0.8 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white whitespace-nowrap">{skill.name}</span>
          </motion.div>

          {/* Back side - Deeper technologies */}
          <motion.div
            className={`absolute inset-0 px-2 py-1 bg-gradient-to-r ${categoryColor} rounded-full text-sm font-medium flex items-center justify-center`}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0 }}
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div className="flex items-center space-x-1 text-white">
              {skill.deeper.slice(0, 2).map((tech, i) => (
                <span key={tech} className="text-xs font-semibold whitespace-nowrap">
                  {tech}{i < 1 && skill.deeper.length > 1 ? ',' : ''}
                </span>
              ))}
              {skill.deeper.length > 2 && (
                <span className="text-xs opacity-80 ml-1">+{skill.deeper.length - 2}</span>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Tooltip for full deeper technologies list */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2, delay: 0.3 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
            >
              <div className="glass-dark px-3 py-2 rounded-lg shadow-xl border border-white/20 min-w-max max-w-xs">
                <div className="text-xs text-gray-300 mb-1 font-semibold">{skill.name} expertise:</div>
                <div className="flex flex-wrap gap-1">
                  {skill.deeper.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 bg-white/10 rounded text-accent font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {/* Arrow pointing up */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45 border-l border-t border-white/20"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

const Skills = () => {
  const sectionRef = useRef()
  const canvasRef = useRef()

  useEffect(() => {
    // GSAP scroll-triggered animations
    gsap.fromTo(
      sectionRef.current,
      { backgroundColor: '#1a1a1a' },
      {
        backgroundColor: '#0a0a0a',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      }
    )

    // Canvas fade in
    gsap.fromTo(
      canvasRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Skill categories animation
    gsap.fromTo(
      '.skill-category',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  const skillCategories = [
    {
      title: 'Frontend & Mobile',
      skills: [
        { name: 'Flutter', deeper: ['Dart', 'State Management', 'Animations', 'Platform Channels'] },
        { name: 'React', deeper: ['Hooks', 'Router', 'Suspense', 'Performance'] },
        { name: 'Tailwind CSS', deeper: ['JIT', 'Responsive', 'Custom Utilities'] },
        { name: 'Next.js', deeper: ['SSR', 'SSG', 'Routing'] },
      ],
      icon: '📱',
      color: 'from-accent to-accent-pink',
    },
    {
      title: '3D & Animation',
      skills: [
        { name: 'Three.js', deeper: ['React Three Fiber', 'Shaders', 'Postprocessing'] },
        { name: 'GSAP', deeper: ['Timelines', 'ScrollTrigger', 'Morphing'] },
        { name: 'Framer Motion', deeper: ['Variants', 'Gestures'] },
        { name: 'Anime.js', deeper: ['Easing', 'Stagger', 'SVG'] },
      ],
      icon: '🧩',
      color: 'from-accent-pink to-accent-purple',
    },
    {
      title: 'Backend & Database',
      skills: [
        { name: 'Node.js', deeper: ['Express', 'APIs', 'Realtime'] },
        { name: 'Firebase', deeper: ['Auth', 'Functions', 'Firestore'] },
        { name: 'MongoDB', deeper: ['CRUD', 'Indexes', 'Aggregation'] },
      ],
      icon: '⚙️',
      color: 'from-accent-purple to-accent',
    },
    {
      title: 'Dev Tools',
      skills: [
        { name: 'Git', deeper: ['Branching', 'CI/CD'] },
        { name: 'VS Code', deeper: ['Extensions', 'Workspaces'] },
        { name: 'Figma', deeper: ['Design Systems', 'Prototyping'] },
        { name: 'Vercel', deeper: ['Deployments', 'Edge Functions'] },
      ],
      icon: '🛠️',
      color: 'from-accent to-accent-pink',
    },
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen section-padding relative overflow-hidden"
    >
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">My Skills</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive toolkit for creating immersive digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - 3D Skills Visualization */}
          <div className="relative h-96 lg:h-[500px]">
            <div
              ref={canvasRef}
              className="w-full h-full rounded-2xl overflow-hidden glass-dark"
            >
              <Canvas
                className="absolute inset-0 -z-10"
                camera={{ position: [0, 0, 8], fov: 75 }}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.3} />
                  <pointLight position={[10, 10, 10]} color="#00ffff" intensity={0.5} />
                  <pointLight position={[-10, -10, -10]} color="#ff0080" intensity={0.5} />
                  <CursorRobot />
                  <OrbitingSkills />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                  />
                </Suspense>
              </Canvas>
            </div>

            {/* Interaction hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute bottom-4 left-4 text-accent text-sm font-mono"
            >
              Drag to interact
            </motion.div>
          </div>

          {/* Right side - Skill Categories */}
          <div className="skills-grid space-y-6">
            {skillCategories.map((category, index) => (
              <FlippableCategory
                key={category.title}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Ready to bring your ideas to life with cutting-edge technology?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary btn-glow"
          >
            View My Projects
          </motion.button>
        </motion.div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-pink/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default Skills
