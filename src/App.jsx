import '@scss/app.scss'

import { Provider } from 'react-redux'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Layout from '@components/layout/Layout/Layout'
import ListView from '@components/views/ListView/ListView'
import ConstructorView from '@components/views/ConstructorView/ConstructorView'
import CreateView from '@components/views/CreateView/CreateView'
import WelcomeView from '@components/views/WelcomeView/WelcomeView'
import Error404View from '@components/views/Error404View/Error404View'

import store from '@src/store'

export default function App () {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/scheme/:uid/download">
              <ConstructorView />
            </Route>
            <Route path="/scheme/:uid">
              <ConstructorView />
            </Route>
            <Route path="/schemes">
              <ListView />
            </Route>
            <Route path="/create">
              <CreateView />
            </Route>
            <Route path="/404">
              <Error404View />
            </Route>
            <Route path="/">
              <WelcomeView />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </Provider>
  )
}
