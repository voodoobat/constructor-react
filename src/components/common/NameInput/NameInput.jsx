import scss from './NameInput.module.scss'

import { connect } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'

import { or, spacesToNbsp, isEmptyString } from '@src/util'
import * as store from '@store/functions'

function NameInput ({
  className,
  isAuth,
  schemeTitle,
  setActiveInput,
  dispatch
}) {

  const input = useRef(null)
  const [value, setValue] = useState(schemeTitle)

  const onChange = ({ target }) => setValue(target.value)
  const save = () => {
    if (value != schemeTitle && !isEmptyString(value)) {
      dispatch(store.setSchemeTitle(value))
      dispatch(store.saveScheme())

      if (isAuth) dispatch(store.setSchemesList())
    }

    setActiveInput(false)
  }

  useEffect(() => {
    const { current } = input

    current.select()

    const handler = ({ keyCode }) => {
      if (keyCode == 13) return current.blur()
      if (keyCode == 27) setActiveInput(false)
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className={classNames(className, scss._)}>
      <span className={scss.text}>
        {spacesToNbsp(value)}
      </span>
      <input
        ref={input}
        className={scss.input}
        onChange={onChange}
        onBlur={save}
        value={value}
        type="text" />
    </div>
  )
}

export default connect(({ dispatch }) => ({ dispatch }))(NameInput)
