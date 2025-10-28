import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-primary text-white">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold mb-4 text-accent">Oops! Something went wrong</h1>
            <p className="text-gray-300 mb-6">
              There was an error loading the portfolio. Please refresh the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary px-6 py-3 rounded-lg"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-accent">Error Details</summary>
                <pre className="mt-2 p-4 bg-black/50 rounded text-sm overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
