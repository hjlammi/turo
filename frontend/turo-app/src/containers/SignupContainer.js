import { connect } from 'react-redux';
import signUp from '../actions/signup';
import SignUp from '../components/SignUp';

const mapStateToProps = state => ({
  signUpSuccess: state.signUp.success,
});

const mapDispatchToProps = dispatch => ({
  onSignUp: (email, password) => dispatch(signUp(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
