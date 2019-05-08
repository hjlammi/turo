import { connect } from 'react-redux';
import Header from '../components/Header';
import logOut from '../actions/logOut';

const mapStateToProps = state => ({
  isLoggedIn: state.global.user != null,
});

const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch(logOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
