import scss from './SchemePreview.module.scss'

import classNames from 'classnames'

import Row from '@components/canvas/Row/Row'
import CanvasCell from '@components/canvas/CanvasCell/CanvasCell'

export default function Empty ({ className, canvas }) {

  return (
    <div className={classNames(className, scss._)}>
      <div className={scss.canvas}>
        {canvas.map((row, index) => (
          <Row key={index}>
            {row.map(cell => (
              <CanvasCell
                className={scss.cell}
                isPreview={true}
                cell={cell} />
            ))}
          </Row>
        ))}
      </div>
    </div>
  )
}
