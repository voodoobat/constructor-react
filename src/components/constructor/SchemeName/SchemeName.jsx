import scss from './SchemeName.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import { is, spacesToNbsp } from '@src/util'
import { MAX_SCHEME_NAME_LEN } from '@src/config'
import * as store from '@store/functions'

function SchemeName ({
  className,
  schemeTitle,
  dispatch
}) {

  const [temp, setTemp] = useState('')
  const [title, setTitle] = useState(schemeTitle)
  const [isActive, setActive] = useState(false)

  const input = useRef()

  const onChange = ({ target }) => setTitle(target.value)
  const cansel = () => {
    setTitle(temp)
    setActive(false)
  }

  const isEmpty = str => is(' ', str.split(''))
  const setName = () => {
    setTemp(schemeTitle)
    setTitle(schemeTitle)
  }

  useEffect(setName, [schemeTitle])

  useEffect(() => {
    if (isActive) {
      input.current.focus()
    }

    else {
      const error = (!title || isEmpty(title)) || title.length > MAX_SCHEME_NAME_LEN

      if (error) return setTitle(temp)
      if (temp != title) {
        dispatch(store.setSchemeTitle(title))
        dispatch(store.saveScheme())
      }
    }

    const handler = ({ keyCode }) => {
      if (keyCode == 13) return setActive(false)
      if (keyCode == 27) {
        setTitle(temp)
        setActive(false)
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)

  }, [isActive])

  return (
    <div className={classNames(className, scss._)}>
      <div className={scss.name}>
        <input
          ref={input}
          disabled={!isActive}
          className={scss.input}
          onChange={onChange}
          value={title != null ? title : schemeTitle}
          type="text" />
        <span className={scss.hidden}>
          {spacesToNbsp(title != null ? title : schemeTitle)}
        </span>
        {false && // может пригодиться
          <span className={scss.edit_text}>
            {isActive
              ? <>
                  <span
                    className={scss.save_button}
                    onClick={() => setActive(false)}>
                    Сохранить
                  </span>
                  <span
                    className={scss.cansel_button}
                    onClick={cansel}>
                    Отменить
                  </span>
                </>
              : <span
                  className={scss.edit_button}
                  onClick={() => setActive(true)}>
                  Изменить название
                </span>
            }
          </span>
        }
      </div>
    </div>
  )
}

export default connect((state => ({ ...state })))(SchemeName)
