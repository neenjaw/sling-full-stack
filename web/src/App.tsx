import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { Main } from './views/Main'

import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}

const NoMatch = () => (
  <div style={{ margin: '2rem auto', textAlign: 'center' }}>
    <p>Page not found</p>
    <p>
      <Link to="/">Go home →</Link>
    </p>
  </div>
)

export default App
