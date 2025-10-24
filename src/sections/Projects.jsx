import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { Float, Text, Box } from '@react-three/drei'
import gsap from 'gsap'
import anime from 'animejs'

// 3D Project Preview Component
const Project3DPreview = ({ project }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={meshRef}>
        <Box args={[2, 1.2, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={project.color}
            transparent
            opacity={0.8}
            emissive={project.color}
            emissiveIntensity={0.2}
          />
        </Box>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {project.title}
        </Text>
      </group>
    </Float>
  )
}

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-4xl w-full glass rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left side - 3D Preview */}
              <div className="h-64 md:h-96 bg-gradient-to-br from-primary to-secondary">
                <Canvas
                  camera={{ position: [0, 0, 4], fov: 75 }}
                  gl={{ antialias: true, alpha: true }}
                >
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[5, 5, 5]} color={project.color} intensity={0.8} />
                    <pointLight position={[-5, -5, -5]} color="#ffffff" intensity={0.3} />
                    
                    <Project3DPreview project={project} />
                  </Suspense>
                </Canvas>
              </div>

              {/* Right side - Project details */}
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gradient mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3 text-accent">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex-1 text-center"
                  >
                    View Live
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/20 flex-1 text-center"
                  >
                    GitHub
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-xl hover:bg-white/20 transition-colors duration-300"
            >
              ×
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef()
  const gridRef = useRef()

  const projects = [
    {
      id: 1,
      title: 'SafeMyTrip Cabs',
      description: 'A complete cross-platform Flutter solution for ride-sharing with real-time tracking and driver-user communication.',
      technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Node.js'],
      color: '#00bfa5',
      liveUrl: '#',
      githubUrl: 'https://github.com/arushsharma',
      category: 'Mobile App',
    },
    {
      id: 2,
      title: '3D Portfolio Website',
      description: 'A cinematic, scroll-driven 3D personal website built using React Three Fiber, GSAP, and Anime.js.',
      technologies: ['React', 'Three.js', 'GSAP', 'Anime.js', 'Tailwind CSS'],
      color: '#00ffff',
      liveUrl: '#',
      githubUrl: 'https://github.com/arushsharma',
      category: 'Web Development',
    },
    {
      id: 3,
      title: 'Wireless & Mobile Computing Paper',
      description: 'Digitized and published solved question papers using Python and PDF generation for an academic project at IPS Academy.',
      technologies: ['Python', 'PDF Generation'],
      color: '#ffb300',
      liveUrl: '#',
      githubUrl: 'https://github.com/arushsharma',
      category: 'Academic',
    },
    {
      id: 4,
      title: 'Onl9Vet — Your Project Overview',
      description: `Onl9Vet is an online veterinary consultation platform connecting pet owners, farm owners, and exotic animal caretakers with certified veterinary experts via chat, video, and appointments. I developed the cross-platform Flutter frontend, integrated Firebase for realtime data and auth, added animated UI/UX, and implemented appointment & consultation flows.`,
      technologies: ['Flutter', 'Firebase', 'Node.js (API)', 'Animations'],
      color: '#0077ff',
      liveUrl: '#',
      githubUrl: '#',
      category: 'Mobile App',
    },
  ]

  useEffect(() => {
    // GSAP scroll-triggered animations
    gsap.fromTo(
      sectionRef.current,
      { backgroundColor: '#0a0a0a' },
      {
        backgroundColor: '#1a1a1a',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      }
    )

    // Project cards animation
    gsap.fromTo(
      '.project-card',
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Anime.js filter buttons animation
    anime({
      targets: '.filter-btn',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100, { start: 500 }),
      duration: 600,
      easing: 'easeOutExpo',
    })
  }, [])

  const categories = ['All', 'Web Development', 'Data Visualization', 'VR/AR', 'Motion Graphics', 'AI/ML', 'E-commerce']
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section
      id="projects"
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
            <span className="text-gradient">My Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A showcase of cutting-edge web experiences and interactive applications
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`filter-btn opacity-0 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-accent to-accent-pink text-white'
                  : 'glass-dark hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="project-card glass-dark rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Project preview */}
                <div className="h-48 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <Canvas
                      camera={{ position: [0, 0, 3], fov: 75 }}
                      gl={{ antialias: true, alpha: true }}
                    >
                      <Suspense fallback={null}>
                        <ambientLight intensity={0.3} />
                        <pointLight position={[2, 2, 2]} color={project.color} intensity={0.5} />
                        
                        <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
                          <Box args={[1.5, 0.9, 0.1]}>
                            <meshStandardMaterial
                              color={project.color}
                              transparent
                              opacity={0.6}
                              emissive={project.color}
                              emissiveIntensity={0.1}
                            />
                          </Box>
                        </Float>
                      </Suspense>
                    </Canvas>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 rounded text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Interested in working together on your next project?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary btn-glow"
          >
            Let's Collaborate
          </motion.button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent-pink/3 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default Projects
