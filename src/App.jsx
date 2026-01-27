import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FavoritesPage from './pages/FavoritesPage'
import CocktailDetailPage from './pages/CocktailDetailPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favoritos" element={<FavoritesPage />} />
        <Route path="/coctel/:slug" element={<CocktailDetailPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App