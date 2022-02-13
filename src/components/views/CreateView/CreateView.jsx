import scss from './CreateView.module.scss'

import { useEffect } from 'react'

import Constructor from '@components/constructor/Constructor/Constructor'
import CreateDangerMessage from '@components/constructor/CreateDangerMessage/CreateDangerMessage'
import CreateForm from '@components/constructor/CreateForm/CreateForm'

export default function CreateView() {
  useEffect(() => {
    document.title = 'Создание схемы'
  }, [])

  return (
    <Constructor inactive={true}>
      <div className={scss.form_wrap}>
        <CreateForm />
        <CreateDangerMessage className={scss.danger_message} />
      </div>
    </Constructor>
  )
}
