import scss from './ListView.module.scss'

import { useEffect } from 'react'
import { connect } from 'react-redux'

import Schemes from '@components/schemes/Schemes/Schemes'

import * as store from '@store/functions'

function ListView({ schemesList, activePage, paginator, dispatch }) {
  useEffect(() => {
    document.title = ' Мои схемы'

    dispatch(store.resetScheme())
    dispatch(store.setSchemesList(activePage))
  }, [])

  return (
    <Schemes className={scss._} schemes={schemesList} paginator={paginator} />
  )
}

export default connect((state) => ({ ...state }))(ListView)
