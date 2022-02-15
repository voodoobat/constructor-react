import scss from './Pager.module.scss'

import { uid } from 'uid'
import classNames from 'classnames'

import { ReactComponent as Chevron } from './svg/chevron.svg'

export default function Pager({ className }) {
  return (
    <nav className={classNames(className, scss._)}>
      <button className={classNames(scss.button, scss.is_prev)} type="button">
        <Chevron />
      </button>
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={uid()}
          className={classNames(
            scss.button,
            scss.is_number,
            v == 2 ? scss.is_active : ''
          )}
          type="button"
        >
          <span>{v}</span>
        </button>
      ))}
      <button className={classNames(scss.button, scss.is_next)} type="button">
        <Chevron />
      </button>
    </nav>
  )
}
