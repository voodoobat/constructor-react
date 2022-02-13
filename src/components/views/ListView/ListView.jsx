import scss from './ListView.module.scss'

import { useEffect } from 'react'
import { connect } from 'react-redux'

import Schemes from '@components/schemes/Schemes/Schemes'

import * as store from '@store/functions'

function ListView ({
  schemesList,
  dispatch
}) {

  useEffect(() => {
    document.title = ' Мои схемы'

    dispatch(store.resetScheme())
    dispatch(store.setSchemesList())
  }, [])

  return <Schemes className={scss._}
                  schemes={schemesList} />
}

export default connect(state => ({ ...state }))(ListView)
