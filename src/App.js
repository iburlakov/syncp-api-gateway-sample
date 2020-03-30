import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import PrivateRoute from './components/privateRoute';


import logo from './logo.svg';
import './App.css';

import {useAuth, AuthContext} from './components/authContext';

// import {useUser} from './context/'

import Login from './pages/login';
import Browser from './pages/browser';
import AuthHandler from './pages/authHandler';

function App() {

  // /const tmp = localStorage.getItem("tokens");

  const existingTokens  = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    if (data) {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
    } else {
      localStorage.removeItem("tokens");
    }
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/browser">Browser</Link>
          </li>
        </ul>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/browser" component={Browser} />
        <Route path="/auth/handler" component={AuthHandler} />
      </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
