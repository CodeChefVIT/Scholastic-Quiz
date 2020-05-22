import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>
            <Navbar />
            <header>
              <p>Welcome Screen</p>
            </header>
          </div>
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
