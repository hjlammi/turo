import React from 'react';
import { Link } from 'react-router-dom';
import '../css/content.css';

export default class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="confirmation content">
        <p>Thanks for signing up!</p>
        <Link to="/login" className="link">Login</Link>
      </div>
    );
  }
}
