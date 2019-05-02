import { connect } from 'react-redux';
import logIn from '../actions/login';
import Login from '../components/Login';

const mapStateToProps = state => ({
  logInError: state.logIn.failed,
  isLoggedIn: state.logIn.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(logIn(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
