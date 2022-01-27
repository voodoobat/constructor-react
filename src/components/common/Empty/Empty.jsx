import scss from './Empty.module.scss'

import classNames from 'classnames'

export default function Empty ({ className, children }) {
  return (
    <div className={classNames(className, scss._)}>
      {children}
    </div>
  )
}
