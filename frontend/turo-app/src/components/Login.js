import React from 'react';
import { Link } from 'react-router-dom';
import Field from './Field';
import CustomButton from './CustomButton';

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
        <form className="form">
          <h2>Login</h2>
          <Field fieldLabel="Username" id="username" />
          <Field fieldLabel="Password" id="password" />
          <CustomButton buttonText="Login" id="loginButton" />
        </form>
        <Link to="/signup" className="link">Sign up</Link>
      </div>
    );
  }
}
