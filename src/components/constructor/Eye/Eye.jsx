import scss from './Eye.module.scss'

import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import classNames from 'classnames'

import LoopFaq from '@components/constructor/LoopFaq/LoopFaq'
import CloseButton from '@components/common/Close/Close'

import { ReactComponent as ActiveIcon } from './svg/active.svg'
import { ReactComponent as InactiveIcon } from './svg/inactive.svg'

export default function Eye ({ className, active }) {
  const [isActive, setActive] = useState(Boolean(active))

  return <>
    <button
      className={classNames(className, scss._)}
      onClick={() => setActive(!isActive)}
      type="button">

      {isActive
        ? <ActiveIcon className={scss.active} />
        : <InactiveIcon className={scss.inactive} />
      }
    </button>
    <Modal
      id="faq-modal"
      className={scss.modal}
      show={isActive}
      onHide={() => setActive(false)}>
      <CloseButton onClick={() => setActive(false)} />
      <LoopFaq />
    </Modal>
  </>
}
