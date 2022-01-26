import store from '@src/store'
import * as act from '@store/actions'

window.__IS_AUTH__ = value => store.dispatch(act.setIsAuth(value))
