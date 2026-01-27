import React, { useState } from 'react'

const slides = [
  {
    title: "Bienvenido a Brindisi",
    description: "Tu guía completa para preparar los mejores cócteles",
    emoji: "🍹"
  },
  {
    title: "Muchas Recetas Completas",
    description: "Desde clásicos hasta creaciones modernas",
    emoji: "📖"
  },
  {
    title: "Filtros Inteligentes",
    description: "Encuentra el coctel perfecto por ingrediente o estilo",
    emoji: "🔍"
  },
  {
    title: "¡Comencemos!",
    description: "Descubre tu próximo coctel favorito",
    emoji: "🎉"
  }
]

export default function Carousel({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="fixed inset-0 z-50 bg-white/95 dark:bg-dark-900/95 backdrop-blur-sm flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 text-center border border-emerald-200 dark:border-transparent shadow-2xl">
          <div className="text-7xl mb-6">{slides[currentSlide].emoji}</div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{slides[currentSlide].title}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">{slides[currentSlide].description}</p>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${ index === currentSlide 
                    ? 'w-8 bg-emerald-500 dark:bg-emerald-500' 
                    : 'w-2 bg-emerald-300 dark:bg-emerald-600'
                }`}
              />
            ))}
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              onClick={handleSkip}
              className="flex-1 py-3 px-6 rounded-lg bg-emerald-100 dark:bg-dark-700 hover:bg-emerald-200 dark:hover:bg-dark-600 transition-colors text-emerald-900 dark:text-white border border-emerald-300 dark:border-transparent font-medium"
            >
              Saltar
            </button>
            <button
              onClick={handleNext}
              className="flex-1 bg-emerald-500 dark:bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              {currentSlide < slides.length - 1 ? 'Siguiente' : 'Comenzar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}