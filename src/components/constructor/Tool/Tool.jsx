import scss from './Tool.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react'

import classNames from 'classnames'

import { or } from '@src/util'

import * as store from '@store/functions'

import { ReactComponent as Move } from './svg/move.svg'
import { ReactComponent as Eraze } from './svg/eraze.svg'
import { ReactComponent as Report } from './svg/report.svg'
import { ReactComponent as ReportRow } from './svg/report_row.svg'
import { ReactComponent as ReportLoop } from './svg/report_loop.svg'
import { ReactComponent as Color } from './svg/color.svg'
import { ReactComponent as Group } from './svg/group.svg'
import { ReactComponent as Size } from './svg/size.svg'

import { ReactComponent as OptionIcon } from './svg/option_icon.svg'

const icon = {
  Move,
  Eraze,
  Report,
  ReportRow,
  ReportLoop,
  Color,
  Group,
  Size
}

function tool ({
  className,
  type,
  dispatch,
  tool,
  activeTool,
  activeReportType,
  activeColor,
  children
}) {

  const [Icon, setIcon] = useState(() => icon[type])
  const isActive = activeTool == type

  const withOption = or(type, ['Report', 'Color', 'Size'])
  const colorClassName = activeColor ? `color${activeColor.replace('#', '')}` : ''

  useEffect(() => {
    if (activeTool == 'Report' && type == 'Report') {
      if (activeReportType == 'both') return setIcon(() => icon.Report)
      if (activeReportType == 'x') return setIcon(() => icon.ReportRow)
      if (activeReportType == 'y') return setIcon(() => icon.ReportLoop)
    }

    return setIcon(() => icon[type])
  }, [activeTool, activeReportType])

  const activate = () => {
    dispatch(store.setActiveTool(type))

    if (type == 'Color') {
      if (activeColor != null) {
        dispatch(store.setActiveColor(null))
      }
    }

    if (type == 'Report') {
      if (activeReportType) {
        dispatch(store.setActiveReportType(null))
      }
    }
  }

  return (
    <div className={classNames(className, scss._, isActive ? scss.is_active : '')}
         onClick={activate}>
      <Icon className={classNames(scss.icon, type == 'Color' ? scss[colorClassName] : '')} />
      <div className={scss.popup}>
        {isActive && tool &&
          <div className={scss.tool}>
            {tool}
          </div>
        }
        <div className={scss.hint}>
          {children}
        </div>
      </div>
      {withOption && <>
        <OptionIcon className={scss.option_icon} />
      </>}
    </div>
  )
}

export default connect(state => ({ ...state }))(tool)
