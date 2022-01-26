import { render } from 'react-dom'

import App from '@src/App'

const root = document.getElementById('root')
if (root) render(<App />, root)

if (process.env.REACT_APP_BUILD_ENV == 'development') {
  require('./development')
}
