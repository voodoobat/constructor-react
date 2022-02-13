import scss from './CanvasBox.module.scss'

import { connect } from 'react-redux'
import Draggable from 'react-draggable'
import classNames from 'classnames'

import Numbers from '@components/canvas/Numbers/Numbers'
import ReportContainer from '@components/canvas/ReportContainer/ReportContainer'

import { CANVAS_ELEMENT_ID } from '@src/config'

function CanvasBox({ className, activeTool, scale, children }) {
  const disabled = activeTool != 'Move'
  const style = {
    transform: `scale(${scale / 100})`,
  }

  return (
    <Draggable disabled={disabled}>
      <div id={CANVAS_ELEMENT_ID}>
        <div className={classNames(className, scss._)}>
          <div className={scss.scale_box} style={style}>
            {children}
            <Numbers />
            <ReportContainer type="cell" />
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default connect((state) => ({ ...state }))(CanvasBox)
