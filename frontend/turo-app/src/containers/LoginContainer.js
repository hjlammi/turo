import { connect } from 'react-redux';
import logIn from '../actions/login';
import loadLogin from '../actions/loadLogin';
import Login from '../components/Login';

const mapStateToProps = state => ({
  logInError: state.logIn.failed,
  isLoggedIn: state.global.user != null,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadLogin()),
  onLogin: (email, password) => dispatch(logIn(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
