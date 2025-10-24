import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import anime from 'animejs'
import gsap from 'gsap'

// Sophisticated counter component with smooth number animation
const StatCounter = ({ stat, index }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = useRef()
  const isInView = useInView(counterRef, { once: true, threshold: 0.3 })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      
      // Smooth counter animation using anime.js
      anime({
        targets: { value: 0 },
        value: stat.number,
        duration: stat.duration * 1000,
        delay: index * 200,
        easing: 'easeOutExpo',
        update: function(anim) {
          setCount(Math.round(anim.animatables[0].target.value))
        }
      })
    }
  }, [isInView, hasAnimated, stat.number, stat.duration, index])

  return (
    <motion.div
      ref={counterRef}
      className="relative group"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-accent-pink/5 to-accent-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <div className="relative text-center p-6 glass-dark rounded-xl hover:bg-white/5 transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
        {/* Animated number */}
        <div className="stat-number mb-3">
          <span className="text-4xl lg:text-5xl font-bold text-gradient font-mono tracking-tight">
            {count}
          </span>
          <span className="text-4xl lg:text-5xl font-bold text-gradient font-mono">
            {stat.suffix}
          </span>
        </div>
        
        {/* Label with subtle animation */}
        <div className="stat-label">
          <div className="text-gray-400 text-sm uppercase tracking-wider font-medium group-hover:text-gray-300 transition-colors duration-300">
            {stat.label}
          </div>
        </div>
        
        {/* Subtle accent line */}
        <motion.div
          className="w-0 h-0.5 bg-gradient-to-r from-accent via-accent-pink to-accent-purple mx-auto mt-3 rounded-full"
          animate={isInView ? { width: '60%' } : { width: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
        />
      </div>
    </motion.div>
  )
}

const About = () => {
  const sectionRef = useRef()
  const imageRef = useRef()
  const textRef = useRef()

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

    // Parallax effect for image
    gsap.fromTo(
      imageRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
      }
    )

    // Text reveal animation
    gsap.fromTo(
      '.about-text-line',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Stats animation - more sophisticated approach
    gsap.fromTo(
      '.stat-number',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      '.stat-label',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  const stats = [
    // Replaced numeric stats with highlights — content-driven
  ]

  const skills = [
    'React & Next.js',
    'Three.js & WebGL',
    'GSAP & Framer Motion',
    'TypeScript',
    'Node.js',
    'UI/UX Design',
    'Motion Graphics',
    '3D Modeling',
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen section-padding relative overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image and visual elements */}
          <div className="relative">
            <motion.div
              ref={imageRef}
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Avatar placeholder with glassmorphism */}
              <div className="w-80 h-80 mx-auto glass rounded-3xl p-8 relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-accent/20 via-accent-pink/20 to-accent-purple/20 rounded-2xl flex items-center justify-center">
                  <div className="text-6xl">👨‍💻</div>
                </div>
                
                {/* Floating elements around avatar */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-pink rounded-full"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-1/2 -left-6 w-4 h-4 bg-accent-purple rounded-full"
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-20 left-10 w-32 h-32 border border-accent/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute bottom-20 right-10 w-24 h-24 border border-accent-pink/30 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div ref={textRef} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">About Me</span>
              </h2>
            </motion.div>

            <div className="space-y-6 text-lg text-gray-300">
              <p className="about-text-line">
                Im Arush Sharma — a Flutter developer and UI enthusiast who loves blending functionality with visual storytelling. I specialize in building smooth, performant cross-platform applications and recently expanded into 3D web experiences using React Three Fiber, GSAP, and WebGL.
              </p>

              <p className="about-text-line">
                Ive worked with TR Technology Solution in Jammu, developing mobile and web apps that focus on performance, clean architecture, and real-world usability.
              </p>

              <p className="about-text-line">
                My goal is to create immersive digital products that feel alive — with fluid motion, elegant design, and meaningful interaction.
              </p>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-dark p-3 rounded-lg text-center hover:bg-white/10 transition-all duration-300"
                >
                  <span className="text-sm font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary btn-glow mt-8"
              >
                Let's Work Together
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Highlights / Quick info */}
        <div className="mt-12 pt-10 border-t border-white/10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-dark p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-accent">Highlights</h4>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Based in Jammu, India</li>
                <li>Flutter developer with focus on performance and clean architecture</li>
                <li>Experience building cross-platform apps and 3D web experiences</li>
                <li>Currently at TR Technology Solution — building mobile & web apps</li>
              </ul>
            </div>

            <div className="glass-dark p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-accent">Interests & Learning</h4>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Loves UI animation, shaders, and futuristic design</li>
                <li>Learning: Network Engineering & AI Integration</li>
                <li>Always coding with coffee & lo-fi beats ☕</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />
      </div>
    </section>
  )
}

export default About
