import { connect } from 'react-redux';
import logIn from '../actions/login';
import Profile from '../components/Profile';

const mapStateToProps = () => ({
  // isLoggedIn: state.user !== null,
});

const mapDispatchToProps = {
  logIn,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
