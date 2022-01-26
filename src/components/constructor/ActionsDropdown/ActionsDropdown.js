import scss from './ActionsDropdown.module.scss'

import { useEffect } from 'react'
import { connect } from 'react-redux'

import classNames from 'classnames'

import { Link } from 'react-router-dom'

import Copy from '@components/common/Copy/Copy'
import Delete from '@components/common/Delete/Delete'

import * as store from '@store/functions'

function ActionsDropdown ({
  className,
  isAuth,
  setActiveMenu,
  setSchemeListActive,
  setActiveInput,
  dispatch
}) {

  const ELEMENT_ID = 'name-dropdown'

  useEffect(() => {
    let init = true
    setTimeout(() => init = false)

    const deactivate = ({ target }) => {
      const isDropdown = target.closest(`#${ELEMENT_ID}`)

      if (!init && !isDropdown) {
        setActiveMenu(false)
      }
    }

    document.addEventListener('click', deactivate)
    return () => document.removeEventListener('click', deactivate)
  }, [])

  const showSchemes = () => {
    setSchemeListActive(true)
    setActiveMenu(false)
  }

  const activateInput = () => {
    setActiveInput(true)
    setActiveMenu(false)
  }

  const save = () => {
    dispatch(store.saveScheme())
    setActiveMenu(false)
  }

  return <>
    <div 
      id={ELEMENT_ID}
      className={classNames(className, scss._)}>
      <div className={scss.head}>
        <button
          onClick={save}
          className={classNames(scss.button, scss.button_save)}
          type="button">
          Сохранить схему
        </button>
      </div>
      {isAuth && <Copy className={scss.button} />}
      {!isAuth &&
        <Link
          to="/create"
          onClick={activateInput}
          className={classNames(scss.button, scss.button_create)}>
          Новая сxема
        </Link>
      }
      <button
        onClick={activateInput}
        className={scss.button}
        type="button">
        Переименовать
      </button>
      <Delete className={classNames(scss.button, scss.button_delete)} />
      {isAuth &&
        <div className={scss.foot}>
          <button
            onClick={showSchemes}
            className={scss.button}
            type="button">
            Мои схемы
          </button>
        </div>
      }
    </div>
  </>
}

export default connect(state => ({ ...state }))(ActionsDropdown)
