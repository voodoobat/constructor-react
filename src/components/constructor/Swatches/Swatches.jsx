import scss from './Swatches.module.scss'

import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import * as store from '@store/functions'

function Swatches({ className, activeColor, swatches, dispatch }) {
  const swatchesID = 'swatches'
  const [isActive, setActive] = useState(false)

  useEffect(() => setActive(!activeColor), [activeColor])
  useEffect(() => {
    let init = true
    setTimeout(() => (init = false))

    const reset = ({ target }) => {
      if (isActive && !init && !target.closest(`#${swatchesID}`)) {
        dispatch(store.setActiveTool('Move'))
      }
    }

    document.addEventListener('click', reset)
    return () => document.removeEventListener('click', reset)
  }, [isActive])

  return (
    <>
      {isActive && (
        <div id={swatchesID} className={classNames(className, scss._)}>
          <div className={scss.swatches}>
            {swatches.map((background) => (
              <button
                className={classNames(
                  scss.sample,
                  activeColor == background ? scss.is_active : ''
                )}
                onClick={() => dispatch(store.setActiveColor(background))}
                style={{ background }}
                key={background}
              ></button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default connect((state) => ({ ...state }))(Swatches)
