import scss from './ReportType.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import classNames from 'classnames'

import { ReactComponent as Report } from '@components/constructor/Tool/svg/report.svg'
import { ReactComponent as ReportRow } from '@components/constructor/Tool/svg/report_row.svg'
import { ReactComponent as ReportLoop } from '@components/constructor/Tool/svg/report_loop.svg'

import * as store from '@store/functions'

function ReportType({ className, activeReportType, dispatch }) {
  const elementID = 'report-popup'
  const [isActive, setActive] = useState(true)

  useEffect(() => setActive(!activeReportType), [activeReportType])
  useEffect(() => {
    let init = true
    setTimeout(() => (init = false))

    const reset = ({ target }) => {
      if (isActive && !init && !target.closest(`#${elementID}`)) {
        dispatch(store.setActiveTool('Move'))
      }
    }

    document.addEventListener('click', reset)
    return () => document.removeEventListener('click', reset)
  }, [isActive])

  return (
    <>
      {isActive && (
        <div id={elementID} className={classNames(className, scss._)}>
          <button
            onClick={() => dispatch(store.setActiveReportType('both'))}
            className={classNames(
              scss.button,
              activeReportType == 'both' ? scss.is_active : ''
            )}
          >
            <Report /> <span className={scss.button_text}>Свободный</span>
          </button>
          <button
            onClick={() => dispatch(store.setActiveReportType('x'))}
            className={classNames(
              scss.button,
              activeReportType == 'x' ? scss.is_active : ''
            )}
          >
            <ReportRow />{' '}
            <span className={scss.button_text}>Горизонтальный</span>
          </button>
          <button
            onClick={() => dispatch(store.setActiveReportType('y'))}
            className={classNames(
              scss.button,
              activeReportType == 'y' ? scss.is_active : ''
            )}
          >
            <ReportLoop />{' '}
            <span className={scss.button_text}>Вертикальный</span>
          </button>
        </div>
      )}
    </>
  )
}

export default connect((state) => ({ ...state }))(ReportType)
