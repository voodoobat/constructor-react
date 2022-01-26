import scss from './Loop.module.scss'

import classNames from 'classnames'

export default function Loop ({
  className,
  icon
}) {

  return (
    <div className={classNames(className, scss._)}>
      <img src={icon} />
    </div>
  )
}
