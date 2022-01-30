import scss from './Loader.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import Overlay from '@components/layout/Overlay/Overlay'

import { ReactComponent as Woow } from './svg/woow.svg'

function Loader ({ className, activeLoader, active = false }) {
  return (
    <div className={classNames(className, scss._, (active || activeLoader) ? scss.is_active : scss.is_inactive)}>
      <Overlay />
      <Woow className={scss.svg} />
    </div>
  )
}

export default connect(state => ({ ...state }))(Loader)
