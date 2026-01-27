import React, { useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ShareButton from './ShareButton'
import BackgroundDecoration from './BackgroundDecoration'
import useFavorites from '../hooks/useFavorites'
import recipesData from '../data/recipes.json'
import ingredientsData from '../data/ingredients.json'
import characteristicsData from '../data/characteristics.json'

const getCocktailImage = (slug) => {
  return `/images/cocktails/${slug}.jpg`
}

const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Función auxiliar para escalar ingredientes
const scaleIngredient = (ingredientStr, baseServings, currentServings) => {
  // Regex para capturar el número al inicio (acepta decimales con . o ,)
  const regex = /^(\d+(?:[.,]\d+)?)(.*)$/
  const match = ingredientStr.match(regex)

  if (!match) return ingredientStr

  // Normalizar número (cambiar coma por punto para cálculo)
  const originalAmount = parseFloat(match[1].replace(',', '.'))
  
  if (isNaN(originalAmount)) return ingredientStr

  // Calcular nueva cantidad
  const newAmount = (originalAmount / baseServings) * currentServings

  // Formatear: si es entero, mostrar sin decimales; si no, máx 1 decimal
  const formattedAmount = Number.isInteger(newAmount) 
    ? newAmount.toString() 
    : parseFloat(newAmount.toFixed(1)).toString()

  // Reconstruir string manteniendo el resto del texto
  return `${formattedAmount}${match[2]}`
}

export default function CocktailDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite, favorites } = useFavorites()
  const shareButtonRef = useRef(null)

  const recipe = recipesData.find(r => r.slug === slug)
  
  // Estado para las porciones
  const [servings, setServings] = useState(1)

  // Actualizar porciones cuando carga la receta
  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings)
    }
  }, [recipe])

  const handleIncrement = () => {
    if (servings < 50) setServings(prev => prev + 1)
  }

  const handleDecrement = () => {
    if (servings > 1) setServings(prev => prev - 1)
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-light-50 dark:bg-dark-900 transition-colors duration-200">
        <BackgroundDecoration />
        <Header onFavoritesClick={() => navigate('/favoritos')} favoritesCount={favorites.length} />

        <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 mt-20">
          <div className="text-center py-20">
            <div className="text-7xl mb-6">🔍</div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Cóctel no encontrado</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              No pudimos encontrar el cóctel que buscas.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  const baseIngredient = ingredientsData.find(ing => ing.id === recipe.baseIngredient)
  const characteristics = recipe.characteristics.map(charId => 
    characteristicsData.find(c => c.id === charId)
  ).filter(Boolean)

  // Procesar idealFor
  const idealForArray = recipe.idealFor 
    ? (Array.isArray(recipe.idealFor) 
        ? recipe.idealFor 
        : recipe.idealFor.split(',').map(item => item.trim()))
    : []

  const recipeIsFavorite = isFavorite(recipe.id)

  const handleShareClick = () => {
    if (shareButtonRef.current) {
      shareButtonRef.current.openMenu()
    }
  }

  return (
    <div className="min-h-screen bg-light-50 dark:bg-dark-900 transition-colors duration-200">
      <BackgroundDecoration />
      <Header onFavoritesClick={() => navigate('/favoritos')} favoritesCount={favorites.length} />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 mt-16">
        {/* Botón volver */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Volver</span>
        </button>

        {/* Sección principal con imagen e info */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 sm:p-8 relative border border-emerald-200 dark:border-transparent shadow-lg mb-8">
          {/* Contenedor de imagen con botones flotantes */}
          <div className="relative mb-6">
            {/* Imagen */}
            <div className="aspect-video rounded-xl overflow-hidden bg-dark-800">
              <img 
                src={getCocktailImage(recipe.slug)} 
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Botones flotantes */}
            <div className="absolute top-4 right-4 flex flex-col gap-3">
              {/* Botón Favorito */}
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className={`w-12 h-12 rounded-full backdrop-blur-sm transition-all shadow-lg hover:scale-110 flex items-center justify-center ${
                  recipeIsFavorite
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-white/90 dark:bg-dark-900/80 hover:bg-white dark:hover:bg-dark-900'
                }`}
                title={recipeIsFavorite ? 'Quitar de favoritos' : 'Guardar favorito'}
              >
                <svg
                  className={`w-6 h-6 ${
                    recipeIsFavorite ? 'fill-white' : 'fill-none stroke-red-500 stroke-2'
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Contenedor del botón compartir */}
              <div className="relative">
                <button
                  onClick={handleShareClick}
                  className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 backdrop-blur-sm transition-all shadow-lg hover:scale-110 flex items-center justify-center"
                  title="Compartir"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>

                <ShareButton ref={shareButtonRef} recipe={recipe} />
              </div>
            </div>
          </div>

          {/* Título y descripción */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-white">{recipe.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{recipe.description}</p>

          {/* Grid de información */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-emerald-50 dark:bg-dark-700/50 rounded-lg p-4 border border-emerald-200 dark:border-transparent">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Ingrediente Base</p>
              <p className="font-semibold text-emerald-600">
                {baseIngredient?.icon} {baseIngredient?.label}
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-dark-700/50 rounded-lg p-4 border border-emerald-200 dark:border-transparent">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Porciones</p>
              {/* Calculadora de porciones */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-emerald-600">
                  {servings} {servings > 1 || servings === 0 ? 'porciones' : 'porción'}
                </p>
                <div className="flex items-center gap-1 bg-white dark:bg-dark-800 rounded-lg p-0.5 border border-emerald-100 dark:border-dark-600">
                  <button
                    onClick={handleDecrement}
                    disabled={servings <= 1}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-dark-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Disminuir porciones"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <button
                    onClick={handleIncrement}
                    disabled={servings >= 50}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-dark-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Aumentar porciones"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Características */}
          {characteristics.length > 0 && (
            <div className="bg-emerald-50 dark:bg-dark-700/30 rounded-lg p-3 border border-emerald-200 dark:border-transparent mb-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Características</p>
              <div className="flex flex-wrap gap-2">
                {characteristics.map(char => (
                  <span
                    key={char.id}
                    className="bg-emerald-100 dark:bg-dark-700 px-3 py-1 rounded-full text-sm text-emerald-900 dark:text-white border border-emerald-300 dark:border-transparent"
                  >
                    {char.icon} {char.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ideal para */}
          {idealForArray.length > 0 && (
            <div className="bg-emerald-50 dark:bg-dark-700/30 rounded-lg p-3 border border-emerald-200 dark:border-transparent">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Ideal para</p>
              <div className="flex flex-wrap gap-2">
                {idealForArray.map((occasion, index) => (
                  <span
                    key={index}
                    className="bg-emerald-100 dark:bg-dark-700 px-3 py-1 rounded-full text-sm text-emerald-900 dark:text-white border border-emerald-300 dark:border-transparent"
                  >
                    {capitalizeFirst(occasion)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ingredientes */}
        
        {/* Grid de Ingredientes y Equipamiento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
<div className="bg-white dark:bg-dark-800 rounded-2xl p-6 sm:p-8 border border-emerald-200 dark:border-transparent shadow-lg h-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ingredientes</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <svg
                  className="text-emerald-500 flex-shrink-0 w-6 h-6 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {/* Se aplica el escalado de ingredientes aquí */}
                <span className="text-base">
                  {capitalizeFirst(scaleIngredient(ingredient, recipe.servings, servings))}
                </span>
              </li>
            ))}
          </ul>
        </div>

          {/* Equipamiento */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 sm:p-8 border border-emerald-200 dark:border-transparent shadow-lg h-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Equipamiento</h2>
            <ul className="space-y-3">
              {recipe.supplies && recipe.supplies.map((supply, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <svg
                    className="text-emerald-500 flex-shrink-0 w-6 h-6 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-base">{capitalizeFirst(supply)}</span>
                </li>
              ))}
              {(!recipe.supplies || recipe.supplies.length === 0) && (
                 <li className="text-gray-500 italic">No se requiere equipamiento especial.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Preparación */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 sm:p-8 border border-emerald-200 dark:border-transparent shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Preparación</h2>
          <div className="space-y-6">
            {recipe.preparation.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-sm text-white">
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}