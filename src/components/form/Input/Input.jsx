import scss from './Input.module.scss'

import { useState } from 'react'
import classNames from 'classnames'

export function Input({ className, value, setter = () => {}, type, id }) {
  return (
    <span className={classNames(className, scss.input, scss.text)}>
      <input
        value={value}
        type={type || 'text'}
        id={id}
        onChange={(ev) => setter(ev.target.value)}
      />
    </span>
  )
}

import { ReactComponent as Inc } from './svg/inc_icon.svg'
import { ReactComponent as Dec } from './svg/dec_icon.svg'

export function Number({
  className,
  id,
  value = 0,
  onChange,
  setter = () => {},
}) {
  const [val, setVal] = useState(value)

  const actions = {
    inc: () => {
      setVal(val + 1)
      setter(val + 1)
      onChange()
    },

    dec: () => {
      setVal(val - 1)
      setter(val - 1)
      onChange()
    },
  }

  const change = ({ target }) => {
    const v = parseInt(target.value)

    setVal(v)
    setter(v)
    onChange()
  }

  return (
    <span className={classNames(className, scss.input, scss.number)}>
      <span className={scss.number_dec}>
        <Dec onMouseDown={actions.dec} />
      </span>
      <input
        type="number"
        onInput={onChange}
        onChange={change}
        value={val}
        id={id}
      />
      <span className={scss.number_inc}>
        <Inc onMouseDown={actions.inc} />
      </span>
    </span>
  )
}
