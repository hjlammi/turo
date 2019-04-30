import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Field from './Field';
import CustomButton from './CustomButton';
import '../css/login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  // Event handler that passes the texts written in the input fields to the component state.
  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value,
    });
  }

  render() {
    // Error message if email or password were incorrect.
    const { logInError } = this.props;
    const errorMsg = logInError ? (
      <p className="error">Wrong username or password!</p>
    ) : (
      <p />
    );

    return (
      <div>
        { errorMsg }
        <form
          className="form"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            const { username, password } = this.state;
            const { onLogin } = this.props;
            onLogin(username, password);
          }}
        >
          <h2>Login</h2>
          <Field fieldLabel="Username" id="username" onChange={(e) => { this.handleChange(e, 'username'); }} />
          <Field fieldLabel="Password" id="password" onChange={(e) => { this.handleChange(e, 'password'); }} />
          <CustomButton buttonText="Login" id="loginButton" />
        </form>
        <Link to="/signup" className="link">Sign up</Link>
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  logInError: PropTypes.bool.isRequired,
};
