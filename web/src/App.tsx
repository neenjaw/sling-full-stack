import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { PhoenixSocketProvider } from "./phoenix/PhoenixSocketContext";

import './App.css';

function App() {
  return (
    <PhoenixSocketProvider endpoint='/socket'>
      <Router>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="*"><NoMatch /></Route>
        </Switch>
      </Router>
    </PhoenixSocketProvider>
  );
}

const Home = () =>
  <div>Home</div>

const NoMatch = () =>
  <div style={{ margin: '2rem auto', textAlign: 'center' }}>
    <p>Page not found</p>
    <p><Link to="/">Go to the home page →</Link></p>
  </div>;

export default App;
