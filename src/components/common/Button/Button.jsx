import scss from './Button.module.scss'

import { Link } from 'react-router-dom'
import classNames from 'classnames'

export default function Button ({
  className = '',
  tagName = 'button',
  onClick,
  type,
  href,
  disabled,
  children,
  color,
  size
}) {

  const Tag = tagName
  const classes = classNames(
    className,
    scss._,
    color ? scss[`color_${color}`] : scss.color_default,
    size ? scss[`size_${size}`] : scss.size_default
  )

  return href ? (
    <Link to={href} className={classes}>
      {children}
    </Link>
  ) : (
    <Tag className={classes}
         disabled={disabled}
         onClick={onClick}
         type={type}>
      {children}
    </Tag>
  )
}
