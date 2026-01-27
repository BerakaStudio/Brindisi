import { useState, useMemo } from 'react'

export default function useFilters(recipes, ingredients, characteristics) {
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Filtro por ingredientes
      const matchesIngredients = selectedIngredients.length === 0 ||
        selectedIngredients.includes(recipe.baseIngredient)

      // Filtro por características
      const matchesCharacteristics = selectedCharacteristics.length === 0 ||
        selectedCharacteristics.some(char => recipe.characteristics.includes(char))

      // Filtro por búsqueda de texto
      const matchesSearch = searchQuery === '' ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesIngredients && matchesCharacteristics && matchesSearch
    })
  }, [recipes, selectedIngredients, selectedCharacteristics, searchQuery])

  const toggleIngredient = (ingredientId) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredientId)
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    )
  }

  const toggleCharacteristic = (charId) => {
    setSelectedCharacteristics(prev =>
      prev.includes(charId)
        ? prev.filter(id => id !== charId)
        : [...prev, charId]
    )
  }

  const clearAllFilters = () => {
    setSelectedIngredients([])
    setSelectedCharacteristics([])
    setSearchQuery('')
  }

  const hasActiveFilters = selectedIngredients.length > 0 ||
    selectedCharacteristics.length > 0 ||
    searchQuery !== ''

  return {
    selectedIngredients,
    selectedCharacteristics,
    searchQuery,
    setSearchQuery,
    setSelectedIngredients,        // NUEVO: Exportar para selección única
    setSelectedCharacteristics,    // NUEVO: Exportar para selección única
    toggleIngredient,
    toggleCharacteristic,
    clearAllFilters,
    hasActiveFilters,
    filteredRecipes
  }
}
