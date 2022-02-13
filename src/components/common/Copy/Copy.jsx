import scss from './Copy.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import { getSchemeData } from '@src/util'
import * as store from '@store/functions'

function Copy({ className, state, dispatch }) {
  const copy = () => {
    const scheme = {
      ...getSchemeData(state),
      schemeId: '',
      schemeTitle: `${state.schemeTitle} (копия)`,
    }

    dispatch(store.createScheme(scheme))
  }

  return (
    <>
      <button
        onClick={copy}
        className={classNames(className, scss._)}
        type="button"
      >
        Дублировать
      </button>
    </>
  )
}

export default connect((state, { dispatch }) => ({ state, dispatch }))(Copy)
