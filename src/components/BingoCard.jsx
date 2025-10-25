import { useState, useEffect } from 'react'
import BingoSquare from './BingoSquare'
import Fireworks from './Fireworks'
import './BingoCard.css'

const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const checkWin = (marked) => {
  // Check rows
  for (let row = 0; row < 5; row++) {
    let count = 0
    for (let col = 0; col < 5; col++) {
      if (marked[row * 5 + col]) count++
    }
    if (count === 5) return true
  }

  // Check columns
  for (let col = 0; col < 5; col++) {
    let count = 0
    for (let row = 0; row < 5; row++) {
      if (marked[row * 5 + col]) count++
    }
    if (count === 5) return true
  }

  // Check diagonal (top-left to bottom-right)
  let diagonal1 = 0
  for (let i = 0; i < 5; i++) {
    if (marked[i * 5 + i]) diagonal1++
  }
  if (diagonal1 === 5) return true

  // Check diagonal (top-right to bottom-left)
  let diagonal2 = 0
  for (let i = 0; i < 5; i++) {
    if (marked[i * 5 + (4 - i)]) diagonal2++
  }
  if (diagonal2 === 5) return true

  return false
}

function BingoCard({ items }) {
  const [shuffledItems, setShuffledItems] = useState([])
  const [marked, setMarked] = useState(Array(25).fill(false))
  const [hasWon, setHasWon] = useState(false)

  useEffect(() => {
    // Shuffle items and set up the grid
    const shuffled = shuffleArray(items).slice(0, 24)
    const grid = []

    // Fill grid with shuffled items, leaving position 12 (center) empty
    for (let i = 0; i < 25; i++) {
      if (i < 12) {
        grid.push(shuffled[i])
      } else if (i === 12) {
        grid.push('FREE') // Center square
      } else {
        grid.push(shuffled[i - 1])
      }
    }

    setShuffledItems(grid)

    // Mark center square as always marked
    const initialMarked = Array(25).fill(false)
    initialMarked[12] = true
    setMarked(initialMarked)
    setHasWon(false)
  }, [items])

  const handleSquareClick = (index) => {
    if (hasWon || index === 12) return // Don't allow clicks after winning or on center

    const newMarked = [...marked]
    newMarked[index] = !newMarked[index]
    setMarked(newMarked)

    // Check for win
    if (checkWin(newMarked)) {
      setHasWon(true)
    }
  }

  return (
    <div className="bingo-card-container">
      {hasWon && (
        <div className="win-overlay">
          <div className="win-message">
            <h2>YOU WIN!</h2>
            <p>BINGO!</p>
          </div>
          <Fireworks />
        </div>
      )}

      <div className="bingo-card">
        <div className="bingo-header">
          <div className="bingo-letter">B</div>
          <div className="bingo-letter">I</div>
          <div className="bingo-letter">N</div>
          <div className="bingo-letter">G</div>
          <div className="bingo-letter">O</div>
        </div>

        <div className="bingo-grid">
          {shuffledItems.map((item, index) => (
            <BingoSquare
              key={index}
              item={item}
              isMarked={marked[index]}
              isFree={index === 12}
              onClick={() => handleSquareClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BingoCard
