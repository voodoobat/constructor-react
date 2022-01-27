import { connect } from 'react-redux'
import { useEffect } from 'react'

import Welcome from '@components/common/Welcome/Welcome'
import Hero from '@components/common/Hero/Hero'

import * as store from '@store/functions'

function WelcomeView ({ dispatch }) {

  useEffect(() => {
    document.title = 'Конструктор схем для вязания, бесплатная онлайн программа по созданию схем'

    dispatch(store.resetScheme())
  }, [])

  return <>
    <Hero />
    <Welcome />
  </>
}

export default connect(state => ({ ...state }))(WelcomeView)
