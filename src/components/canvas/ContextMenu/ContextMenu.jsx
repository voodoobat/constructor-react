import scss from './ContextMenu.module.scss'

import { useEffect } from 'react'
import classNames from 'classnames'

export default function ContextMenu ({
  className,
  onClose = () => {},
  setContextPosition,
  position,
  children
}) {
  const [left, top] = position

  useEffect(() => {
    let init = true
    setTimeout(() => init = false)

    const reset = () => {
      !init && setContextPosition(null)
      onClose()
    }

    document.addEventListener('click', reset) 
    return () => document.removeEventListener('click', reset)
  }, [])

  return (
    <div
      className={classNames(className, scss._)}
      style={{top, left}}>
      {children}
    </div>
  )
}
