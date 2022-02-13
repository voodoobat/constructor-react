import scss from './Plait.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import Row from '@components/canvas/Row/Row'

import * as store from '@store/functions'

function Plait({ className, plait, dispatch }) {
  const setActive = () => dispatch(store.setActiveGroup(plait))

  return (
    <div
      className={classNames(
        className,
        scss._,
        plait.active ? scss.is_active : ''
      )}
      onClick={setActive}
    >
      {plait.canvas.map((element, y) => (
        <Row key={y}></Row>
      ))}
    </div>
  )
}

export default connect((store) => ({ ...store }))(Plait)
