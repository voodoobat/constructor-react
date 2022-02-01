import store from '@src/store'
import * as act from '@store/actions'

if (import.meta.env.MODE == 'development') {
  window.__IS_AUTH__ = v => store.dispatch(act.setIsAuth(v))
  window.__SET_ACTIVE_TOOL__ = v => store.dispatch(act.setActiveTool(v))
}
