import '@scss/app.scss'

import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import Layout from '@components/layout/Layout/Layout'
import ListView from '@components/views/ListView/ListView'
import ConstructorView from '@components/views/ConstructorView/ConstructorView'
import CreateView from '@components/views/CreateView/CreateView'
import WelcomeView from '@components/views/WelcomeView/WelcomeView'
import Error404View from '@components/views/ErrorView/ErrorView'

import store from '@src/store'

export default function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/scheme/:uid/download" component={ConstructorView} />
            <Route exact path="/scheme/:uid" component={ConstructorView} />
            <Route exact path="/schemes" component={ListView} />
            <Route exact path="/create" component={CreateView} />
            <Route exact path="/" component={WelcomeView} />
            <Route component={Error404View} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  )
}
