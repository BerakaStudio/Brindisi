import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BackgroundDecoration from '../components/BackgroundDecoration'
import IngredientCard from '../components/IngredientCard'
import CharacteristicCard from '../components/CharacteristicCard'
import CocktailCard from '../components/CocktailCard'
import Carousel from '../components/Carousel'
import useFilters from '../hooks/useFilters'
import useFavorites from '../hooks/useFavorites'
import recipesData from '../data/recipes.json'
import ingredientsData from '../data/ingredients.json'
import characteristicsData from '../data/characteristics.json'


export default function HomePage() {
  const navigate = useNavigate()
  const { favorites } = useFavorites()
  const [activeTab, setActiveTab] = useState('ingredientes')
  const [viewMode, setViewMode] = useState('grid') // NUEVO ESTADO
  const [showCarousel, setShowCarousel] = useState(() => {
    return !localStorage.getItem('brindisi-carousel-seen')
  })


  const {
    selectedIngredients,
    selectedCharacteristics,
    searchQuery,
    setSearchQuery,
    setSelectedIngredients,
    setSelectedCharacteristics,
    toggleIngredient,
    toggleCharacteristic,
    clearAllFilters,
    hasActiveFilters,
    filteredRecipes
  } = useFilters(recipesData, ingredientsData, characteristicsData)


  // Estado para resultados de búsqueda en tiempo real
  const [searchResults, setSearchResults] = useState([])


  // useEffect para búsqueda en tiempo real
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim()


      const results = recipesData.filter(recipe => {
        const matchesName = recipe.name.toLowerCase().includes(query)
        const matchesDescription = recipe.description.toLowerCase().includes(query)


        const baseIngredient = ingredientsData.find(ing => ing.id === recipe.baseIngredient)
        const matchesBaseIngredient = baseIngredient?.label.toLowerCase().includes(query)


        const matchesIngredients = recipe.ingredients.some(ing => 
          ing.toLowerCase().includes(query)
        )


        const matchesCharacteristics = recipe.characteristics.some(charId => {
          const char = characteristicsData.find(c => c.id === charId)
          return char?.label.toLowerCase().includes(query)
        })


        return matchesName || matchesDescription || matchesBaseIngredient || 
               matchesIngredients || matchesCharacteristics
      })


      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])


  const handleCloseCarousel = () => {
    localStorage.setItem('brindisi-carousel-seen', 'true')
    setShowCarousel(false)
  }


  const ingredientCounts = ingredientsData.map(ingredient => ({
    ...ingredient,
    count: recipesData.filter(r => r.baseIngredient === ingredient.id).length
  })).filter(i => i.count > 0)


  const characteristicCounts = characteristicsData.map(char => ({
    ...char,
    count: recipesData.filter(r => r.characteristics.includes(char.id)).length
  })).filter(c => c.count > 0)


  const tabs = [
    { id: 'ingredientes', label: 'Ingrediente Base' },
    { id: 'caracteristicas', label: 'Características' },
    { id: 'todos', label: 'Todos' }
  ]


  // Función para manejar selección única de ingrediente
  const handleIngredientClick = (ingredientId) => {
    if (selectedIngredients.includes(ingredientId)) {
      setSelectedIngredients([])
    } else {
      setSelectedIngredients([ingredientId])
    }
    setActiveTab('todos')
  }


  // Función para manejar selección única de característica
  const handleCharacteristicClick = (charId) => {
    if (selectedCharacteristics.includes(charId)) {
      setSelectedCharacteristics([])
    } else {
      setSelectedCharacteristics([charId])
    }
    setActiveTab('todos')
  }


  return (
    <div className="min-h-screen bg-light-50 dark:bg-dark-900 flex flex-col transition-colors duration-200">
      <BackgroundDecoration />

      {showCarousel && <Carousel onComplete={handleCloseCarousel} />}

      <Header 
        onFavoritesClick={() => navigate('/favoritos')} 
        favoritesCount={favorites.length}
        searchValue={searchQuery}
        onSearch={setSearchQuery}
      />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 mt-20 flex-1">

        {/* Mostrar resultados de búsqueda en tiempo real */}
        {searchQuery.trim().length > 0 ? (
          <section>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Resultados de búsqueda
                <span className="text-emerald-600 dark:text-emerald-500 ml-2">({searchResults.length})</span>
              </h2>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 whitespace-nowrap transition-colors"
              >
                Limpiar búsqueda
              </button>
            </div>


            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                  No se encontraron cócteles que coincidan con "{searchQuery}"
                </p>
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="bg-emerald-500 dark:bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Limpiar búsqueda
                </button>
              </div>
            ) : (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {searchResults.map(recipe => (
                    <CocktailCard
                      key={recipe.id}
                      recipe={recipe}
                      viewMode="grid"
                      onClick={() => navigate(`/coctel/${recipe.slug}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map(recipe => (
                    <CocktailCard
                      key={recipe.id}
                      recipe={recipe}
                      viewMode="list"
                      onClick={() => navigate(`/coctel/${recipe.slug}`)}
                    />
                  ))}
                </div>
              )
            )}
          </section>
        ) : (
          <>
            {/* Tabs / Chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 dark:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/30'
                      : 'bg-emerald-100 dark:bg-dark-800 text-emerald-900 dark:text-gray-300 hover:bg-emerald-200 dark:hover:bg-dark-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>


            {/* Contenido según tab activo */}
            {activeTab === 'ingredientes' && (
              <section>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Ingrediente Base</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {ingredientCounts.map(ingredient => (
                    <IngredientCard
                      key={ingredient.id}
                      ingredient={ingredient}
                      count={ingredient.count}
                      isSelected={selectedIngredients.includes(ingredient.id)}
                      onClick={() => handleIngredientClick(ingredient.id)}
                    />
                  ))}
                </div>
              </section>
            )}


            {activeTab === 'caracteristicas' && (
              <section>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Características</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {characteristicCounts.map(char => (
                    <CharacteristicCard
                      key={char.id}
                      characteristic={char}
                      count={char.count}
                      isSelected={selectedCharacteristics.includes(char.id)}
                      onClick={() => handleCharacteristicClick(char.id)}
                    />
                  ))}
                </div>
              </section>
            )}


            {activeTab === 'todos' && (
              <section>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {hasActiveFilters ? 'Resultados' : 'Todos'} 
                    <span className="text-emerald-600 dark:text-emerald-500 ml-2">({filteredRecipes.length})</span>
                  </h2>

                  <div className="flex items-center gap-3">
                    {hasActiveFilters && (
                      <button 
                        onClick={clearAllFilters}
                        className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 whitespace-nowrap transition-colors"
                      >
                        Limpiar filtros
                      </button>
                    )}

                    {/* Toggle de vista */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`px-3 py-2 rounded-full font-medium transition-all text-sm flex items-center gap-1.5 ${
                          viewMode === 'grid'
                            ? 'bg-emerald-500 dark:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/30'
                            : 'bg-emerald-100 dark:bg-dark-800 text-emerald-900 dark:text-gray-300 hover:bg-emerald-200 dark:hover:bg-dark-700'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span className="hidden sm:inline">Columnas</span>
                      </button>

                      <button
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-2 rounded-full font-medium transition-all text-sm flex items-center gap-1.5 ${
                          viewMode === 'list'
                            ? 'bg-emerald-500 dark:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/30'
                            : 'bg-emerald-100 dark:bg-dark-800 text-emerald-900 dark:text-gray-300 hover:bg-emerald-200 dark:hover:bg-dark-700'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span className="hidden sm:inline">Listado</span>
                      </button>
                    </div>
                  </div>
                </div>


                {filteredRecipes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                      No se encontraron recetas con estos filtros
                    </p>
                    <button 
                      onClick={clearAllFilters} 
                      className="bg-emerald-500 dark:bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                ) : (
                  viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {filteredRecipes.map(recipe => (
                        <CocktailCard
                          key={recipe.id}
                          recipe={recipe}
                          viewMode="grid"
                          onClick={() => navigate(`/coctel/${recipe.slug}`)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredRecipes.map(recipe => (
                        <CocktailCard
                          key={recipe.id}
                          recipe={recipe}
                          viewMode="list"
                          onClick={() => navigate(`/coctel/${recipe.slug}`)}
                        />
                      ))}
                    </div>
                  )
                )}
              </section>
            )}
          </>
        )}
      </main>


      <Footer />
    </div>
  )
}