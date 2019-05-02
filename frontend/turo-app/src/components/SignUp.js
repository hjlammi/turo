import React from 'react';
import Field from './Field';
import CustomButton from './CustomButton';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <form className="form">
        <h2>Sign up</h2>
        <Field fieldLabel="Email" id="email" />
        <Field fieldLabel="Password" id="password" />
        <Field fieldLabel="Confirm password" id="password" />
        <CustomButton buttonText="Sign up" />
      </form>
    );
  }
}
