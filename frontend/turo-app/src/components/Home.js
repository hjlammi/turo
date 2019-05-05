import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import '../css/content.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return <Redirect to={{ pathname: '/login' }} />;
    }

    return (
      <div className="home content">
        <h1>Home lolol</h1>
      </div>
    );
  }
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
