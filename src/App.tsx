import React from 'react';
import { Navbar } from './components/Navbar';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { Login } from './pages/Login';

function App() {
  return (
    <div className="visualizer-app">
      <Router>
        <Navbar />
        
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
