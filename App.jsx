import { useEffect, useState } from 'react'
import { Building2, Heart, LayoutGrid, Menu, X } from 'lucide-react'
import { properties, getPropertyById } from './data/properties'
import MarketPlace from './components/pages/MarketPlace'
import SingleProperty from './components/pages/SingleProperty'
import './App.css'

function App() {
  const [favorites, setFavorites] = useState(() => { try { return JSON.parse(localStorage.getItem('billion-towers-favorites')) || [] } catch { return [] } })
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => { localStorage.setItem('billion-towers-favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { const syncFavorites = (event) => { if (event.key !== 'billion-towers-favorites') return; setFavorites(event.newValue ? JSON.parse(event.newValue) : []) }; window.addEventListener('storage', syncFavorites); return () => window.removeEventListener('storage', syncFavorites) }, [])
  function toggleFavorite(propertyId) { setFavorites((currentFavorites) => currentFavorites.includes(propertyId) ? currentFavorites.filter((id) => id !== propertyId) : [...currentFavorites, propertyId]) }
  const selectedProperty = getPropertyById(selectedPropertyId)

  return (
    <div className="app-shell"><header className="topbar"><a className="brand" href="#marketplace" onClick={() => setSelectedPropertyId(null)}><span className="brand-mark"><Building2 size={16} /></span><span>BILLION <b>TOWERS</b></span></a><button className="mobile-menu" type="button" aria-label="Toggle navigation" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button><nav className={isMenuOpen ? 'is-open' : ''}><a href="#marketplace" onClick={() => { setSelectedPropertyId(null); setIsMenuOpen(false) }}><LayoutGrid size={15} /> Marketplace</a><a href="#favorites" onClick={() => setIsMenuOpen(false)}><Heart size={15} /> Favorites <span>{favorites.length}</span></a><button className="profile-button" type="button">JS</button></nav></header><main>{selectedProperty ? <SingleProperty property={selectedProperty} isFavorite={favorites.includes(selectedProperty.id)} onToggleFavorite={toggleFavorite} onBack={() => setSelectedPropertyId(null)} /> : <MarketPlace properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenProperty={setSelectedPropertyId} />}</main><footer><span>© 2026 Billion Towers</span><span>Built for considered ownership</span></footer></div>
  )
}

export default App
