import scss from './Offer.module.scss'

import classNames from 'classnames'

import { useState } from 'react'
import { Modal } from 'react-bootstrap'

import ElementForm from '@components/form/ElementForm/ElementForm'
import CloseButton from '@components/common/Close/Close'
import Button from '@components/common/Button/Button'

export default function Offer({ className }) {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className={classNames(className, scss._)}>
      <Button color="black" onClick={() => setOpen(true)}>
        Предложить свой элемент
      </Button>
      <Modal show={isOpen} onHide={() => setOpen(false)}>
        <CloseButton onClick={() => setOpen(false)} />
        <ElementForm />
      </Modal>
    </div>
  )
}
