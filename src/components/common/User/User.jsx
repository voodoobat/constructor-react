import scss from './User.module.scss'

import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { ReactComponent as Icon } from './svg/user.svg'

export default function User ({ className, isCustomer }) {
  const { VITE_AUTH_URL } = import.meta.env
  console.log(VITE_AUTH_URL)

  return isCustomer ? (
      <Link to="/schemes"
            className={classNames(className, scss._)}>
        <Icon />
        <span>Мои схемы</span>
      </Link>
    ) : (
      <a href={VITE_AUTH_URL}
         className={classNames(className, scss._)}>
        <Icon />
        <span>Войти</span>
      </a>
    )
}
