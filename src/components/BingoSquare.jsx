import { useState } from 'react'
import './BingoSquare.css'

function BingoSquare({ item, isMarked, isFree, onClick }) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    if (!isFree && !isMarked) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
    }
    onClick()
  }

  return (
    <div
      className={`bingo-square ${isMarked ? 'marked' : ''} ${isFree ? 'free' : ''} ${isAnimating ? 'animating' : ''}`}
      onClick={handleClick}
    >
      {isFree ? (
        <div className="blue-jays-logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/b/ba/Toronto_Blue_Jays_logo.svg"
            alt="Toronto Blue Jays"
          />
          <div className="free-text">FREE</div>
        </div>
      ) : (
        <>
          <span className="square-text">{item}</span>
          {isMarked && (
            <div className="checkmark">
              <svg viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BingoSquare
