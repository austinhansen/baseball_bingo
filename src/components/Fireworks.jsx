import { useEffect, useState } from 'react'
import './Fireworks.css'

function Fireworks() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Create multiple fireworks bursts
    const createBurst = (x, y, delay) => {
      const burstParticles = []
      const particleCount = 30
      const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff4757', '#1e90ff']

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount
        const velocity = 2 + Math.random() * 2
        burstParticles.push({
          id: `${Date.now()}-${x}-${y}-${i}`,
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 4,
          delay
        })
      }
      return burstParticles
    }

    // Create multiple bursts at different positions
    const allParticles = [
      ...createBurst(20, 30, 0),
      ...createBurst(80, 40, 200),
      ...createBurst(50, 20, 400),
      ...createBurst(30, 50, 600),
      ...createBurst(70, 25, 800),
      ...createBurst(40, 60, 1000),
      ...createBurst(60, 35, 1200)
    ]

    setParticles(allParticles)

    // Repeat fireworks every 2 seconds
    const interval = setInterval(() => {
      const newParticles = [
        ...createBurst(20 + Math.random() * 60, 20 + Math.random() * 40, 0),
        ...createBurst(20 + Math.random() * 60, 20 + Math.random() * 40, 200),
        ...createBurst(20 + Math.random() * 60, 20 + Math.random() * 40, 400)
      ]
      setParticles(prev => [...prev, ...newParticles])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fireworks-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="firework-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}ms`,
            '--vx': particle.vx,
            '--vy': particle.vy
          }}
        />
      ))}
    </div>
  )
}

export default Fireworks
