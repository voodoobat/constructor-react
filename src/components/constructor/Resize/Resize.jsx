import scss from './Resize.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import classNames from 'classnames'

import { Modal } from 'react-bootstrap'

import Close from '@components/common/Close/Close'
import Field from '@components/form/Field/Field'
import { Checkbox } from '@components/form/Checkbox/Checkbox'
import Button from '@components/common/Button/Button'

import { MIN_CANVAS_SIZE, MAX_CANVAS_SIZE } from '@src/config'

import * as store from '@store/functions'
import * as fn from './Resize.fn'

import { ReactComponent as PlusIcon } from './svg/plus.svg'
import { ReactComponent as MinusIcon } from './svg/minus.svg'
import { ReactComponent as OptionsIcon } from './svg/options.svg'

function Resize({
  className,
  schemeCanvas,
  schemeOnlyOddCells,
  schemeIsRound,
  dispatch,
}) {
  const resizeID = 'resize-popup'

  const [isMinX, setMinX] = useState(false)
  const [isMaxX, setMaxX] = useState(false)
  const [isMinY, setMinY] = useState(false)
  const [isMaxY, setMaxY] = useState(false)

  const [isOpenOptions, setOpenOptions] = useState(false)
  const [isRound, setRound] = useState(schemeIsRound)
  const [onlyOdd, setOnlyOdd] = useState(schemeOnlyOddCells)

  const [isChanged, setChanged] = useState(true)

  const checkDisabled = (cond) => (cond ? scss.is_disabled : '')

  useEffect(() => {
    const canvasX = schemeCanvas[0].length
    const canvasY = schemeCanvas.length

    setMinX(canvasX == MIN_CANVAS_SIZE)
    setMinY(canvasY == MIN_CANVAS_SIZE)
    setMaxX(canvasX == MAX_CANVAS_SIZE)
    setMaxY(canvasY == MAX_CANVAS_SIZE)
  }, [schemeCanvas])

  useEffect(() => {
    let init = true
    setTimeout(() => (init = false))

    const reset = ({ target }) => {
      if (!init && !target.closest(`#${resizeID}`)) {
        dispatch(store.setActiveTool('Move'))
      }
    }

    if (!isOpenOptions) {
      document.addEventListener('click', reset)
      return () => document.removeEventListener('click', reset)
    }
  }, [isOpenOptions])

  const commit = (canvas) => dispatch(store.commitCanvas(canvas))
  const setOptions = (ev) => {
    ev.preventDefault()

    if (onlyOdd != schemeOnlyOddCells) {
      dispatch(store.commitCanvas(fn.setCanvasType(schemeCanvas, onlyOdd)))
    }

    dispatch(store.setSchemeOptions({ isRound, onlyOdd }))
  }

  useEffect(() => {
    setRound(schemeIsRound)
    setOnlyOdd(schemeOnlyOddCells)
  }, [isOpenOptions])

  useEffect(() => {
    setChanged(isRound != schemeIsRound || onlyOdd != schemeOnlyOddCells)
  }, [onlyOdd, isRound, schemeOnlyOddCells, schemeIsRound])

  return (
    <>
      <div id={resizeID} className={classNames(className, scss._)}>
        <div className={scss.plus_box}>
          <button
            className={classNames(
              scss.button,
              scss.is_top,
              checkDisabled(isMaxY)
            )}
            onClick={() => !isMaxY && commit(fn.addTopRow(schemeCanvas))}
          >
            <PlusIcon className={scss.icon} />
          </button>
          <button
            className={classNames(
              scss.button,
              scss.is_left,
              checkDisabled(isMaxX)
            )}
            onClick={() => !isMaxX && commit(fn.addCellLeft(schemeCanvas))}
          >
            <PlusIcon className={scss.icon} />
          </button>
          <button
            className={classNames(
              scss.button,
              scss.is_right,
              checkDisabled(isMaxX)
            )}
            onClick={() => !isMaxX && commit(fn.addCellRight(schemeCanvas))}
          >
            <PlusIcon className={scss.icon} />
          </button>
          <button
            className={classNames(
              scss.button,
              scss.is_bottom,
              checkDisabled(isMaxY)
            )}
            onClick={() => !isMaxY && commit(fn.addRowBottom(schemeCanvas))}
          >
            <PlusIcon className={scss.icon} />
          </button>

          <div className={scss.minus_box}>
            <button
              className={classNames(
                scss.button,
                scss.is_top,
                checkDisabled(isMinY)
              )}
              onClick={() => !isMinY && commit(fn.removeTopRow(schemeCanvas))}
            >
              <MinusIcon className={scss.icon} />
            </button>
            <button
              className={classNames(
                scss.button,
                scss.is_left,
                checkDisabled(isMinX)
              )}
              onClick={() => !isMinX && commit(fn.removeCellLeft(schemeCanvas))}
            >
              <MinusIcon className={scss.icon} />
            </button>
            <button
              onClick={() => setOpenOptions(true)}
              className={scss.button_options}
            >
              <OptionsIcon className={scss.icon} />
              <div className={scss.options_tooltip}>
                <b>Настройки схемы</b>
                <p>Позволяет изменить нумерацию рядов</p>
              </div>
            </button>
            <button
              className={classNames(
                scss.button,
                scss.is_right,
                checkDisabled(isMinX)
              )}
              onClick={() =>
                !isMinX && commit(fn.removeCellRight(schemeCanvas))
              }
            >
              <MinusIcon className={scss.icon} />
            </button>
            <button
              className={classNames(
                scss.button,
                scss.is_bottom,
                checkDisabled(isMinY)
              )}
              onClick={() =>
                !isMinY && commit(fn.removeRowBottom(schemeCanvas))
              }
            >
              <MinusIcon className={scss.icon} />
            </button>
          </div>
        </div>
      </div>

      <Modal show={isOpenOptions} onHide={() => setOpenOptions(false)}>
        <Close onClick={() => setOpenOptions(false)} />
        <form className={scss.options_controls} onSubmit={setOptions}>
          <Field className={scss.options_title}>Настройки схемы</Field>
          <Field>
            <Checkbox
              disabled={isRound}
              className={scss.options_checkbox}
              checked={onlyOdd}
              setter={setOnlyOdd}
              label="Схема узора только для лицевых рядов"
            />
          </Field>
          <Field>
            <Checkbox
              disabled={onlyOdd}
              className={scss.options_checkbox}
              checked={isRound}
              setter={setRound}
              label="Схема для вязания по кругу"
            />
          </Field>
          <Field className={scss.options_submit}>
            <Button
              size="medium"
              type="submit"
              disabled={!isChanged}
              color="blue"
            >
              Применить
            </Button>
          </Field>
        </form>
      </Modal>
    </>
  )
}

export default connect((state) => ({ ...state }))(Resize)
