import scss from './DownloadPreview.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import Row from '@components/canvas/Row/Row'
import CanvasCell from '@components/canvas/CanvasCell/CanvasCell'
import Numbers from '@components/canvas/Numbers/Numbers'
import ReportContainer from '@components/canvas/ReportContainer/ReportContainer'
import LegendBox from '@components/constructor/LegendBox/LegendBox'

import { ReactComponent as Watermark } from './svg/watermark.svg'

import { getRowNums } from '@components/canvas/Canvas/Canvas.fn'
import { CANVAS_ELEMENT_ID } from '@src/config'

function DownloadPreview({
  className,
  schemeTitle,
  schemeCanvas,
  schemeOnlyOddCells,
  schemeIsRound,
  downloadOptions,
}) {
  const nums = getRowNums(schemeCanvas.length, schemeOnlyOddCells)

  return (
    <div className={classNames(className, scss._)}>
      <div id={CANVAS_ELEMENT_ID} className={scss.to_image}>
        <div className={scss.canvas_box}>
          {downloadOptions.schemeTitle && (
            <div className={scss.name_box}>{schemeTitle}</div>
          )}
          <div className={scss.main}>
            <div className={scss.nums_wrap}>
              <div className={scss.canvas}>
                {schemeCanvas.map((row, index) => (
                  <Row number={nums[index]} isRound={schemeIsRound} key={index}>
                    {row.map((cell) => (
                      <CanvasCell
                        cell={cell}
                        hideHighlight={true}
                        isPreview={true}
                        isDownload={true}
                        key={cell.uid}
                      />
                    ))}
                  </Row>
                ))}
                <Watermark className={scss.watermark} />
              </div>
              <Numbers isPreview={true} />
              {downloadOptions.schemeReports && (
                <ReportContainer isPreview={true} type="cell" />
              )}
            </div>
            {downloadOptions.schemeLegends && (
              <LegendBox isPreview={true} className={scss.legends} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({ ...state }))(DownloadPreview)
