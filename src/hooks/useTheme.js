import { useState, useEffect } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Leer del localStorage o usar 'dark' por defecto
    return localStorage.getItem('brindisi-theme') || 'dark'
  })

  useEffect(() => {
    // Aplicar la clase al <html>
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Guardar en localStorage
    localStorage.setItem('brindisi-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}