import React from 'react';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="profile content-container">
        <h2>Profile</h2>
        <div>
          <h3>Username</h3>
          <h3>E-mail address</h3>
        </div>
      </div>
    );
  }
}
