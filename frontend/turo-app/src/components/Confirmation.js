import React from 'react';
import { Link } from 'react-router-dom';
import '../css/container.css';

export default class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="confirmation container">
        <p>Thanks for signing up!</p>
        <Link to="/login" className="link">Login</Link>
      </div>
    );
  }
}
