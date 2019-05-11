import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginContainer from './containers/LoginContainer';
import SignupContainer from './containers/SignupContainer';
import ConfirmationContainer from './containers/ConfirmationContainer';
import ProfileContainer from './containers/ProfileContainer';
import HeaderContainer from './containers/HeaderContainer';
import HomeContainer from './containers/HomeContainer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    const { isInitialized } = this.props;

    if (isInitialized) {
      return (
        <Router>
          <div className="App">
            <Route path="/" component={HeaderContainer} />
            <div>
              <Route exact path="/" component={HomeContainer} />
              <Route path="/login" component={LoginContainer} />
              <Route path="/signup" component={SignupContainer} />
              <Route path="/confirm" component={ConfirmationContainer} />
              <Route path="/profile" component={ProfileContainer} />
            </div>
          </div>
        </Router>
      );
    }

    return null;
  }
}

App.propTypes = {
  onLoad: PropTypes.func.isRequired,
  isInitialized: PropTypes.bool.isRequired,
};
