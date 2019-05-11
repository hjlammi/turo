import { connect } from 'react-redux';
import signUp from '../actions/signup';
import SignUp from '../components/SignUp';

const mapStateToProps = state => ({
  signUpStatus: state.signUp.status,
  isLoggedIn: state.global.user != null,
});

const mapDispatchToProps = dispatch => ({
  onSignUp: (username, email, password) => dispatch(signUp(username, email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
