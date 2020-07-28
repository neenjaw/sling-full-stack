import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom'

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="*"><NoMatch /></Route>
      </Switch>
    </Router>
  );
}

const Home = () =>
  <div>Home</div>

const NoMatch = () =>
  <div>404</div>

export default App;
