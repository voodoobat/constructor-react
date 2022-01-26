import scss from './EditCanvas.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import classNames from 'classnames'

import { mapMatrix } from '@components/canvas/Canvas/Canvas.fn'
import * as store from '@store/functions'
import * as fn from './EditCanvas.fn'

function EditCanvas ({
  className,
  canvas,
  setCanvas,
  dispatch
}) {

  const remapCells = cnvs => {
    cnvs.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        cell.selected = false
        cell.x = cellIndex,
        cell.y = rowIndex
      })
    })
  }

  const hoverX = () => {
    const x = fn.getX(canvas)

    setCanvas(mapMatrix(canvas, cell => ({
      ...cell,
      hover: cell.x == x,
    })))
  }

  const hoverY = () => {
    const y = fn.getY(canvas)

    setCanvas(mapMatrix(canvas, cell => ({
      ...cell,
      hover: cell.y == y,
    })))
  }

  const reset = () => setCanvas(mapMatrix(canvas, cell => ({ ...cell, hover: false })))

  const removeColumn = () => {
    const x = fn.getX(canvas)

    if (x == null) return

    const cnvs = canvas.map(row => {
      row.splice(x, 1)
      return row
    })

    remapCells(cnvs)
    dispatch(store.commitCanvas(cnvs))
    setTimeout(() => setCanvas(canvas), 0)
  }

  const removeRow = () => {
    const y = fn.getY(canvas)

    canvas.splice(y, 1)

    remapCells(canvas)
    dispatch(store.commitCanvas(canvas))
    setTimeout(() => setCanvas(canvas), 0)
  }

  return (
    <div className={classNames(className, scss._)}>
      <button
        onClick={removeColumn}
        onMouseEnter={hoverX}
        onMouseLeave={reset}
        className={scss.button}>
        Удалить столбик
      </button>
      <button
        onClick={removeRow}
        onMouseEnter={hoverY}
        onMouseLeave={reset}
        className={scss.button}>
        Удалить ряд
      </button>
    </div>
  )
}

export default connect(state => ({ ...state }))(EditCanvas)
