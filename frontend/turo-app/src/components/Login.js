import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Field from './Field';
import CustomButton from './CustomButton';
import '../css/login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    const { isLoggedIn } = this.props;
    const { email, password } = this.state;
    const buttonDisabled = email === '' || password === '';

    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    // Error message if email or password were incorrect.
    const { logInError } = this.props;
    const errorMsg = logInError ? (
      <p className="error">Wrong email or password!</p>
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
            const { onLogin } = this.props;
            onLogin(email, password);
          }}
        >
          <h2>Login</h2>
          <Field fieldLabel="Email" id="email" onChange={(e) => { this.handleChange(e, 'email'); }} />
          <Field fieldLabel="Password" id="password" onChange={(e) => { this.handleChange(e, 'password'); }} />
          <CustomButton buttonText="Login" id="loginButton" disabled={buttonDisabled} />
        </form>
        <Link to="/signup" className="link">Sign up</Link>
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  logInError: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
