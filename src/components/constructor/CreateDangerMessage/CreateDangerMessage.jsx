import scss from './CreateDangerMessage.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import classNames from 'classnames'

import { Link } from 'react-router-dom'

import { ReactComponent as WarnIcon } from './svg/warn.svg'

import { fetch } from '@store/localstorage'
import { convertSchemeEntries } from '@src/util'
import { ROUTE_SCHEME, DEFAULT_SCHEME_ID } from '@src/config'


const ROUTE = `${ROUTE_SCHEME}${DEFAULT_SCHEME_ID}`

function CreateDangerMessage ({
  className,
  config
}) {

  const [scheme, setScheme] = useState(null)

  useEffect(() => {
    const _scheme = fetch()
    const schemeEntries = _scheme ? convertSchemeEntries(_scheme) : null

    setScheme(schemeEntries)
  }, [])

  return <>
    {!config.customer && scheme &&
      <div className={classNames(className, scss._)}>
        <div className={scss.message}>
          <WarnIcon className={scss.icon} />
          <div className={scss.text}>
            При созднании новой схемы, <br />
            созданая Вами ранее «<Link to={ROUTE}>{scheme.schemeTitle}</Link>», <br />
            будет безвозвратно потеряна
          </div>
        </div>
      </div>
    }
  </>
}

export default connect(state => ({ ...state }))(CreateDangerMessage)
