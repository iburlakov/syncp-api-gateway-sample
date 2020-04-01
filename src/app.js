import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import PrivateRoute from './components/privateRoute';


//import logo from './logo.svg';
//import './App.css';

import {useAuth, AuthContext} from './components/authContext';

// import {useUser} from './context/'

import Login from './pages/login';
import Browser from './pages/browser';
import AuthHandler from './pages/authHandler';

import User from './controls/user';

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
          <Link to="/">Login</Link> | <Link to="/browser">Browser</Link>
          <header>
            <User />
          </header>
          <Switch>
            <PrivateRoute path="/browser" component={Browser} />
            <Route exact path="/" component={Login} />
            <Route path="/auth/handler" component={AuthHandler} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}


export default App;
