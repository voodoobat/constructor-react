import scss from './UndoRedo.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import { mapMatrix } from '@components/canvas/Canvas/Canvas.fn'

import { ReactComponent as Undo } from './svg/undo.svg'
import { ReactComponent as Redo } from './svg/redo.svg'

import * as fn from './UndoRedo.fn'
import * as store from '@store/functions'
import { cleanCell } from '@src/util'
import { useEffect } from 'react'

function UndoRedo ({
  className,
  dispatch,
  schemeHistory,
  schemeHistoryStep
}) {

  const size = schemeHistory?.length

  const hasNext = size && schemeHistory[size - 1].uid != schemeHistoryStep
  const hasPrev = size && schemeHistory[0].uid != schemeHistoryStep

  const jump = location => {
    const step = fn.getStep(schemeHistory, schemeHistoryStep)[location]

    if (step) {
      const { canvas, uid } = step
      const cnvs = mapMatrix(canvas, cleanCell)

      dispatch(store.commitCanvas(cnvs, false))
      dispatch(store.setSchemeHistorytStep(uid))
    }
  }

  useEffect(() => {
    const handler = ({ ctrlKey, shiftKey, keyCode }) => {
      if (!ctrlKey) return

      if (keyCode == 26) {
        if (shiftKey) return jump('next')
        return jump('prev')
      }
    }

    document.addEventListener('keypress', handler)
    return () => document.removeEventListener('keypress', handler)
  }, [schemeHistory, schemeHistoryStep])


  return (
    <div className={classNames(className, scss._)}>
      <button className={classNames(scss.button, hasPrev ? scss.is_active : '')}
              onClick={() => jump('prev')}
              title="Ctrl + z"
              type="button">
        <Undo />
      </button>
      <button className={classNames(scss.button, hasNext ? scss.is_active : '')}
              onClick={() => jump('next')}
              title="Ctrl + Shift + Z"
              type="button">
        <Redo />
      </button>
    </div>
  )
}

export default connect(state => ({ ...state }))(UndoRedo)
