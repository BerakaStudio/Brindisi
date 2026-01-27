import React from 'react'

export default function DeleteConfirmModal({ recipeName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-dark-800 rounded-xl shadow-2xl max-w-md w-full p-6 border border-emerald-200 dark:border-dark-700">
        <div className="text-center">
          <div className="text-5xl mb-4">🗑️</div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">¿Eliminar de favoritos?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ¿Estás seguro de que deseas eliminar <strong className="text-emerald-600 dark:text-emerald-400">{recipeName}</strong> de tus favoritos?
          </p>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-emerald-100 dark:bg-dark-700 hover:bg-emerald-200 dark:hover:bg-dark-600 text-emerald-900 dark:text-white py-3 px-4 rounded-lg font-medium transition-colors border border-emerald-300 dark:border-transparent"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}