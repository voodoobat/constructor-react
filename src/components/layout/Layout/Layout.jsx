import scss from './Layout.module.scss'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'

import Header from '@components/layout/Header/Header'
import Footer from '@components/layout/Footer/Footer'
import Loader from '@components/layout/Loader/Loader'

import * as store from '@store/functions'
import { DEFAULT_TITLE } from '@src/config'

function Layout ({
  children,
  config,
  redirect,
  dispatch
}) {

  const [isReady, setReady] = useState(!!config)

  useEffect(() => {
    document.title = DEFAULT_TITLE
    dispatch(store.setStaticData(() => {
      setReady(true)
    }))
  }, [])

  useEffect(() => dispatch(store.setRedirect(null)), [redirect])

  return (
    <div className={scss._}>
      {isReady && <>
        <Header />
        <div className={scss.main}>
          {children}
        </div>
        <Footer />
      </>}

      <Loader active={!isReady} />
      {redirect && <Redirect to={redirect} />}
    </div>
  )
}

export default connect(state => ({ ...state }))(Layout)
