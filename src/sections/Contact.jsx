import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import gsap from 'gsap'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const sectionRef = useRef()
  const formRef = useRef()
  const svgRef = useRef()

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

    // Form animation
    gsap.fromTo(
      '.form-field',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Contact info animation
    gsap.fromTo(
      '.contact-info-item',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Animate SVG path drawing
    const path = svgRef.current?.querySelector('path')
    if (path) {
      const pathLength = path.getTotalLength()
      path.style.strokeDasharray = pathLength
      path.style.strokeDashoffset = pathLength

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission (no actual email sending)
    setTimeout(() => {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      // Success animation
      anime({
        targets: '.success-message',
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 600,
        easing: 'easeOutBack'
      })

      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'arush.sharma.dev@gmail.com',
      href: 'mailto:arush.sharma.dev@gmail.com',
    },
    {
      icon: '',
      label: 'Location',
      value: 'Jammu, India',
      href: '#',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/arush-sharma-dev',
      href: 'https://linkedin.com/in/arush-sharma-dev',
    },
  ]

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/arushsharma', icon: '🐙', color: 'hover:text-accent' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/arush-sharma-dev', icon: '💼', color: 'hover:text-accent-pink' },
    { name: 'Instagram', href: 'https://instagram.com/arushsharma.dev', icon: '📸', color: 'hover:text-accent-purple' },
  ]

  return (
    <section
      id="contact"
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
            <span className="text-gradient">Get In Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Contact form */}
          <div className="relative">
            {/* Animated SVG border */}
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 600"
              fill="none"
            >
              <path
                d="M20 20 L380 20 L380 580 L20 580 Z"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ffff" />
                  <stop offset="50%" stopColor="#ff0080" />
                  <stop offset="100%" stopColor="#8000ff" />
                </linearGradient>
              </defs>
            </svg>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-dark p-8 rounded-2xl relative z-10 space-y-6"
            >
              {/* Name field */}
              <motion.div
                className="form-field"
                whileFocus={{ scale: 1.02 }}
              >
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-accent">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                  placeholder="Your full name"
                />
              </motion.div>

              {/* Email field */}
              <motion.div
                className="form-field"
                whileFocus={{ scale: 1.02 }}
              >
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-accent">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              {/* Subject field */}
              <motion.div
                className="form-field"
                whileFocus={{ scale: 1.02 }}
              >
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-accent">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                  placeholder="Project inquiry, collaboration, etc."
                />
              </motion.div>

              {/* Message field */}
              <motion.div
                className="form-field"
                whileFocus={{ scale: 1.02 }}
              >
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-accent">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </motion.div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="form-field w-full btn-primary btn-glow relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                {isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent-pink/20"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.button>

              {/* Status messages */}
              {submitStatus && (
                <motion.div
                  className={`success-message text-center p-4 rounded-lg ${
                    submitStatus === 'success'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {submitStatus === 'success'
                    ? '✅ Form submitted successfully! Please contact me directly via email.'
                    : '❌ Something went wrong. Please try again.'}
                </motion.div>
              )}
            </form>
          </div>

          {/* Right side - Contact info */}
          <div className="space-y-8">
            <div className="contact-info space-y-6">
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gradient mb-8"
              >
                Let's Connect
              </motion.h3>

              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="contact-info-item flex items-center space-x-4 p-4 glass-dark rounded-lg hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <div className="text-2xl group-hover:animate-bounce">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      {info.label}
                    </div>
                    <div className="text-white group-hover:text-accent transition-colors duration-300">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-8 border-t border-white/10">
              <motion.h4
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl font-semibold mb-6"
              >
                Follow Me
              </motion.h4>
              
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={`w-12 h-12 glass rounded-full flex items-center justify-center text-xl transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="hover:animate-pulse">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability status */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-dark p-6 rounded-xl"
            >
              <div className="flex items-center space-x-3 mb-3">
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-400 font-medium">Available for new projects</span>
              </div>
              <p className="text-gray-300 text-sm">
                I'm currently accepting new freelance projects and collaborations. 
                Let's discuss how we can work together!
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-pink/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default Contact
