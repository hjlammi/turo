import { connect } from 'react-redux';
import Home from '../components/Home';
import submitPost from '../actions/submitPost';

const mapStateToProps = state => ({
  isLoggedIn: state.global.user != null,
});

const mapDispatchToProps = dispatch => ({
  onSubmitPost: post => dispatch(submitPost(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
