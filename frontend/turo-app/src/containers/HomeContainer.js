import { connect } from 'react-redux';
import Home from '../components/Home';

const mapStateToProps = state => ({
  isLoggedIn: state.global.user != null,
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
