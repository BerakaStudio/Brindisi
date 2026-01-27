import React from 'react'

export default function IngredientCard({ ingredient, count, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 text-center border ${
        isSelected
          ? 'bg-emerald-500 dark:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/30 scale-105 border-emerald-600 dark:border-emerald-600'
          : 'bg-white dark:bg-dark-800 hover:bg-emerald-50 dark:hover:bg-dark-700 text-gray-900 dark:text-gray-300 border-emerald-200 dark:border-transparent'
      }`}
    >
      <div className="text-4xl mb-2">{ingredient.icon}</div>
      <div className="font-medium">{ingredient.label}</div>
      <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 block">
        {count} receta{count !== 1 ? 's' : ''}
      </span>
    </div>
  )
}