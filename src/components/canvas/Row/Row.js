import scss from './Row.module.scss'

import classNames from 'classnames'

export default function Row ({
  className,
  number,
  isRound,
  children
}) {

  let type = number % 2 == 0 ? 'even' : 'odd'
  type = isRound ? 'odd' : type

  return (
    <div className={classNames(className, scss._, scss[type])}
         data-number={number}>
      {children}
    </div>
  )
}
