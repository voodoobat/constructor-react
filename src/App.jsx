import '@scss/app.scss'

import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Layout from '@components/layout/Layout/Layout'
import ListView from '@components/views/ListView/ListView'
import ConstructorView from '@components/views/ConstructorView/ConstructorView'
import CreateView from '@components/views/CreateView/CreateView'
import WelcomeView from '@components/views/WelcomeView/WelcomeView'
import ErrorView from '@components/views/ErrorView/ErrorView'

import {
  ROUTE_LIST,
  ROUTE_CREATE,
  ROUTE_SCHEME,
  ROUTE_DOWNLOAD,
} from '@src/config'
import store from '@src/store'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path={ROUTE_DOWNLOAD} component={ConstructorView} />
            <Route exact path={ROUTE_SCHEME} component={ConstructorView} />
            <Route exact path={ROUTE_LIST} component={ListView} />
            <Route exact path={ROUTE_CREATE} component={CreateView} />
            <Route exact path="/" component={WelcomeView} />
            <Route component={ErrorView} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  )
}
