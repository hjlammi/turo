import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = state => ({
  isLoggedIn: state.global.user != null,
});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
