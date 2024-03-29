import thunk from 'redux-thunk'
import { compose, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from '@store/reducers'

const store =
  import.meta.env.MODE == 'development'
    ? createStore(reducer, composeWithDevTools(compose(applyMiddleware(thunk))))
    : createStore(reducer, compose(applyMiddleware(thunk)))

export default store
