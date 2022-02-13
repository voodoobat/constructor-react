import scss from './LoopButton.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import Loop from '@components/constructor/Loop/Loop'

import * as store from '@store/functions'
import { breakStr } from '@src/util'

const Hint = ({ className, title }) => (
  <div
    className={classNames(className, scss.hint)}
    dangerouslySetInnerHTML={{
      __html: title,
    }}
  ></div>
)

export const LoopButton = connect((state) => ({ ...state }))(
  ({ className, loop, activeLoop, dispatch }) => {
    const { id, icon, title } = loop
    const isActive = activeLoop.id == id

    const onClick = () => dispatch(store.setActiveLoop({ id, icon }, icon))

    return (
      <div
        className={classNames(
          className,
          scss._,
          isActive ? scss.is_selected : ''
        )}
        onClick={onClick}
      >
        <div className={classNames(scss.button)}>
          <Loop icon={icon} />
          {title && (
            <Hint
              className={classNames(scss.hint_down)}
              title={breakStr(title, 5)}
            />
          )}
        </div>
      </div>
    )
  }
)

export const StretchLoop = connect((state) => ({ ...state }))(
  ({ className, activeLoop, dispatch }) => {
    const isActive = activeLoop == 'stretch'
    const onClick = () =>
      dispatch(store.setActiveLoop('stretch', 'svg/loop/s.svg'))

    return (
      <div
        className={classNames(
          className,
          scss._,
          isActive ? scss.is_selected : ''
        )}
        onClick={onClick}
      >
        <div className={classNames(scss.button, scss.button_main)}>
          <Loop icon="/svg/loop/s.svg" />
          <Hint
            className={classNames(scss.hint_down)}
            title="вытянутая петля"
          />
        </div>
      </div>
    )
  }
)
