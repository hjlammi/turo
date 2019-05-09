import { connect } from 'react-redux';
import Home from '../components/Home';
import createPost from '../actions/createPost';

const mapStateToProps = state => ({
  isLoggedIn: state.global.user != null,
  userId: state.global.user ? state.global.user.id : null,
  username: state.global.user ? state.global.user.username : null,
  email: state.global.user ? state.global.user.email : null,
});

const mapDispatchToProps = dispatch => ({
  onSubmitPost: (post, userId) => dispatch(createPost(post, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
