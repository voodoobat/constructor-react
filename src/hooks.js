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

export const useResetToolByClick = elementId => {
  useEffect(() => {
    let init = true
    setTimeout(() => init = false)

    const reset = ({ target }) => {
      if (!init && !target.closest(`#${resizeID}`)) {
        dispatch(store.setActiveTool('Move'))
      }
    }

    document.addEventListener('click', reset) 
    return () => document.removeEventListener('click', reset)
  }, [])
}
