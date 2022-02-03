import scss from './Dropdown.module.scss'

import { useState } from 'react'
import classNames from 'classnames'

import { ReactComponent as ChevronLarge } from './svg/chevron_large.svg'
import { ReactComponent as ChevronSmall } from  './svg/chevron_small.svg'

const chevron = {
  lg: ChevronLarge,
  sm: ChevronSmall
}

export default function Dropdown ({
  className,
  caption,
  size = 'lg',
  active = true,
  disabled,
  children,
}) {

  const Icon = chevron[size]
  const [isActive, setActive] = useState(active)

  const classes = classNames(
    className,
    scss._,
    size ? scss[`size_${size}`] : '',
    isActive ? scss.is_active : '',
    disabled ? scss.is_disabled : ''
  )

  return (
    <div className={classes}>
      <button className={scss.caption}
              onClick={() => !disabled && setActive(!isActive)}>
        <span className={scss.caption_text}>
          {caption}
        </span>
        <Icon className={scss.chevron} />
      </button>
      <div className={scss.content}>
        {children}
      </div>
    </div>
  )
}
