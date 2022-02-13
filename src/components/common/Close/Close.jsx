import scss from './Close.module.scss'

import classNames from 'classnames'

import { ReactComponent as CrossIcon } from './svg/cross.svg'

export default function Close({ className, onClick }) {
  return (
    <button className={classNames(className, scss._)} onClick={onClick}>
      <CrossIcon />
    </button>
  )
}
