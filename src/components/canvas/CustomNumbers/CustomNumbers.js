import scss from './CustomNumbers.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import classNames from 'classnames'

import * as store from '@store/functions'

function CustomNumbers ({
  className,
  schemeCanvas,
  schemeCustomCells,
  dispatch
}) {

  const [numbers, setNumbers] = useState(schemeCustomCells)

  useEffect(() => {
    const nums = [...schemeCustomCells]
    nums.length = schemeCanvas[0].length

    setNumbers(nums)
  }, [schemeCanvas, schemeCustomCells])

  const onChange = (ev, key) => {
    const temp = [...numbers]

    temp[key] = ev.target.value
    dispatch(store.setSchemeCustomCells(temp))
  }

  return (
    <div className={classNames(className, scss._)}>
      {numbers.map((value, key) => (
        <input
          className={scss.number}
          type="number"
          onChange={ev => onChange(ev, key)}
          value={!isNaN(value) ? value : ''}
          key={key} />
      ))}
    </div>
  )
}

export default connect(state => ({ ...state }))(CustomNumbers)
