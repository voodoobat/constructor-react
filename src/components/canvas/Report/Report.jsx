import scss from './Report.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import { formatPlural } from '@src/util'
import * as store from '@src/store/functions'
import * as fn from './Report.fn'

import { CANVAS_CELL_WIDTH, CANVAS_CELL_HEIGHT } from '@src/config'

import { ReactComponent as RemoveIcon } from './svg/remove.svg'

function Report({
  className,
  schemeCanvas,
  schemeOnlyOddCells,
  isPreview,
  report,
  type,
  index,
  dispatch,
}) {
  const { canvas } = report

  const cell = fn.getCellByUid(schemeCanvas, canvas[0][0].uid)
  const last = fn.getCellByUid(schemeCanvas, fn.getLastCellUid(canvas))

  if (!cell || !last) dispatch(store.removeReport(report))

  const size = {
    y: schemeOnlyOddCells
      ? fn.calcOnlyOddReportSize(canvas, schemeCanvas)
      : canvas.length,
    x: canvas[0].length,
  }

  const position = {
    x: cell?.x,
  }

  const css = {
    cell: {
      top: index * (CANVAS_CELL_HEIGHT * 1.5),
      left: position.x * CANVAS_CELL_WIDTH,
      width: size.x * CANVAS_CELL_WIDTH,
    },
  }

  const remove = () => dispatch(store.removeReport(report))

  return (
    <>
      <div className={classNames(className, scss._)} style={css[type]}>
        <i className={classNames(scss.xline, scss.is_left)}></i>
        <i className={classNames(scss.xline, scss.is_right)}></i>
        <div className={scss.label}>
          Раппорт &nbsp;
          {formatPlural(size.y, 'ряд', 'ряда', 'рядов')} &nbsp;
          {formatPlural(size.x, 'петля', 'петли', 'петель')}
          {!isPreview && (
            <button className={scss.remove} onClick={remove}>
              <RemoveIcon className={scss.remove_icon} />
              <span className={scss.remove_text}>Удалить</span>
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default connect((state) => ({ ...state }))(Report)
