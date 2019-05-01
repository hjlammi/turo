import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import LoginContainer from './containers/LoginContainer';
import SignupContainer from './containers/SignupContainer';
import ProfileContainer from './containers/ProfileContainer';
import HeaderContainer from './containers/HeaderContainer';
import HomeContainer from './containers/HomeContainer';

const App = () => (
  <Router>
    <div className="App">
      <Route path="/" component={HeaderContainer} />
      <div>
        <Route path="/" component={HomeContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={SignupContainer} />
        <Route path="/profile" component={ProfileContainer} />
      </div>
    </div>
  </Router>
);

export default App;
