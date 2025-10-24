import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import gsap from 'gsap'

const Hero = () => {
  const heroRef = useRef()
  const titleRef = useRef()

  useEffect(() => {
    // GSAP scroll-triggered animations
    gsap.fromTo(
      heroRef.current,
      { opacity: 1 },
      {
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    // Anime.js text animation
    anime({
      targets: '.hero-title .char',
      opacity: [0, 1],
      translateY: [100, 0],
      rotateZ: [180, 0],
      duration: 1000,
      delay: anime.stagger(50, { start: 1000 }),
      easing: 'easeOutExpo',
    })

    anime({
      targets: '.hero-subtitle',
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1000,
      delay: 1500,
      easing: 'easeOutExpo',
    })

    anime({
      targets: '.hero-description',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: 2000,
      easing: 'easeOutExpo',
    })

    anime({
      targets: '.hero-cta',
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.8, 1],
      duration: 800,
      delay: 2500,
      easing: 'easeOutBack',
    })

    anime({
      targets: '.social-link',
      opacity: [0, 1],
      translateX: [-50, 0],
      duration: 600,
      delay: anime.stagger(100, { start: 3000 }),
      easing: 'easeOutExpo',
    })
  }, [])

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block opacity-0">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/arushsharma', icon: '🐙' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/arush-sharma-dev', icon: '💼' },
    { name: 'Instagram', href: 'https://instagram.com/arushsharma.dev', icon: '📸' },
  ]

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-transparent to-secondary/50 pointer-events-none" />

      <div className="container-custom section-padding text-center relative z-10">
        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          {/* Greeting removed - header shows name directly for a cleaner look */}

          {/* Main title */}
          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            Hi, I’m Arush Sharma <span className="inline-block">👋</span>
          </h1>

          {/* Subtitle */}
          <h2 className="hero-subtitle text-2xl md:text-3xl lg:text-4xl font-light mb-8 opacity-0">
            <span className="text-gradient">Flutter Developer</span> &amp; <span className="text-gradient">Creative Technologist</span>
          </h2>

          {/* Description */}
          <p className="hero-description text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 opacity-0">
            I build cross-platform apps and 3D animated web experiences that merge art, motion, and code. Currently crafting digital solutions at TR Technology Solution, Jammu.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 opacity-0">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary btn-glow text-lg px-8 py-4 group"
            >
              <span className="relative z-10">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent-pink/20 rounded-lg"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass-dark px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 text-lg"
            >
              Get In Touch
            </motion.button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                className="social-link opacity-0 w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:bg-white/20 transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="group-hover:animate-bounce">{social.icon}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-accent rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-accent rounded-full mt-2"
            />
          </motion.div>
          <p className="text-accent text-sm mt-2 font-mono">Scroll</p>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
