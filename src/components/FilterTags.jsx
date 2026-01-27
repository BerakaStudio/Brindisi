import React from 'react'

export default function FilterTags({ 
  selectedIngredients, 
  selectedCharacteristics,
  ingredients,
  characteristics,
  onRemoveIngredient,
  onRemoveCharacteristic,
  onClearAll
}) {
  const hasFilters = selectedIngredients.length > 0 || selectedCharacteristics.length > 0

  if (!hasFilters) return null

  return (
    <div className="bg-dark-800 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-400">Filtros activos:</h3>
        <button 
          onClick={onClearAll}
          className="text-xs text-emerald-500 hover:text-emerald-600"
        >
          Limpiar todo
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedIngredients.map(id => {
          const ingredient = ingredients.find(i => i.id === id)
          return (
            <span 
              key={id}
              className="inline-flex items-center gap-1 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
            >
              🥃 {ingredient?.label}
              <button 
                onClick={() => onRemoveIngredient(id)}
                className="hover:text-blue-200 ml-1"
              >
                ×
              </button>
            </span>
          )
        })}

        {selectedCharacteristics.map(id => {
          const char = characteristics.find(c => c.id === id)
          return (
            <span 
              key={id}
              className="inline-flex items-center gap-1 bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full text-sm"
            >
              ✨ {char?.label}
              <button 
                onClick={() => onRemoveCharacteristic(id)}
                className="hover:text-emerald-200 ml-1"
              >
                ×
              </button>
            </span>
          )
        })}
      </div>
    </div>
  )
}