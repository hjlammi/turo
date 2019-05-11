import { connect } from 'react-redux';
import loadUserData from '../actions/loadUserData';
import App from '../App';

const mapStateToProps = state => ({
  isLoggedIn: state.global.user != null,
  isInitialized: state.global.isUserLoaded,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadUserData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
