import { useState, useEffect } from 'react'

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: NaN, y: NaN })

  const updateMousePosition = ev => setMousePosition({
    x: ev.clientX, y: ev.clientY
  })

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return mousePosition
}
