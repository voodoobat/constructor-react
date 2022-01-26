import scss from './ReportContainer.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import Report from '@components/canvas/Report/Report'

function ReportContainer ({
  className,
  schemeReports,
  isPreview,
  type
}) {

  const style = { height: (schemeReports.length * 40) + 'px' }
  const getReportWidth = ({ elements }) => elements[0].length

  const reports = schemeReports.sort((x, y) => {
    if (getReportWidth(x) < getReportWidth(y)) return -1
    if (getReportWidth(x) > getReportWidth(y)) return 1
    return 0
  })

  return <>
    <div
      style={style}
      className={classNames(className, scss._, scss[`is_${type}`])}>
      {reports.map((report, index) => (
        <Report report={report}
                index={index}
                isPreview={isPreview}
                key={report.uid}
                type="cell" />
      ))}
    </div>
  </>
}

export default connect(state => ({ ...state }))(ReportContainer)
