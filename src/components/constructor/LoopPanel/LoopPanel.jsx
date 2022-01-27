import scss from './LoopPanel.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import { LoopButton, StretchLoop } from '@components/constructor/LoopButton/LoopButton'

import { getAllLoops } from '@src/util'

const view = source => source.map(loop =>
  <LoopButton
    className={scss.button}
    loop={loop}
    key={loop.id} />
)

function LoopsPanel ({
  className,
  loops
}) {

  const { base, complex } = getAllLoops(loops)

  return (
    <div className={classNames(className, scss._)}>
      {view(base)}
      <StretchLoop className={scss.button} />
      <span className={scss.separator} />
      {view(complex)}
    </div>
  )
}

export default connect(({ loops }) => ({ loops }))(LoopsPanel)
