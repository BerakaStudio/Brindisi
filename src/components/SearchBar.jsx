import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import recipesData from '../data/recipes.json'

export default function SearchBar({ value, onChange, wrapperClassName = "mb-8" }) {
  const navigate = useNavigate()
  const wrapperRef = useRef(null)
  
  // Estado interno para manejar la búsqueda independientemente de la Home
  const [internalQuery, setInternalQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // Sincronizar con props externas si existen
  useEffect(() => {
    if (value !== undefined) {
      setInternalQuery(value)
    }
  }, [value])

  // Manejar clics fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Lógica de filtrado
  const handleSearch = (text) => {
    setInternalQuery(text)
    
    if (onChange) {
      onChange(text)
    }

    if (text.trim().length > 0) {
      const query = text.toLowerCase().trim()
      const filtered = recipesData.filter(recipe => {
        const matchesName = recipe.name.toLowerCase().includes(query)
        const matchesIngredients = recipe.ingredients.some(ing => 
          ing.toLowerCase().includes(query)
        )
        return matchesName || matchesIngredients
      })
      setResults(filtered.slice(0, 6))
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }

  const handleResultClick = (slug) => {
    setIsOpen(false)
    setInternalQuery('')
    if (onChange) onChange('') 
    navigate(`/coctel/${slug}`)
  }

  const getImageUrl = (slug) => {
    try {
      return `/images/cocktails/${slug}.webp`
    } catch (e) {
      return '/images/placeholder-cocktail.webp'
    }
  }

  return (
    <div ref={wrapperRef} className={`relative ${wrapperClassName}`}>
      <div className="relative z-50">
        <input
          type="text"
          value={internalQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => internalQuery.trim().length > 0 && setIsOpen(true)}
          placeholder="Buscar cócteles, ingredientes..."
          className="w-full px-6 py-2 bg-white dark:bg-dark-800 border border-emerald-200 dark:border-dark-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors pr-12 shadow-sm"
        />
        
        {/* Icono Clean/Search */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          {internalQuery.length > 0 ? (
            <button 
              onClick={() => handleSearch('')}
              className="hover:text-emerald-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>

      {/* Omnibox: Resultados Flotantes */}
      {/* MODIFICACIÓN: Clases condicionales para responsividad móvil vs desktop */}
      {isOpen && results.length > 0 && (
        <div className="
          fixed top-[4.5rem] left-4 right-4 z-50 mt-0
          min-[500px]:absolute min-[500px]:top-full min-[500px]:left-0 min-[500px]:right-0 min-[500px]:mt-2 
          bg-white dark:bg-dark-800 border border-emerald-100 dark:border-dark-600 rounded-xl shadow-xl overflow-hidden max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="py-2">
            <h3 className="px-4 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50/50 dark:bg-dark-700/50">
              Resultados
            </h3>
            <ul>
              {results.map((recipe) => (
                <li key={recipe.id}>
                  <button
                    onClick={() => handleResultClick(recipe.slug)}
                    className="w-full px-4 py-3 flex items-center gap-4 hover:bg-emerald-50 dark:hover:bg-dark-700 transition-colors group text-left border-b border-gray-50 dark:border-dark-700 last:border-0"
                  >
                    {/* Miniatura */}
                    <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden content-center bg-gray-100 dark:bg-dark-600 border border-emerald-100 dark:border-dark-600 group-hover:border-emerald-300 dark:group-hover:border-emerald-500 transition-colors">
                      <img 
                        src={getImageUrl(recipe.slug)} 
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<svg class="w-6 h-6 text-emerald-300 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>'
                        }}
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                        {recipe.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {recipe.baseIngredient.charAt(0).toUpperCase() + recipe.baseIngredient.slice(1)} • {recipe.characteristics.slice(0, 2).join(', ')}
                      </p>
                    </div>
                    
                    {/* Flecha */}
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
