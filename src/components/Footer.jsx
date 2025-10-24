import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-12 py-8 text-center text-sm text-gray-400">
      <div className="container-custom">
        <div className="mb-2">© {new Date().getFullYear()} Arush Sharma</div>
        <div className="opacity-80">Rip & Code — Building the future, one frame at a time.</div>
      </div>
    </footer>
  )
}

export default Footer
