import scss from './Pager.module.scss'

import { uid } from 'uid'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { ReactComponent as Chevron } from './svg/chevron.svg'
import * as store from '@store/functions'

function Pager({ className, activePage, paginator, dispatch }) {
  const { limit, total } = paginator
  const pages = Array.from(
    { length: Math.ceil(total / limit) },
    (_, key) => key + 1
  )

  const setPage = (v) => dispatch(store.setSchemesList(v))

  return (
    <nav className={classNames(className, scss._)}>
      {activePage != 1 && (
        <button
          className={classNames(scss.button, scss.is_prev)}
          type="button"
          onClick={() => setPage(activePage - 1)}
        >
          <Chevron />
        </button>
      )}
      {pages.map((v) => (
        <button
          key={uid()}
          onClick={() => setPage(v)}
          className={classNames(
            scss.button,
            scss.is_number,
            v == activePage ? scss.is_active : ''
          )}
          type="button"
        >
          <span>{v}</span>
        </button>
      ))}
      {activePage < pages.length && (
        <button
          className={classNames(scss.button, scss.is_next)}
          type="button"
          onClick={() => setPage(activePage + 1)}
        >
          <Chevron />
        </button>
      )}
    </nav>
  )
}

export default connect((state) => ({ ...state }))(Pager)
