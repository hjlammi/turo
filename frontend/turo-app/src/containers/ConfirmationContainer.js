import { connect } from 'react-redux';
import Confirmation from '../components/Confirmation';

const mapStateToProps = state => ({
  isLoggedIn: state.global.user != null,
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Confirmation);
