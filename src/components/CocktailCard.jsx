import React from 'react'
import useFavorites from '../hooks/useFavorites'


const getCocktailImage = (slug) => {
  return `/images/cocktails/${slug}.jpg`
}


export default function CocktailCard({ recipe, onClick, viewMode = 'grid' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const recipeIsFavorite = isFavorite(recipe.id)


  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    toggleFavorite(recipe.id)
  }


  // Vista GRID (columnas) - diseño original sin footer de personas
  if (viewMode === 'grid') {
    return (
      <div 
        onClick={onClick}
        className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-emerald-100/50 dark:border-dark-700 h-full flex flex-col"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={getCocktailImage(recipe.slug)} 
            alt={recipe.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              recipeIsFavorite 
                ? 'bg-white/90 text-red-500 scale-110 shadow-lg' 
                : 'bg-black/20 text-white hover:bg-white hover:text-red-500 hover:scale-110'
            }`}
          >
            <svg 
              className={`w-5 h-5 ${recipeIsFavorite ? 'fill-current' : 'fill-none stroke-current stroke-2'}`} 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {recipe.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed flex-grow">
            {recipe.description}
          </p>
        </div>
      </div>
    )
  }


  // Vista LIST (filas) - rediseñada para ser más compacta
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-emerald-100/50 dark:border-dark-700 flex h-28 sm:h-24"
    >
      {/* Imagen cuadrada a la izquierda */}
      <div className="relative w-28 sm:w-32 flex-shrink-0 overflow-hidden">
        <img 
          src={getCocktailImage(recipe.slug)} 
          alt={recipe.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay sutil solo en hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Contenido a la derecha */}
      <div className="flex-grow p-4 sm:p-5 flex flex-col justify-center relative min-w-0">
        <div className="flex justify-between items-start items-center gap-4">
          <div className="min-w-0"> {/* min-w-0 permite que el truncate funcione */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-1 sm:mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
              {recipe.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed pr-8">
              {recipe.description}
            </p>
          </div>


          {/* Botón de favorito alineado arriba a la derecha */}
          <button
            onClick={handleFavoriteClick}
            className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 ${
              recipeIsFavorite 
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-dark-700'
            }`}
          >
            <svg 
              className={`w-5 h-5 ${recipeIsFavorite ? 'fill-current' : 'fill-none stroke-current stroke-2'}`} 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}