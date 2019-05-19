import { connect } from 'react-redux';
import init from '../actions/init';
import App from '../App';

const mapStateToProps = state => ({
  isLoggedIn: state.global.user != null,
  isInitialized: state.global.isUserLoaded,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(init()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
