import scss from './ConstructorView.module.scss'

import { connect } from 'react-redux'
import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Constructor from '@components/constructor/Constructor/Constructor'
import CanvasContainer from '@components/canvas/CanvasContainer/CanvasContainer'
import DownloadPreview from '@components/constructor/DownloadPreview/DownloadPreview'

import * as store from '@store/functions'

import { DEFAULT_TITLE, ROUTE_SCHEME } from '@src/config'

function ConstructorView ({
  schemeId,
  config,
  schemeTitle,
  activeDownload,
  dispatch
}) {

  const history = useHistory()
  const { uid } = useParams()

  useEffect(() => {
    if (config.customer) dispatch(store.setSchemesList())
    dispatch(store.setSchemeByUid(uid))
  }, [])

  useEffect(() => dispatch(store.resetTools()), [schemeId])
  useEffect(() => document.title = schemeTitle || DEFAULT_TITLE, [schemeTitle])
  useEffect(() => {
    history.listen(({ pathname }) => {
      if (pathname.includes(ROUTE_SCHEME)) {
        const schemeId = pathname.replace(ROUTE_SCHEME, '')
        dispatch(store.setSchemeByUid(schemeId))
      }
    })
  }, [history])


  return <>
    {activeDownload
      ? <DownloadPreview />
      : <Constructor
          customer={config.customer}
          className={scss._}>
          <CanvasContainer
            autoresize={true}
            withScale={true} />
        </Constructor>
    }
  </>
}

export default connect(state => ({ ...state }))(ConstructorView)
