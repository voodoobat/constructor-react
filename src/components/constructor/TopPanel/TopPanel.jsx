import scss from './TopPanel.module.scss'

import classNames from 'classnames'

import LoopPanel from '@components/constructor/LoopPanel/LoopPanel'
import UndoRedo from '@components/constructor/UndoRedo/UndoRedo'
import Eye from '@components/constructor/Eye/Eye'
import Overlay from '@components/layout/Overlay/Overlay'

export default function TopPanel({ className, inactive }) {
  return (
    <div className={classNames(className, scss._)}>
      <div className={scss.undo_redo}>
        <UndoRedo />
      </div>
      <div className={scss.loops}>
        <LoopPanel />
      </div>
      <div className={scss.controls}>
        <Eye />
        {/* <Offer className={scss.offer_button} /> */}
      </div>
      {inactive && <Overlay />}
    </div>
  )
}
