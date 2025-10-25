import { useState } from 'react'
import BingoCard from './components/BingoCard'
import ItemCustomizer from './components/ItemCustomizer'
import './App.css'

const DEFAULT_ITEMS = [
  'Home Run',
  'Double Play',
  'Stolen Base',
  'Strikeout',
  'Walk',
  'Bunt',
  'Error',
  'Grand Slam',
  'Triple',
  'Caught Stealing',
  'Pitching Change',
  'Injury Delay',
  'Home Team Scores',
  'Away Team Scores',
  'Foul Ball',
  'Hit by Pitch',
  'Wild Pitch',
  'Balk',
  'Diving Catch',
  'Ground Rule Double',
  'Replay Review',
  'Fan Catches Ball',
  'Wave Started',
  '7th Inning Stretch'
]

function App() {
  const [items, setItems] = useState(DEFAULT_ITEMS)
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [gameKey, setGameKey] = useState(0)

  const handleSaveItems = (newItems) => {
    setItems(newItems)
    setShowCustomizer(false)
    setGameKey(prev => prev + 1) // Force new game with new items
  }

  const handleNewGame = () => {
    setGameKey(prev => prev + 1) // Force reshuffle
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Baseball Bingo</h1>
        <div className="button-group">
          <button onClick={() => setShowCustomizer(true)} className="btn btn-secondary">
            Customize Items
          </button>
          <button onClick={handleNewGame} className="btn btn-primary">
            New Game
          </button>
        </div>
      </header>

      {showCustomizer ? (
        <ItemCustomizer
          items={items}
          onSave={handleSaveItems}
          onCancel={() => setShowCustomizer(false)}
        />
      ) : (
        <BingoCard key={gameKey} items={items} />
      )}
    </div>
  )
}

export default App
