import scss from './Checkbox.module.scss'

import classNames from 'classnames'

import { ReactComponent as Icon } from './svg/check_icon.svg'

export function Checkbox ({
  className,
  checked,
  disabled,
  label,
  setter,
  reverse
}) {

  const onChange = () => setter(!checked)

  return (
    <label className={classNames(
      className,
      scss.checkbox,
      reverse ? scss.is_reverse : '', 
      disabled ? scss.is_disabled : ''
    )}>
      <input type="checkbox"
             onChange={() => onChange()}
             checked={checked} />
      <span className={scss.icon}>
        {checked && <Icon />}
      </span>
      <span className={scss.label}>
        {label}
      </span>
    </label>
  )
}
