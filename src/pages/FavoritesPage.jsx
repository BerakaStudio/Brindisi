import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BackgroundDecoration from '../components/BackgroundDecoration'
import CocktailCard from '../components/CocktailCard'
import useFavorites from '../hooks/useFavorites'
import recipesData from '../data/recipes.json'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const { favorites, clearAllFavorites } = useFavorites()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const favoriteRecipes = recipesData.filter(recipe => 
    favorites.includes(recipe.id)
  )

  const handleClearAll = () => {
    clearAllFavorites()
    setShowDeleteModal(false)
  }

  return (
    <div className="min-h-screen bg-light-50 dark:bg-dark-900 flex flex-col transition-colors duration-200">
      <BackgroundDecoration />
      <Header onFavoritesClick={() => navigate('/favoritos')} favoritesCount={favorites.length} />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 mt-20 flex-1">
        {/* Botón volver */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Volver</span>
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Mis Favoritos
            <span className="text-emerald-600 dark:text-emerald-500 ml-3">({favoriteRecipes.length})</span>
          </h1>

          {favoriteRecipes.length > 0 && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Eliminar todos
            </button>
          )}
        </div>

        {/* Grid de recetas o mensaje vacío */}
        {favoriteRecipes.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-6">💔</div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">No tienes favoritos aún</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Explora nuestras recetas y guarda tus cócteles favoritos
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-emerald-500 dark:bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Explorar recetas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {favoriteRecipes.map(recipe => (
              <CocktailCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => navigate(`/coctel/${recipe.slug}`)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal de confirmación */}
      {showDeleteModal && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={() => setShowDeleteModal(false)} />

          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md bg-white dark:bg-dark-800 rounded-xl border border-emerald-200 dark:border-dark-700 shadow-2xl z-50 p-6">
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">¿Eliminar todos los favoritos?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Esta acción eliminará <strong className="text-emerald-600 dark:text-emerald-400">{favoriteRecipes.length}</strong> receta{favoriteRecipes.length !== 1 ? 's' : ''} de tus favoritos.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-emerald-100 dark:bg-dark-700 hover:bg-emerald-200 dark:hover:bg-dark-600 text-emerald-900 dark:text-white py-3 px-4 rounded-lg font-medium transition-colors border border-emerald-300 dark:border-transparent"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Eliminar todos
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}