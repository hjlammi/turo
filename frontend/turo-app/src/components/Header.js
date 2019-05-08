import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/header.css';

// Header component that is shown on every "page" as part of the view.

const Header = (props) => {
  const { isLoggedIn, onLogOut } = props;
  return (
    <div className="header">
      <h1>{isLoggedIn ? '' : 'Welcome to turo-app!'}</h1>
      <Link to="/login" className="link" onClick={onLogOut}>{isLoggedIn ? 'Log out' : ''}</Link>
    </div>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogOut: PropTypes.func.isRequired,
};

export default Header;
