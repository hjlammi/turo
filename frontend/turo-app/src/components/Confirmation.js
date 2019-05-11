import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/container.css';

export default class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    return (
      <div className="confirmation container">
        <p>Thanks for signing up!</p>
        <Link to="/login" className="link">Login</Link>
      </div>
    );
  }
}

Confirmation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
