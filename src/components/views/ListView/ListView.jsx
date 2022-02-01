import scss from './ListView.module.scss'

import { useEffect } from 'react'
import { connect } from 'react-redux'

import Schemes from '@components/schemes/Schemes/Schemes'

import * as store from '@store/functions'

function ListView ({
  config,
  schemesList,
  dispatch
}) {

  if (!config.customer) dispatch(store.setRedirect('/404'))

  useEffect(() => {
    document.title = ' Мои схемы'

    dispatch(store.resetScheme())
    dispatch(store.setSchemesList())
    dispatch(store.setRedirect(null))
  }, [])

  return <Schemes schemes={schemesList} />
}

export default connect(state => ({ ...state }))(ListView)
