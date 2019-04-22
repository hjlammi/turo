import { connect } from 'react-redux';
import logIn from '../actions/login';
import SignUp from '../components/SignUp';

const mapStateToProps = () => ({
  // isLoggedIn: state.user !== null,
});

const mapDispatchToProps = {
  logIn,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
