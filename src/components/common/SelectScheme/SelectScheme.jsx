import scss from './SelectScheme.module.scss'

import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

import Close from '@components/common/Close/Close'
import classNames from 'classnames'

export default function SelectScheme({
  schemesListActive,
  setSchemesListActive,
  schemeId,
  schemesList,
}) {
  return (
    <Modal
      show={schemesListActive}
      onHide={() => setSchemesListActive(false)}
      id="schemes-list-modal"
    >
      <Close onClick={() => setSchemesListActive(false)} />
      <div className={scss._}>
        <div className={scss.caption}>Конструктор спиц</div>
        {schemesList.map((scheme) => (
          <Link
            key={scheme.schemeId}
            className={classNames(
              scss.scheme,
              (schemeId || null) == scheme.schemeId ? scss.is_active : ''
            )}
            to={`/scheme/${scheme.schemeId}`}
          >
            <span className={scss.scheme_name}>{scheme.schemeTitle}</span>
          </Link>
        ))}
        <Link
          onClick={() => setSchemesListActive(false)}
          className={classNames(scss.scheme, scss.is_create)}
          to="/create/"
        >
          <span className={scss.scheme_name}>+ Новая схема</span>
        </Link>
      </div>
    </Modal>
  )
}
