import scss from './Hint.module.scss'

import classNames from 'classnames'

export default function Hint ({ className, caption, children }) {
  return (
    <div className={classNames(className, scss._)}>
      {caption &&
        <div className={scss.caption}>
          {caption}
        </div>
      }
      <div className={scss.content}>
        {children}
      </div>
    </div>
  )
}
