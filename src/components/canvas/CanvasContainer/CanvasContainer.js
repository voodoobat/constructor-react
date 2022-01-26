import scss from './CanvasContainer.module.scss'

import { connect } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import classNames from 'classnames'

import CanvasBox from '@components/canvas/CanvasBox/CanvasBox'
import Canvas from '@components/canvas/Canvas/Canvas'
import Cursor from '@components/canvas/Cursor/Cursor'
import Zoom from '@components/canvas/Zoom/Zoom'

import {
  CANVAS_CELL_WIDTH,
  CANVAS_CELL_HEIGHT
} from '@src/config'

function CanvasContainer ({
  className,
  schemeCanvas,
  withScale,
  autoresize,
}) {

  const container = useRef()

  const [scale, setScale] = useState(100)
  const [cursor, setCursor] = useState(false)
  const [cursorDisabled, setCursorDisabled] = useState(false)
  const [savedLen, setSavedLen] = useState(0)

  if (autoresize) useEffect(() => {
    if (schemeCanvas.length && schemeCanvas.flat().length != savedLen) {
      setSavedLen(schemeCanvas.flat().length)

      const canvasWidth = schemeCanvas[0].length * CANVAS_CELL_WIDTH
      const canvasHeight = schemeCanvas.length * CANVAS_CELL_HEIGHT + 65

      const boxWidth = container.current.clientWidth
      const boxHeight = container.current.clientHeight

      if (boxWidth < canvasWidth || boxHeight < canvasHeight) {
        const ratioW = canvasWidth / boxWidth - 1
        const ratioH = canvasHeight / boxHeight - 1

        const zoomW = 100 - Math.ceil(ratioW * 10) * 10
        const zoomH = 100 - Math.ceil(ratioH * 10) * 10

        let zoom = zoomW < zoomH ? zoomW : zoomH

        zoom = zoom > 100 ? 100 : zoom
        zoom = zoom < 50 ? 50 : zoom // 50 - min zoom

        setScale(zoom)
      }
    }
  }, [schemeCanvas])

  return (
    <div ref={container} className={classNames(className, scss._)}>
      <CanvasBox scale={scale}>
        <Canvas
          setCursor={setCursor}
          setCursorDisabled={setCursorDisabled}
          cursorDisabled={cursorDisabled}
          customCursor={cursor} />
      </CanvasBox>
      {(!cursorDisabled && cursor) && <Cursor />}
      {withScale &&
        <div className={classNames(scss.bottom)}>
          <Zoom
            scale={scale}
            setScale={setScale} />
        </div>
      }
    </div>
  )
}

export default connect(state => ({ ...state }))(CanvasContainer)
