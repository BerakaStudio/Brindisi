import React, { useState } from 'react'

export default function Footer() {
  const [showAbout, setShowAbout] = useState(false)

  return (
    <>
      <footer className="bg-white dark:bg-dark-800 border-t border-emerald-200 dark:border-dark-700 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Brindisi v1.0
            </p>

            <button
              onClick={() => setShowAbout(true)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors text-sm group"
              title="Acerca de Brindisi"
            >
              <img src="/icons/icon-brindisi.svg" alt="" className="w-5 h-5 transition-transform" />
              <span>Acerca de</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Pop-up "Acerca de" */}
      {showAbout && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" 
            onClick={() => setShowAbout(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md bg-white dark:bg-dark-800 rounded-lg border border-emerald-200 dark:border-dark-700 shadow-2xl z-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
                Acerca de Brindisi
              </h3>
              <button
                onClick={() => setShowAbout(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p className="text-justify text-sm leading-relaxed">
                Brindisi nació como una idea sencilla de tener a mano mis cócteles favoritos, con sus ingredientes y preparaciones, sin tener que recurrir a buscarlos cada vez y así, tener una pequeña herramienta digital que sea de ayuda para quien desee experimentar en la preparación de cócteles y otros tragos.
              </p>

              <div className="pt-4 border-t border-emerald-200 dark:border-dark-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Creado por <span className="text-emerald-600 dark:text-emerald-500 font-medium">José Lobos</span>, <a 
                    href="https://beraka.cl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-500 font-medium hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors underline decoration-emerald-500/30 dark:decoration-emerald-500/30 hover:decoration-emerald-600 dark:hover:decoration-emerald-400"
                  >
                    Beraka Studio
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}