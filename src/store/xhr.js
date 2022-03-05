import store from '@src/store'

import { XHR_COMMON_DATA } from '@src/config'
import * as act from '@store/actions'

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  )

  return matches ? decodeURIComponent(matches[1]) : ''
}

export const xhr = async (path, method, body, query) => {
  store.dispatch(act.setActiveLoader(true))

  const { config } = store.getState()
  const url = `${config.resources[path]}?${
    query ? query + '&' : ''
  }customer_id=${config.customer.id}`
  const xhrData = {
    ...XHR_COMMON_DATA,
    headers: {
      ...XHR_COMMON_DATA.headers,
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    },
  }

  const request = await fetch(url, {
    ...xhrData,
    method,
    body,
  })

  if (request.status == 200) {
    store.dispatch(act.setActiveLoader(false))
    return await request.json()
  }
}
