import scss from './CanvasCell.module.scss'

import classNames from 'classnames'

import Loop from '@components/constructor/Loop/Loop'
import Confirm from '@components/canvas/Confirm/Confirm'

import { ReactComponent as ReportIcon } from './svg/stripe.svg'

import { getBackgroundStyle } from './CanvasCell.fn'

export default function CanvasCell ({
  className,
  cell,
  onClick,
  confirm,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  hideHighlight,
  acceptGroup,
  rejectGroup,
  isPreview
}) {

  const classList = classNames(
    className,
    scss._,
    hideHighlight ? scss.no_highlight : '',
    cell.selected && !isPreview ? scss.is_selected : '',
    cell.hover ? scss.is_hover : ''
  )

  return (
    <div className={classList}
         onClick={onClick}
         onMouseDown={onMouseDown}
         onMouseUp={onMouseUp}
         onMouseEnter={onMouseEnter}
         data-uid={cell.uid}
         style={getBackgroundStyle(cell)}>
      {cell.report &&
        <div className={scss.report}>
          <ReportIcon className={scss.report_icon} />
        </div>
      }
      {cell.preview.loop && <Loop className={scss.loop} icon={`${cell.preview.loop.icon}`} />}
      {!cell.preview.loop && cell.loop && <Loop className={scss.loop} icon={cell.loop.icon} />}
      {cell.preview.stretch && <Loop className={classNames(scss.stretch, scss.loop)} icon={cell.preview.stretch} />}
      {!cell.preview.stretch && cell.stretch && <Loop className={classNames(scss.stretch, scss.loop)} icon={cell.stretch} />}
      {cell.confirm && confirm &&
        <Confirm
          cell={cell}
          confirm={acceptGroup}
          dissmiss={rejectGroup} />
      }
    </div>
  )
}
