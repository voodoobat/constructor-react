import scss from './SchemeButton.module.scss'

import { Link } from 'react-router-dom'
import ClampLines from 'react-clamp-lines'
import classNames from 'classnames'

import SchemePreview from '@components/schemes/SchemePreview/SchemePreview'

export function SchemeButton({ className, scheme }) {
  const { schemeId, schemeUpdatedAt, schemePreview, schemeTitle } = scheme

  return (
    <Link
      to={`/scheme/${schemeId}`}
      className={classNames(className, scss._, scss.button_show)}
    >
      <div className={scss.image}>
        {!!schemePreview?.length && <SchemePreview canvas={schemePreview} />}
      </div>
      <div className={scss.text}>
        <span className={scss.name}>
          <ClampLines text={schemeTitle} lines={2} buttons={false} />
        </span>
        <span className={scss.date}>Изменено: {schemeUpdatedAt}</span>
      </div>
    </Link>
  )
}

import { ReactComponent as Icon } from './svg/plus-icon.svg'

export function SchemeButtonCreate({ className }) {
  return (
    <Link
      to="/create"
      className={classNames(className, scss._, scss.button_create)}
    >
      <Icon />
    </Link>
  )
}
