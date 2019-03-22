import React from 'react';
import PropTypes from 'prop-types';

// Header component that is shown on every "page" as part of the view.

const Header = (props) => {
  Header.propTypes = {
    headerText: PropTypes.string.isRequired,
  };

  const { headerText } = props;
  return (
    <div className="App-header">
      <h1>{headerText}</h1>
    </div>
  );
};

export default Header;
