import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './App.css'

import { RepositorieListPage } from './modules/repolsitories-list/RepositorieListPage'

function App() {
  const history = createBrowserHistory()

  return (
    <Router history={history}>
      <div className='App'>
        <Switch>
          <Route path='/'>
            <RepositorieListPage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
