import scss from './Canvas.module.scss'

import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Overlay from '@components/layout/Overlay/Overlay'
import CanvasCell from '@components/canvas/CanvasCell/CanvasCell'
import ContextMenu from '@components/canvas/ContextMenu/ContextMenu'
import EditCanvas from '@components/canvas/EditCanvas/EditCanvas'
import Row from '@components/canvas/Row/Row'

import { is, or } from '@src/util'
import * as store from '@store/functions'
import { cleanCell } from '@src/util'
import * as fn from './Canvas.fn'

import {
  CANVAS_CELL_HEIGHT,
  CANVAS_CELL_WIDTH,
  MAX_STRETCH_LEN
} from '@src/config'

function Canvas ({
  className,
  setCursor,
  customCursor,
  setCursorDisabled,
  cursorDisabled,
  activeGroup,
  activeColor,
  activeLoop,
  activeTool,
  activeReportType,
  schemeCanvas,
  schemeReports,
  schemeOnlyOddCells,
  schemeIsRound,
  dispatch
}) {

  const [canvas, setCanvas] = useState(schemeCanvas)
  const [confirm, setConfirm] = useState(false)
  const [group, setGroup] = useState(null)
  const [report, setReport] = useState(null)
  const [crossingReports, setCrossingReports] = useState([])
  const [active, setActive] = useState(null)
  const [lastCell, setLastCell] = useState(null)
  const [contextPosition, setContextPosition] = useState(null)

  const nums = fn.getRowNums(canvas.length, schemeOnlyOddCells)

  const commitWithNewProps = (prop, compare, props, save = true) => {
    const temp = fn.mapMatrix(canvas, cell => {
      const preview = { background: null, loop: null }

      return cell[prop] == compare
        ? { ...cell, ...props, preview, selected: false }
        : { ...cell, preview }
    })

    setCanvas(temp)
    dispatch(store.commitCanvas(temp, save))
  }

  const cleanExtra = () => {
    setGroup(null)
    setReport(null)
    setConfirm(false)

    dispatch(store.setConfirm(false))
  }

  const onMouseDown = cell => {
    if (!activeGroup) setActive(cell)

    if (activeTool == 'Move') {
      setActive(null)
    }

    if (activeGroup) {
      const temp = fn.placeGroup(canvas, activeGroup)
      dispatch(store.commitCanvas(fn.mapMatrix(temp, cleanCell)))
    }
  }

  const onMouseEnter = cell => {
    setLastCell(cell)

    if (active && !activeGroup) {

      if (is(activeTool, 'Report')) {
        setCanvas(fn.square(canvas, cell, active, activeReportType))
      } else {
        setCanvas(fn.square(canvas, cell, active))
      }
    }

    if (activeGroup) {
      setCanvas(fn.squareGroup(canvas, cell, activeGroup))
    }

    if (activeLoop == 'stretch' && active) {
      const selected = canvas.flat().filter(cell => cell.selected)
      const last = selected[selected.length - 1]

      const start = active.y
      const stop = start < last.y ? last.y : selected[0].y
      const size = start < stop ? (stop - start) + 1 : (start - stop) + 1

      const map = []

      if (start < stop) for (let j = start; j <= stop; j++) {
        map.push(j)
      }

      if (start > stop) for (let j = stop; j <= start; j++) {
        map.push(j)
      }

      canvas.flat().forEach(cell => cell.preview.stretch = null)
      if (size > 1 && size < MAX_STRETCH_LEN) map.forEach((y, index) => {
        canvas[y].forEach(cell => {
          cell.preview.stretch = cell.selected
            ? `svg/loop/s/${size}/${index}.svg`
            : null
        })
      })
    }
  }

  const onMouseUp = (cell, ev) => {
    setActive(null)

    if (ev?.button != 0) return

    const isSingle = active?.uid == cell.uid

    if (activeLoop) {
      const props = { loop: activeLoop }

      if (activeLoop == 'stretch') {
        return dispatch(store.commitCanvas(fn.mapMatrix(canvas, cell => {
          return cell.selected
            ? {
              ...cell,
              stretch: cell.preview.stretch,
              selected: false,
              preview: {
                loop: null,
                background: null
              }
            }
            : cell
        })))
      }

      return isSingle
        ? commitWithNewProps('uid', cell.uid, props)
        : commitWithNewProps('selected', true, props)
    }

    if (activeTool == 'Eraze') {
      const props = {
        loop: null,
        background: '#ffffff',
        stretch: null
      }

      return isSingle
        ? commitWithNewProps('uid', cell.uid, props)
        : commitWithNewProps('selected', true, props)
    }

    if (activeTool == 'Color') {
      const props = { background: activeColor }

      return isSingle
        ? commitWithNewProps('uid', cell.uid, props)
        : commitWithNewProps('selected', true, props)
    }

    if (activeTool == 'Group') {
      const temp = fn.getSubMatrix(canvas, 'selected', true)
      const { oneRow, oneCol } = fn.isOneRowOrCol(temp)

      if (oneRow && oneCol) {
        setCanvas(fn.mapMatrix(schemeCanvas, cell => ({
          ...cell, selected: false
        })))
      }

      else if (temp.length) {
        const withConfirm = fn.lastCellWithProp(canvas, temp, 'confirm', true)
        setCanvas(withConfirm)

        setGroup({ canvas: temp })
        setConfirm(true)
      }
    }

    if (activeTool == 'Report') {
      const temp = fn.getSubMatrix(canvas, 'selected', true)
      const { oneRow, oneCol } = fn.isOneRowOrCol(temp)

      if (oneRow || oneCol) {
        setCanvas(fn.mapMatrix(schemeCanvas, cell => ({
          ...cell, selected: false
        })))
      }

      else if (temp.length) {
        const withConfirm = fn.lastCellWithProp(canvas, temp, 'confirm', true)
        setCanvas(withConfirm)

        setReport(fn.createReport(temp, schemeReports))
        setCrossingReports(fn.getCrossingsReportsUids(temp))
        setConfirm(true)
      }
    }
  }

  const rejectSelection = () => {
    commitWithNewProps('selected', true, {
      selected: false,
      confirm: false
    })

    cleanExtra()
  }

  const acceptSelection = () => {

    if (is(activeTool, 'Group')) {
      dispatch(store.commitNewGroup(group.canvas))

      commitWithNewProps('selected', true, {
        selected: false,
        confirm: false
      }, false)

      cleanExtra()
    }

    if (is(activeTool, 'Report')) {
      const commonProps = {
        selected: false,
        confirm: false
      }

      const withReport = fn.mapMatrix(canvas, (cell => {
        const { uid, color } = report

        if (cell.selected) {
          return { ...cell, ...commonProps, report: { uid, color }}
        }

        if (cell.report && or(cell.report.uid, crossingReports)) {
          return { ...cell, ...commonProps, report: null }
        }

        return { ...cell, ...commonProps }
      }))

      crossingReports.forEach(uid => dispatch(store.removeReport({ uid })))
      setCrossingReports([])

      setCanvas(withReport)
      dispatch(store.commitCanvas(withReport, false))
      dispatch(store.setReport(report))
      cleanExtra()
    }
  }

  const canvasMouseMove = () => setCursor(true)
  const canvasMouseEnter = () => setCursor(true)
  const canvasMouseLeave = () => {
    if (active) onMouseUp(lastCell)

    setCursor(false)
    setActive(null)

    if (!confirm && !contextPosition) setCanvas(fn.mapMatrix(canvas, cell => ({
      ...cell,
      selected: false,
      preview: {
        loop: null
      },
    })))
  }

  const showCustomMenu = (ev) => {
    ev.preventDefault()

    const element = canvas.flat().find(cell => cell.uid == ev.target.dataset.uid)
    if (!element) return

    const { x, y } = element

    canvas.flat().forEach(cell => cell.selected = cell.x == x || cell.y == y)

    setContextPosition([
      x * CANVAS_CELL_WIDTH + 10,
      y * CANVAS_CELL_HEIGHT + 10
    ])
  }

  useEffect(() => setCanvas(schemeCanvas), [schemeCanvas])
  useEffect(() => setCursorDisabled(confirm || Boolean(contextPosition)), [confirm, contextPosition])
  useEffect(() => {
    if (!confirm) return

    setConfirm(false)
    setCanvas(fn.mapMatrix(canvas, cell => ({
      ...cell,
      selected: false,
      confirm: false,
      preview: {
        loop: null
      },
    })))
  }, [activeTool, activeLoop, activeGroup])

  return (
    <div className={classNames(className, scss._, (customCursor && !cursorDisabled) ? scss.no_cursor : '')}
         onContextMenu={showCustomMenu}
         onMouseMove={canvasMouseMove}
         onMouseEnter={canvasMouseEnter}
         onMouseLeave={canvasMouseLeave}>
      {canvas.map((row, index) => (
        <Row number={nums[index]}
             isRound={schemeIsRound}
             key={index}>
          {row.map(cell => (
            <CanvasCell
              cell={cell}
              confirm={confirm}
              isPreview={false}
              hideHighlight={or(activeTool, ['Move', 'Group'])}
              className={scss.cell}
              onMouseEnter={() => onMouseEnter(cell)}
              onMouseDown={() => onMouseDown(cell)}
              onMouseUp={ev => active && onMouseUp(cell, ev)}
              acceptGroup={acceptSelection}
              rejectGroup={rejectSelection}
              key={cell.uid} />
          ))}
        </Row>
      ))}
      {contextPosition &&
        <ContextMenu
          onClose={() => setCanvas(fn.reselect(canvas))}
          setContextPosition={setContextPosition}
          position={contextPosition}>
          <EditCanvas
            setCanvas={setCanvas}
            canvas={canvas} />
        </ContextMenu>
      }
      {confirm && <Overlay />}
    </div>
  )
}

export default connect(state => ({ ...state }))(Canvas)
