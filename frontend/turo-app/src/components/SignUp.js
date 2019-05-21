import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Field from './Field';
import CustomButton from './CustomButton';
import '../css/container.css';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
      passwordLength: 0,
      touched: {
        username: false,
        email: false,
        password1: false,
        password2: false,
      },
    };
  }

  // Event handler that passes the texts written in the input fields to the component state.
  handleChange = (event, field) => {
    if (field === 'password1') {
      const { value } = event.target;
      const passwordLength = value.length;
      this.setState({
        [field]: value,
        passwordLength,
      });
    } else {
      this.setState({
        [field]: event.target.value,
      });
    }
  }

  handleBlur = field => () => {
    this.setState(prevState => ({
      touched: { ...prevState.touched, [field]: true },
    }));
  }

  mismatchingPasswords = () => {
    const { password1, password2 } = this.state;
    return password1 !== password2;
  }

  validEmail = email => email.match(/.@./g);

  validUsername = username => username.match(/\w+/g);

  render() {
    const {
      email, username, password2, password1, passwordLength, touched,
    } = this.state;
    const buttonDisabled = password1 === '' || this.mismatchingPasswords() || passwordLength < 10 || !this.validEmail(email);
    const {
      signUpStatus, onSignUp, isLoggedIn,
    } = this.props;

    if (signUpStatus === 'ACCOUNT_CREATED') {
      return <Redirect to={{ pathname: '/confirm' }} />;
    }

    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    let errorMsg = <div className="error" />;

    if (signUpStatus === 'USERNAME_TAKEN') {
      errorMsg = <div className="error">The username is already taken! Choose another username!</div>;
    } else if (signUpStatus === 'EMAIL_TAKEN') {
      errorMsg = <div className="error">The email is already registered!</div>;
    } else if ((passwordLength < 10 && touched.password1) || signUpStatus === 'TOO_SHORT_PASSWORD') {
      errorMsg = <div className="error">Password should be at least 10 characters long.</div>;
    } else if (this.mismatchingPasswords() && touched.password1 && touched.password2) {
      errorMsg = <div className="error">Passwords don&apos;t match.</div>;
    } else if ((!this.validEmail(email) && touched.email) || signUpStatus === 'INVALID_EMAIL') {
      errorMsg = <div className="error">Invalid email address.</div>;
    } else if (!this.validUsername(username) || signUpStatus === 'INVALID_USERNAME') {
      errorMsg = <div className="error">The only valid characters in the username are a-z, A-Z, numbers, and _!</div>;
    }

    return (
      <div className="container">
        <form
          className="form"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            onSignUp(username, email, password1);
          }}
        >
          <h2>Sign up</h2>
          {errorMsg}
          <Field fieldLabel="Username" id="username" value={username} onBlur={this.handleBlur('username')} onChange={(e) => { this.handleChange(e, 'username'); }} />
          <Field fieldLabel="Email" id="email" type="email" value={email} onBlur={this.handleBlur('email')} onChange={(e) => { this.handleChange(e, 'email'); }} />
          <Field fieldLabel="Password" id="password1" type="password" value={password1} onBlur={this.handleBlur('password1')} onChange={(e) => { this.handleChange(e, 'password1'); }} />
          <Field fieldLabel="Confirm password" id="password2" type="password" value={password2} onBlur={this.handleBlur('password2')} onChange={(e) => { this.handleChange(e, 'password2'); }} />
          <CustomButton buttonText="Sign up" id="signup" disabled={buttonDisabled} />
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  signUpStatus: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
