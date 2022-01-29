import scss from './Error404View.module.scss'

import Button from '@components/common/Button/Button'
import classNames from 'classnames'

export default function Error404View ({ className, children }) {
  return (
    <div className={classNames(className, scss._)}>
      <img src="404.gif" alt="" />
      <p className={scss.note}>Тут, к сожалению, пусто :(</p>
      <p className={scss.create}>Но, Вы можете создать новый шедевр!</p>
      <Button
        size="large"
        href="/create"
      >
        Создать новую схему
      </Button>
    </div>
  )
}