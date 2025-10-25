import { useState } from 'react'
import BingoCard from './components/BingoCard'
import ItemCustomizer from './components/ItemCustomizer'
import './App.css'

// Define multiple pre-made item lists
const ITEM_LISTS = {
  blueJaysAds: {
    name: 'Blue Jays Ads',
    items: [
      // Add your items here (minimum 24 items)
      "Leon's",
      "Xfinity Keanu",
      "DoorDash",
      "Amex",
      "Miller Time",
      "Sketchers",
      "Royal Bank",
      "TD Bank",
      "Skip the Dishes",
      "Kubota",
      "City TV Plus",
      "Pizza Pizza",
      "BetMGM",
      "Ozempic",
      "Bet 365",
      "Westjet",
      "Air Canada",
      "Subway",
      "Hallowin",
      "Tim Hortons",
      "Twizzlers",
      "Ring of Fire Ontario",
      "McDonald's",
      "Blue Jays Slow-Mo Highlights"
    ]
  },
  classic: {
    name: 'Classic Baseball',
    items: [
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
      '7th Inning Stretch',
      'Infield Fly Rule',
      'Pinch Hitter',
      'Intentional Walk',
      'Pickoff Attempt'
    ]
  },
  blueJays: {
    name: 'Blue Jays Specific',
    items: [
      'Vladimir Guerrero Jr. Hit',
      'Bo Bichette Single',
      'Springer Home Run',
      'Defensive Gem',
      'Double Play Turned',
      'Stolen Base Success',
      'Pitcher Strikeout',
      'Walk-Off Win',
      'Bases Loaded',
      'Rogers Centre Roar',
      'Bullpen Call',
      'Diving Catch',
      'Home Run into 500s',
      'Jays Take Lead',
      'Rally Cap Time',
      'Bat Flip',
      'Opposing Error',
      'Back-to-Back Hits',
      'RBI Single',
      'Shutdown Inning',
      '1-2-3 Inning',
      'Extra Base Hit',
      'Sacrifice Fly',
      'Runner Left on Base',
      'Mound Visit',
      'Inning-Ending DP',
      'Lead-Off Walk',
      'Popup Caught'
    ]
  },
  fun: {
    name: 'Fun & Quirky',
    items: [
      'Bird Lands on Field',
      'Fan Interference',
      'Dropped Foul Ball',
      'Manager Ejected',
      'Rain Delay',
      'Grounds Crew Dance',
      'Kiss Cam Couple',
      'Beach Ball on Field',
      'Foul Ball Souvenir',
      'Hot Dog Race',
      'Organist Solo',
      'Between-Innings Game',
      'Mascot Antics',
      'Player High-Five Missed',
      'Umpire Argument',
      'Bat Breaks',
      'Shoe Comes Off',
      'Sunglasses Needed',
      'Rally Towel Wave',
      'Ballpark Food Shot',
      'Celebrity Spotted',
      'Seventh Inning Stretch',
      'Take Me Out Song',
      'Scoreboard Error',
      'Foul Pole Hit',
      'Ball Boy Great Play',
      'Behind-The-Plate Kid',
      'Phone Light Wave'
    ]
  },
  advanced: {
    name: 'Advanced Stats',
    items: [
      'Exit Velo Over 100 MPH',
      'Pitch Over 95 MPH',
      'Launch Angle > 30°',
      '10+ Pitch At-Bat',
      'Quality Start',
      '3 Strikeouts in Inning',
      'Perfect Inning',
      'Immaculate Inning',
      'RISP Success',
      'Two-Out Rally',
      '5+ Run Inning',
      'Defensive Shift Beat',
      'Batter 3+ Hits',
      'Pitcher 7+ Ks',
      'No-Hitter Through 5',
      '400+ Foot HR',
      'Bases Clearing Hit',
      'Unearned Run',
      'Inherited Runner Scores',
      'Blown Save',
      'Save Opportunity',
      'Hold Recorded',
      'Pitcher Win',
      'Position Player Pitches',
      'Cycle Watch',
      '20+ Game Hit Streak',
      '0-2 Count Hit',
      '3-0 Count Walk'
    ]
  }
}

const DEFAULT_ITEMS = ITEM_LISTS.blueJaysAds.items

function App() {
  const [items, setItems] = useState(DEFAULT_ITEMS)
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [gameKey, setGameKey] = useState(0)
  const [selectedList, setSelectedList] = useState('blueJaysAds')

  const handleSaveItems = (newItems) => {
    setItems(newItems)
    setShowCustomizer(false)
    setSelectedList('custom')
    setGameKey(prev => prev + 1) // Force new game with new items
  }

  const handleNewGame = () => {
    setGameKey(prev => prev + 1) // Force reshuffle
  }

  const handleListChange = (listKey) => {
    setSelectedList(listKey)
    setItems(ITEM_LISTS[listKey].items)
    setGameKey(prev => prev + 1) // Force new game with new items
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Baseball Bingo</h1>

        <div className="list-selector">
          <label htmlFor="list-select">Choose a list:</label>
          <select
            id="list-select"
            value={selectedList}
            onChange={(e) => handleListChange(e.target.value)}
            className="list-dropdown"
          >
            {Object.entries(ITEM_LISTS).map(([key, list]) => (
              <option key={key} value={key}>{list.name}</option>
            ))}
            {selectedList === 'custom' && (
              <option value="custom">Custom Items</option>
            )}
          </select>
        </div>

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
