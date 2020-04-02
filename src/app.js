import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import PrivateRoute from './components/privateRoute';

import {AuthContext} from './components/authContext';

import Login from './pages/login';
import Browser from './pages/browser';
import AuthHandler from './pages/authHandler';

import User from './controls/auth/user';

import styles from './styles.css';

function App() {

  const existingToken  = JSON.parse(localStorage.getItem("token"));
  const [token, setToken] = useState(existingToken);

  const setTokenCallback = (data) => {
    if (data) {
      localStorage.setItem("token", JSON.stringify(data));
    } else {
      localStorage.removeItem("token");
    }
    setToken(data);
  }

  return (
    <AuthContext.Provider value={{ token, setToken: setTokenCallback }}>
      <Router>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal">Syncplicity API Gateway Client</h5>
          <User />
        </div>

        <div className="container">
          <div className="pt-4">
            <Switch>
              <PrivateRoute path="/browser/:sid/:fid" component={Browser} />
              <PrivateRoute path="/browser" component={Browser} />
              <Route exact path="/" component={Login} />
              <Route path="/auth/handler" component={AuthHandler} />
            </Switch>
          </div>

            <footer className="pt-4 my-md-5 border-top">
              <div className="row">
                <div className="col-12 col-md">
                  <small className="d-block mb-3 text-muted">&copy; 2019-{new Date().getFullYear()}</small>
                </div>
              </div>
      </footer>
      </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
