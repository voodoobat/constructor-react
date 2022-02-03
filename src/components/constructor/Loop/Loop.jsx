import scss from './Loop.module.scss'

import classNames from 'classnames'
import { ReactSVG } from 'react-svg'

export default function Loop ({
  className,
  svgCode,
  icon
}) {
  return (
    <div className={classNames(className, scss._)}>
      {svgCode
        ? <ReactSVG src={icon} />
        : <img src={icon} alt="" />
      }
    </div>
  )
}
