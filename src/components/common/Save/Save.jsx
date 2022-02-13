import scss from './Save.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import Button from '@components/common/Button/Button'
import * as store from '@store/functions'

function Save({ className, schemeId, dispatch }) {
  const onClick = () => {
    dispatch(store.saveScheme())
    dispatch(store.resetTools())
    dispatch(store.setRedirect(`/scheme/${schemeId}/download`))
  }

  return (
    <Button
      onClick={onClick}
      className={classNames(className, scss._)}
      color="blue"
      size="large"
    >
      Перейти к скачиванию
    </Button>
  )
}

export default connect((state) => ({ ...state }))(Save)
