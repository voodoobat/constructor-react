import scss from './Save.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import Button from '@components/common/Button/Button'

import * as store from '@store/functions'

function Save ({
  className,
  dispatch
}) {

  const save = () => {
    dispatch(store.saveScheme())
    dispatch(store.setActiveDownload(true))
  }

  return (
    <Button
      onClick={save}
      className={classNames(className, scss._)}
      color="blue"
      size="large">
      Перейти к скачиванию
    </Button>
  )
}

export default connect(state => ({ ...state }))(Save)
