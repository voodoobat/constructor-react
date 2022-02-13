import scss from './Confirm.module.scss'

import { useEffect } from 'react'

import Button from '@components/common/Button/Button'
import classNames from 'classnames'

export default function Confirm({ className, cell, confirm, dissmiss }) {
  useEffect(() => {
    const handler = ({ keyCode }) => {
      if (keyCode == 13) confirm()
      if (keyCode == 27) dissmiss()
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className={classNames(className, scss._, scss[`offset_${cell.x}`])}>
      <Button color="red" onClick={dissmiss}>
        Отмена
      </Button>
      <Button color="blue" onClick={confirm}>
        Сохранить
      </Button>
    </div>
  )
}
