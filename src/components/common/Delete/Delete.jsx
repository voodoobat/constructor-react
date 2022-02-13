import scss from './Delete.module.scss'

import { connect } from 'react-redux'
import { useState } from 'react'
import classNames from 'classnames'

import { Modal } from 'react-bootstrap'

import Close from '@components/common/Close/Close'
import Button from '@components/common/Button/Button'

import * as store from '@store/functions'

function Delete ({
  className,
  dispatch
}) {

  const [isOpen, setOpen] = useState(false)
  const remove = () => dispatch(store.deleteScheme())

  return <>
    <button
      onClick={() => setOpen(true)}
      className={classNames(className, scss._)}
      type="button">
      Удалить
    </button>

    <Modal
      show={isOpen}
      id="delete-modal"
      onHide={() => setOpen(false)}>
      <Close onClick={() => setOpen(false)} />
      <p className={scss.text}>Вы уверены?</p>
      <div className={scss.controls}>
        <Button
          onClick={() => setOpen(false)}
          className={scss.button}
          color="blue">
          Отмена
        </Button>
        <Button
          onClick={remove}
          className={scss.button}
          color="red">
          Удалить
        </Button>
      </div>
    </Modal>
  </>
}

export default connect(({ dispatch }) => ({ dispatch }))(Delete)
