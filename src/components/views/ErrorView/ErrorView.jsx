import scss from './ErrorView.module.scss'

import classNames from 'classnames'
import Button from '@components/common/Button/Button'

export default function ErrorView ({ className }) {
  return (
    <div className={classNames(className, scss._)}>
      <img src="/img/404.gif" alt="" />
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
