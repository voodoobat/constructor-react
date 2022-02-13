import scss from './LoopFaq.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'
import { uid } from 'uid'

import CanvasCell from '@components/canvas/CanvasCell/CanvasCell'
import { getAllLoops, createCell } from '@src/util'

function LoopFaq ({
  className,
  loops
}) {

  const withHint = getAllLoops(loops).base.filter(({ hint }) => !!hint)
  const elements = withHint.map(loop => ({
    hint: loop.hint,
    cell: createCell(NaN, NaN, loop)
  }))

  return (
    <div className={classNames(className, scss._)}>
      {elements.map(({ hint, cell }) => (
        <div key={uid()} className={scss.element}>
          <div className={scss.icon}>
            <CanvasCell
              className={scss.cell}
              isPreview={true}
              hideHighlight={true}
              cell={cell} />
          </div>
          <div className={scss.hint}>
            <span className={scss.equal}>=</span> <span dangerouslySetInnerHTML={{ __html: hint }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default connect(state => ({ ...state }))(LoopFaq)
