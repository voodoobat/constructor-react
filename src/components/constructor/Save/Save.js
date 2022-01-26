import scss from './Save.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import Button from '@components/common/Button/Button'

import * as store from '@store/functions'

function Save ({ className, dispatch }) {

  const save = () => dispatch(store.saveScheme())

  return (
    <div className={classNames(scss._, className)}>
      <Button onClick={save}
              color="default" 
              size="large">
        Сохранить
      </Button>
    </div>
  )
}

export default connect(state => ({ ...state }))(Save)
