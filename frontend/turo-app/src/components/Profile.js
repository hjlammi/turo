import React from 'react';
import '../css/container.css';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="profile container">
        <h2>Profile</h2>
        <h3>Username</h3>
        <h3>E-mail address</h3>
      </div>
    );
  }
}
