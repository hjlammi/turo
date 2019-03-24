import React from 'react';
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
      <Form formLabel="Login" />
    );
  }
}
