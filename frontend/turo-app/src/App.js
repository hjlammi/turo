import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import LoginContainer from './containers/LoginContainer';
import SignupContainer from './containers/SignupContainer';
import HeaderContainer from './containers/HeaderContainer';

const App = () => (
  <Router>
    <div className="App">
      <Route path="/" component={HeaderContainer} />
      <div>
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={SignupContainer} />
      </div>
    </div>
  </Router>
);

export default App;
