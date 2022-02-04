import scss from './Loop.module.scss'

import classNames from 'classnames'
import { ReactSVG } from 'react-svg'

export default function Loop ({
  className,
  svgCode,
  icon
}) {

  const patchSrc = src => {
    const icon = src.substring(src.lastIndexOf('/') + 1)
    return `/svg/scheme_elements/${icon}`
  }

  return (
    <div className={classNames(className, scss._)}>
      {svgCode
        ? <ReactSVG src={patchSrc(icon)} />
        : <img src={icon} alt="" />
      }
    </div>
  )
}
