import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PhoenixSocketProvider } from "./hooks/phoenix/PhoenixSocketContext";

import { SLING_SOCKET_URL } from "./constants";

import "./App.css";
import { Login } from "./components/Login";
import { useIsLoggedIn } from "./hooks/phoenix/PhoenixAuth";

function App() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <PhoenixSocketProvider endpoint={SLING_SOCKET_URL}>
      <Router>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <div>Logged In</div> : <Login />}
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </PhoenixSocketProvider>
  );
}

const NoMatch = () => (
  <div style={{ margin: "2rem auto", textAlign: "center" }}>
    <p>Page not found</p>
    <p>
      <Link to="/">Go home →</Link>
    </p>
  </div>
);

export default App;
