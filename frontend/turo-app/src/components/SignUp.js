import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Field from './Field';
import CustomButton from './CustomButton';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password1: '',
      password2: '',
      passwordLength: 0,
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

  mismatchingPasswords = () => {
    const { password1, password2 } = this.state;
    return password1 !== password2;
  }

  render() {
    const { password1, passwordLength } = this.state;
    const buttonDisabled = password1 === '' || this.mismatchingPasswords() || passwordLength < 10;
    const { signUpSuccess } = this.props;

    // TODO: Show error message when too short password
    // TODO: Sanitizing for email and password

    if (signUpSuccess) {
      return <Redirect to={{ pathname: '/confirm' }} />;
    }
    return (
      <form
        className="form"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          const { email } = this.state;
          const { onSignUp } = this.props;
          onSignUp(email, password1);
        }}
      >
        <h2>Sign up</h2>
        <Field fieldLabel="Email" id="email" onChange={(e) => { this.handleChange(e, 'email'); }} />
        <Field fieldLabel="Password" id="password1" onChange={(e) => { this.handleChange(e, 'password1'); }} />
        <Field fieldLabel="Confirm password" id="password2" onChange={(e) => { this.handleChange(e, 'password2'); }} />
        <CustomButton buttonText="Sign up" id="signup" disabled={buttonDisabled} />
      </form>
    );
  }
}

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  signUpSuccess: PropTypes.bool.isRequired,
};
