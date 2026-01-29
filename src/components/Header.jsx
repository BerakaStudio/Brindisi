import React from 'react'
import { useNavigate } from 'react-router-dom'
import useTheme from '../hooks/useTheme'
import SearchBar from './SearchBar'

// Importamos versiones del logo completo
import logoDark from '/icons/logo-dark.svg'
import logoLight from '/icons/logo-light.svg'
// Importamos el isotipo para móvil
import iconBrindisi from '/icons/icon-brindisi.svg'

export default function Header({ onFavoritesClick, favoritesCount = 0, searchValue, onSearch }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  // Lógica de selección de logo completo (Desktop/Tablet):
  // Se mantiene intacta para resoluciones > 500px
  const currentLogo = theme === 'dark' ? logoLight : logoDark

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-dark-800/95 backdrop-blur-md border-b border-emerald-200 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Container */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group shrink-0"
          >
            {/* 1. Versión MÓVIL (< 500px): Solo Icono */}
            <img 
              src={iconBrindisi} 
              alt="Brindisi" 
              className="h-10 w-auto block min-[550px]:hidden" 
            />

            {/* 2. Versión TABLET/DESKTOP (> 500px): Logo Completo + Texto */}
            {/* Se oculta en móvil y se muestra en >500px */}
            <div className="hidden min-[550px]:flex items-center gap-3">
              <img src={currentLogo} alt="Brindisi" className="h-10 w-auto" />
              <h1 className="hidden md:block text-2xl font-bold bg-gradient-to-r from-emerald-600 to-turquoise-500 dark:from-emerald-500 dark:to-emerald-400 bg-clip-text text-transparent">
                <span className="hidden">Brindisi</span>
              </h1>
            </div>
          </button>

          {/* Barra de Búsqueda Integrada */}
          <div className="flex-1 max-w-md mx-2 md:mx-6">
             <SearchBar 
               value={searchValue} 
               onChange={onSearch} 
               wrapperClassName=""
             />
          </div>

          {/* Controles derecha */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Toggle Tema */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-lg bg-emerald-100 dark:bg-dark-700 hover:bg-emerald-200 dark:hover:bg-dark-600 transition-all duration-200 group"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {theme === 'dark' ? (
                <svg 
                  className="w-5 h-5 text-yellow-500 dark:text-emerald-400 transition-transform group-hover:rotate-45 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                  />
                </svg>
              ) : (
                <svg 
                  className="w-5 h-5 text-emerald-700 transition-transform group-hover:rotate-12 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                  />
                </svg>
              )}
            </button>

            {/* Botón Favoritos */}
            <button
              onClick={onFavoritesClick}
              className="relative p-2 sm:p-2.5 rounded-lg bg-emerald-100 dark:bg-dark-700 hover:bg-emerald-200 dark:hover:bg-dark-600 transition-all duration-200 group"
              aria-label="Ver favoritos"
              title="Mis favoritos"
            >
              <svg 
                className="w-5 h-5 text-red-500 dark:text-emerald-400 transition-transform group-hover:scale-110" 
                fill={favoritesCount > 0 ? 'currentColor' : 'none'}
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-xs font-bold text-white bg-red-500 dark:bg-emerald-500 rounded-full">
                  {favoritesCount > 99 ? '99+' : favoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
