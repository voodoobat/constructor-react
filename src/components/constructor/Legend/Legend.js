import scss from './Legend.module.scss'

import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import CanvasCell from '@components/canvas/CanvasCell/CanvasCell'

import { ReactComponent as HideIcon } from './svg/hide.svg'
import { ReactComponent as RestoreIcon } from './svg/restore.svg'

import * as store from '@store/functions'
import * as util from '@src/util'
import * as fn from './Legend.fn'

function Legend ({
  className,
  schemeLegends,
  isPreview,
  legend,
  dispatch
}) {

  const cell = util.createCell(0, 0, legend)

  const [hint, setHint] = useState(legend.hint || '')
  const [tempHint, setTempHint] = useState(legend.hint || '')
  const [isHidden, setHidden] = useState(legend.isHidden)
  const [isActive, setActive] = useState(false)

  const input = useRef()

  const classList = classNames(
    scss.box,
    isPreview ? scss.is_preview : '',
    isHidden ? scss.is_hidden : '',
    isActive ? scss.is_active : '',
  )

  const edit = () => {
    setActive(true)
    setTimeout(() => input.current.focus(), 0)
  }

  const save = (props = {}) => {
    const changed = { ...legend, isHidden, hint, ...props }

    setActive(false)
    dispatch(store.setSchemeLegends(fn.mergeLegends(schemeLegends, changed)))
    dispatch(store.saveScheme())
  }

  const cansel = () => {
    setHint(tempHint)
    setActive(false)
  }

  const hide = () => {
    setHidden(true)
    save({ isHidden: true })
  }

  const show = () => {
    setHidden(false)
    save({ isHidden: false })
  }

  useEffect(() => {
    const action = ({ keyCode }) => {
      if (keyCode == 13) return save({ hint })
      if (keyCode == 27) return cansel()
    }

    if (isActive) {
      document.addEventListener('keydown', action)
    } else {
      document.removeEventListener('keydown', action)
    }
  }, [isActive, hint])

  useEffect(() => {
    setTempHint(legend.hint)
  }, [schemeLegends])

  return (
    <div className={classNames(className, scss._, isPreview ? scss.is_preview : '')}>
      <div className={classList}>
        <CanvasCell
          className={scss.legend_cell}
          isPreview={true}
          hideHighlight={true}
          cell={cell} />
        <span className={scss.separator}>=</span>
        <div className={scss.hint}>
          <span className={scss.name}>
            { util.spacesToNbsp(hint) }
          </span>
          {!isPreview &&
            <input
              ref={input}
              className={scss.input}
              disabled={!isActive}
              value={hint}
              onInput={({ target }) => setHint(target.value)} />
          }
        </div>
        {!isPreview && <>
          <div className={scss.visibility}>
            {isHidden
              ? <button className={scss.visibility_button} onClick={show} type="button">
                  <RestoreIcon className={scss.restore} />
                  <span className={scss.visibility_hint}>
                    Восстановить элемент
                  </span>
                </button>
              : <button className={scss.visibility_button} onClick={hide} type="button">
                  <HideIcon className={scss.hide} />
                  <span className={scss.visibility_hint}>
                    Удалить элемент
                  </span>
                </button>
            }
          </div>
          <div className={scss.controls}>
            {isActive
              ? <button
                  className={classNames(scss.button, scss.save)}
                  onClick={() => save({ hint })}
                  type="button">
                  Сохранить
                </button>
              : <button
                  className={classNames(scss.button, scss.edit)}
                  onClick={edit}
                  type="button">
                  Редактировать описание
                </button>
            }
          </div>
        </>}
      </div>
    </div>
  )
}

export default connect(state => ({ ...state }))(Legend)
