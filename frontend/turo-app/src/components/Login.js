import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: "",
      // password: ""
    };
  }

  render() {
    return (
      <div>
        <Form formLabel="Login" />
        <Link to="/signup" className="link">Sign up</Link>
      </div>
    );
  }
}
