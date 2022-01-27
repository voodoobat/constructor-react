import scss from './Cursor.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react'

import classNames from 'classnames'

import { useMousePosition } from '@src/hooks'

import { ReactComponent as Move } from './svg/move.svg'
import { ReactComponent as Eraze } from './svg/eraze.svg'
import { ReactComponent as Report } from './svg/report.svg'
import { ReactComponent as ReportRow } from './svg/report_row.svg'
import { ReactComponent as ReportLoop } from './svg/report_loop.svg'
import { ReactComponent as Color } from './svg/color.svg'
import { ReactComponent as Group } from './svg/group.svg'
import { ReactComponent as Size } from './svg/size.svg'

import { IS_TOUCH } from '@src/config'

const icon  = {
  Move,
  Eraze,
  Report,
  ReportRow,
  ReportLoop,
  Color,
  Group,
  Size
}

function Cursor ({
  className,
  activeLoop,
  activeLoopIcon,
  activeTool,
  activeReportType
}) {

  console.log(activeLoopIcon)

  const { x, y } = useMousePosition()
  const [ToolIcon, setToolIcon] = useState()

  useEffect(() => {
    if (activeTool && activeTool != 'Size') {
      if (activeTool == 'Report') {
        if (activeReportType == 'both') return setToolIcon(icon.Report)
        if (activeReportType == 'x') return setToolIcon(icon.ReportRow)
        if (activeReportType == 'y') return setToolIcon(icon.ReportLoop)
      }

      setToolIcon(icon[activeTool])
    }

  }, [activeTool, activeReportType])

  return <>
    {!IS_TOUCH &&
     (ToolIcon || activeLoopIcon) &&
     Boolean(x && y) &&

      <div className={classNames(className, scss._)}
           style={{
            position: 'fixed',
            top: y,
            left: x,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}>
        {ToolIcon && <ToolIcon />}
        {activeLoopIcon && (
          activeLoop == 'stretch'
            ? <img src={'svg/loop/s.svg'} />
            : <img src={activeLoopIcon} />
        )}
      </div>
    }
  </>
}

export default connect(state => ({ ...state }))(Cursor)
