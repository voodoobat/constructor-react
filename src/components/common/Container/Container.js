import scss from './Container.module.scss'

import classNames from 'classnames'

export default function Container ({ className, children }) {
  return (
    <div className={classNames(className, scss.container)}>
      {children}
    </div>
  )
}
