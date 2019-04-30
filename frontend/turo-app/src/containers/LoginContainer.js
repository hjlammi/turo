import { connect } from 'react-redux';
import logIn from '../actions/login';
import Login from '../components/Login';

const mapStateToProps = () => ({
  // isLoggedIn: state.user !== null,
});

const mapDispatchToProps = dispatch => ({
  onLogin: (username, password) => dispatch(logIn(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
