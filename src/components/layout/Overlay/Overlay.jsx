import scss from './Overlay.module.scss'

import classNames from 'classnames'

export default function Overlay({ className, isDark, transparent, onClick }) {
  const classes = classNames(
    className,
    scss._,
    isDark ? scss.is_dark : '',
    transparent ? scss.is_transparent : ''
  )

  return <div className={classes} onClick={onClick}></div>
}
