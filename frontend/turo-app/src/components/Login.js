import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Field from './Field';
import CustomButton from './CustomButton';
import '../css/container.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
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
    let errorMsg = <div className="error" />;

    if (logInError) {
      errorMsg = <div className="error">Wrong email or password!</div>;
    }

    return (
      <div className="container">
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
          { errorMsg }
          <Field fieldLabel="Email" id="email" type="email" value={email} onChange={(e) => { this.handleChange(e, 'email'); }} />
          <Field fieldLabel="Password" type="password" id="password" value={password} onChange={(e) => { this.handleChange(e, 'password'); }} />
          <CustomButton buttonText="Login" id="loginButton" disabled={buttonDisabled} />
          <Link to="/signup" className="link">Sign up</Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  onLoad: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  logInError: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
