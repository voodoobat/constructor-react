import axios from 'axios'
import store from '@src/store'
import Noty from 'noty'

import * as act from '@store/actions'

export const xhr = (
  method = '',
  path = '',
  xhrData = null,
  query = null
) => {
  store.dispatch(act.setActiveLoader(true))

  const { config } = store.getState()
  const url = query ? `${config.resources[path]}?${query[0]}=${query[1]}` : config.resources[path]
  const headers = {
    'X-CSRF-TOKEN': config.csrf
  }

  if (!config) {
    return console.error('CONFIG IS NOT DEFINED')
  }

  const response = axios[method](url, {
    _token: config.csrf,
    ...xhrData
  }, { headers })

  response
    .then(() => store.dispatch(act.setActiveLoader(false)))
    .catch(() => {
      store.dispatch(act.setRedirect('/404'))
      store.dispatch(act.setActiveLoader(false))
    })

  return response
}

export const xhrGetRes = (response, field = '') => {
  const { status, data } = response

  if (status == 200) {
    return field ? data[field] : data
  }

  return null
}
