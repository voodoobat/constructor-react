import store from '@src/store'

import { XHR_COMMON_DATA } from '@src/config'
import * as act from '@store/actions'

export const xhr = async (path, method, body) => {
  store.dispatch(act.setActiveLoader(true))

  const { config } = store.getState()
  const url = `${config.resources[path]}?customer_id=${config.customer.id}`
  const xhrData = {
    ...XHR_COMMON_DATA,
    headers: {
      ...XHR_COMMON_DATA.headers,
      'X-CSRF-TOKEN': config.csrf
    }
  }

  const request = await fetch(url, {
    ...xhrData, method, body
  })

  if (request.status == 200) {
    store.dispatch(act.setActiveLoader(false))
    return await request.json()
  }
}

export const xhrGetRes = (response, field = '') => {
  const { status, data } = response

  if (status == 200) {
    return field ? data[field] : data
  }

  return null
}
