import React from 'react'

const Experience = () => {
  return (
    <section id="experience" className="min-h-screen section-padding relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Work history and selected highlights
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="glass-dark p-6 rounded-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold">TR Technology Solution — Flutter Developer</h3>
                <div className="text-sm text-gray-400">Jammu, India — Present</div>
              </div>
            </div>

            <div className="mt-4 text-gray-300">
              <ul className="list-disc list-inside space-y-2">
                <li>Built and deployed scalable Flutter apps with Firebase backends for multiple clients.</li>
                <li>Optimized app performance, improving load time and UI responsiveness by 30%.</li>
                <li>Integrated APIs, animations, and dynamic UI components for seamless UX.</li>
                <li>Collaborated with cross-functional teams for end-to-end feature delivery.</li>
              </ul>
            </div>
          </div>

          {/* Add more entries here if desired */}
        </div>
      </div>
    </section>
  )
}

export default Experience
