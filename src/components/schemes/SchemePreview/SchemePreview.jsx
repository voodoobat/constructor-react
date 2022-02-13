import scss from './SchemePreview.module.scss'

import classNames from 'classnames'
import { uid } from 'uid'

import Row from '@components/canvas/Row/Row'
import CanvasCell from '@components/canvas/CanvasCell/CanvasCell'

export default function SchemePreview({ className, canvas }) {
  return (
    <div className={classNames(className, scss._)}>
      <div className={scss.canvas}>
        {canvas.map((row) => (
          <Row key={uid()}>
            {row.map((cell) => (
              <CanvasCell
                key={uid()}
                className={scss.cell}
                isPreview={true}
                cell={cell}
              />
            ))}
          </Row>
        ))}
      </div>
    </div>
  )
}
