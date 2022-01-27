import scss from './GroupCommit.module.scss'

import { useEffect, useState } from 'react'
import classNames from 'classnames'

import Button from '@components/common/Button/Button'

export default function GroupCommit ({ className, save, cansel }) {
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const selected = document.querySelectorAll('[data-selected="true"]')
    const last = [].slice.call(selected).pop()
    const { offsetTop, offsetLeft } = last

    setPosition({
      top: offsetTop,
      left: offsetLeft
    })
  })

  return (
    <div className={classNames(className, scss._)}
         style={{...position }}>
      <div className={scss.buttons}>
        <Button color="red"
                onClick={cansel}>
          Отмена 
        </Button>
        <Button color="blue"
                onClick={save}>
          Добавить 
        </Button>
      </div>
    </div>
  )
}
