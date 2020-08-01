import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { PhoenixSocketProvider } from "./phoenix/PhoenixSocketContext";

import './App.css';

// eslint-disable-next-line
const jsonEndpoint = process.env.PHOENIX_JSON_ENDPOINT || 'http://localhost:3000'
// eslint-disable-next-line
const wsEndpoint = process.env.PHOENIX_WS_ENDPOINT || 'ws://localhost:3000'

function App() {
  return (
    <PhoenixSocketProvider endpoint={wsEndpoint}>
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
