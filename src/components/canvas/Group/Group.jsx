import scss from './Group.module.scss'

import { connect } from 'react-redux'
import classNames from 'classnames'

import Row from '@components/canvas/Row/Row'

import * as store from '@store/functions'

import { ReactComponent as Delete } from './svg/delete.svg'
import CanvasCell from '../CanvasCell/CanvasCell'

function Group ({
  className,
  group,
  controls = true,
  dispatch
}) {

  const setActive = () => dispatch(store.setActiveGroup(group))
  const remove = () => dispatch(store.removeGroup(group))

  return (
    <div className={classNames(className, scss._, group.active ? scss.is_active : '')}>
      {controls &&
        <button
          className={scss.delete}
          onClick={remove}
          type="button">
          <Delete />
        </button>
      }
      <div className={scss.canvas}
           onClick={setActive}>
        {group.canvas.map((element, y) => (
          <Row key={y} className={scss.row}>
            {element.map((cell, x) => (
              <CanvasCell
                className={scss.cell}
                cell={cell}
                isPreview={true}
                key={cell.uid} />
            ))}
          </Row>
        ))}
      </div>
    </div>
  )
}

export default connect(store => ({ ...store }))(Group)
